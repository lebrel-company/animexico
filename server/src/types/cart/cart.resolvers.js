'use strict';
// libraries:
import util from 'util'
import mongoose from 'mongoose'
import _ from 'lodash'
import produce from 'immer'
import {DateTime} from 'luxon'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../product/product.model';
import {CartModel} from './cart.model';
import {authenticated, authorized, userFromToken} from '../../utils/auth';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import status from '../../utils/status';
import {globalSettings} from '../../config/settings';
import {
    validateCartCreation,
    validateCartProductUpdate,
    validateAddCartToProduct
} from './cart.validations'

var pp = (el) => console.log(util.inspect(el, false, 5, true))
//==============================================================================

const SETTINGS = globalSettings()

function toID(id) {
    return mongoose.Types.ObjectId(id)
}

// =============================================================================
// CART MUTATIONS

async function createCart(parent, args, context, info) {

    let {idProduct, quantity} = args.input

    let cart = await CartModel.create(
        {
            idUser: context.userInfo.id,
            status: status.active,
            timeout: {
                start: DateTime.local().ts,
                end: DateTime.local().ts + SETTINGS.cartTimeout
            },
            listOfProducts: [
                {
                    id: context.product._id,
                    code: context.product.code,
                    name: context.product.name,
                    purchaseLimit: context.product.purchaseLimit,
                    price: context.product.price,
                    quantity: quantity,
                    thumbnail: context.product.listOfImages[0]
                }
            ]
        }
    )

    await ProductModel.findOneAndUpdate(
        {_id: idProduct},
        {
            $inc: {stock: -quantity},
            $push: {
                inCarts: {
                    idUser: context.userInfo.id,
                    quantity: quantity
                }
            }
        }
    )

    cart.id = cart._id
    return {
        status: status.success,
        message: status.messages.cart.update.success,
        cart: cart
    }
}

// __ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ __

async function queryCart(parent, args, context, info) {
    let idUser = context.userInfo.id
    let cart = await CartModel.findOne({idUser: idUser})


    if (cart === null) {
        return {
            status: status.invalid,
            message: status.messages.cart.query.invalid,
            listOfErrors: [
                `No existe un carrito de compras para usuario ${idUser}`
            ]
        }
    } else {
        return {
            status: status.success,
            message: status.messages.cart.query.success,
            cart: cart
        }
    }
}

// __ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ __

async function deleteCart(parent, args, context, input) {
    let idUser = context.userInfo.id

    let listOfProducts = await ProductModel.find({'inCarts.idUser': idUser})

    let mapOfProducts = {}
    listOfProducts.forEach((p) => {
        mapOfProducts[p._id.toString()] = {
            quantity: p.inCarts[0].quantity
        }
    })

    let listOfUpdatedProducts = []

    try {
        await Promise.all(listOfProducts.map(async (p) => {
                let id = p._id.toString()
                let product = await ProductModel.findOneAndUpdate(
                    {_id: p._id},
                    {
                        $inc: {stock: mapOfProducts[id].quantity},
                        $pull: {inCarts: {idUser: idUser}}
                    },
                    {new: true}
                )
                listOfUpdatedProducts.push(product)
            })
        )

        await CartModel.deleteOne({idUser: idUser})
    } catch (_e) {
        throw Error(_e.message)
    }


    listOfUpdatedProducts.forEach((p, i) => {
        listOfUpdatedProducts[i].id = p._id.toString()
    })

    return {
        status: status.deleted,
        message: status.messages.cart.delete.exists,
        listOfProducts: listOfUpdatedProducts
    }
}

//=============================================================================
// CART PRODUCTS UPDATE:

async function addProductToCart(parent, args, context, info) {
    let idUser = context.userInfo.id

    let {idProduct} = args.input

    let quantity = 1


    let product = await ProductModel.findOneAndUpdate(
        {
            $and: [
                {_id: toID(idProduct)},
                {stock: {$gte: quantity}},
                {purchaseLimit: {$gte: quantity}}
            ]
        },
        {
            $inc: {stock: -quantity},
            $push: {inCarts: {quantity: quantity, idUser: idUser}}
        },
        {new: true}
    )


    let cart = await CartModel.findOneAndUpdate({idUser: toID(idUser)},
        {
            $push: {
                listOfProducts: {
                    id: idProduct,
                    name: product.name,
                    purchaseLimit: product.purchaseLimit,
                    thumbnail: product.listOfImages[0],
                    quantity: quantity,
                    code: product.code
                }
            }
        },
        {new: true}
    )

    return {
        status: status.success,
        message: status.messages.cart.addProduct.success,
        cart: cart
    }

}

async function removeProductFromCart(parent, args, context, info) {
    let idUser = context.userInfo.id
    let {idProduct} = args.input

    let product = await ProductModel.findOne(
        {
            _id: idProduct,
            'inCarts': {$elemMatch: {idUser: idUser}}
        },
        ['inCarts.$', '_id']
    )
    let quantity = product.inCarts[0].quantity

    await ProductModel.findOneAndUpdate({_id: idProduct},
        {
            $inc: {
                stock: quantity
            },
            $pull: {
                inCarts: {idUser: idUser}
            }
        }
    )

    let cart = await CartModel.findOne({idUser: idUser})

    return {
        status: status.success,
        message: status.messages.cart.updateProduct.success,
        cart: cart
    }

}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   -

async function updateProductQuantity(parent, args, context, info) {
    let user = context.userInfo
    let {idProduct, quantity} = args.input

    let product = await ProductModel.findOne(
        {
            _id: toID(idProduct),
            'inCarts': {
                $elemMatch: {idUser: user.id}
            }
        },
        ['inCarts.$', 'name', 'code', 'purchaseLimit']
    )

    var deltaQuantity = deltaProductQuantity(user, product, quantity)


    {
        // Update at the product first, this step is really important.
        let updateProduct = (
            await updateQuantityAtProduct(user, product, quantity)
        )
        if (updateProduct.status === status.error) return updateProduct
    }


    let cart = null;
    cart = await CartModel.findOneAndUpdate(
        {
            idUser: user.id,
            'listOfProducts': {
                $elemMatch: {
                    id: idProduct
                }
            }
        },
        {
            'listOfProducts.$.quantity': quantity
        },
        {
            new: true
        }
    )


    return {
        status: status.success,
        message: status.messages.cart.updateProduct.success,
        cart: cart
    }

}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   -


async function updateQuantityAtProduct(user, product, quantity) {

    var deltaQuantity;
    {
        deltaQuantity = deltaProductQuantity(user, product, quantity)
    }

    try {
        let result = await ProductModel.findOneAndUpdate(
            {
                _id: product._id,
                'inCarts.idUser': user.id
            },
            {
                $inc: {
                    stock: deltaQuantity
                },
                'inCarts.$.quantity': quantity

            },
            {
                new: true
            }
        )

        return {
            status: status.success,
            message: 'Update cart correctly'
        }
    } catch (_e) {
        return {
            status: status.error,
            message: status.messages.cart.updateProduct.error,
            listOfErrors: [
                _e.message,
                'Unable to update new quantity at product in carts field.'
            ]
        }
    }

}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   -

function deltaProductQuantity(user, product, newQuantity) {

    let userInCartData = product.inCarts.filter((p) => {
        return p.idUser.toString() === user.id.toString()
    })

    let oldQuantity = 0;
    if (userInCartData.length === 1) {
        userInCartData = userInCartData[0]
        oldQuantity = userInCartData.quantity
    }
    return (oldQuantity - newQuantity)

}

//=============================================================================

export default {
    Query: {
        queryCart: authenticated(queryCart)
    },
    Mutation: {
        createCart: authenticated(
            authorized('CLIENT', validateCartCreation(createCart))
        ),
        deleteCart: deleteCart,
        addProductToCart: authenticated(
            validateAddCartToProduct(addProductToCart)
        ),
        removeProductFromCart: removeProductFromCart,
        updateProductQuantity: authenticated(
            validateCartProductUpdate(updateProductQuantity)
        )
    },
    CartResult: {
        __resolveType: function (obj, context, info) {
            switch (obj.status) {
                case status.success:
                    return 'MyCart'
                case status.invalid:
                    return 'InvalidCart'
                case status.error:
                    return 'InvalidCart'
                case status.deleted:
                    return 'DeletedCart'
                default:
                    return null
            }
        }
    }
}
