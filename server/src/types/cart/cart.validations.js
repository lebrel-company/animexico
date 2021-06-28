'use strict';
// libraries:
import util from 'util'
import {ProductModel} from '../product/product.model';
import _ from 'lodash';
import produce from 'immer'
import {DateTime} from 'luxon'
import mongoose from 'mongoose'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import status from '../../utils/status';
import {globalSettings} from '../../config/settings';
import {CartModel} from './cart.model';

var pp = (el) => console.log(util.inspect(el, false, 5, true))

//==============================================================================


var fields = {
    product: ['id', 'code', 'name', 'price', 'quantity', 'purchaseLimit', 'listOfImages']
}

export function validateCartCreation(nextResolver) {
    return validateCartMustNotExistPreviously(
        validateProduct(
            validateProductExists(nextResolver)
        )
    )
}

export function validateCartProductUpdate(nextResolver) {
    return validateProduct(
        validateProductExists(validateInCartRegisterForUser(nextResolver))
    )
}

export function validateAddCartToProduct(nextResolver) {
    return validateProduct(validateProductExists(nextResolver)
    )
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   -

function validateCartMustNotExistPreviously(nextResolver) {

    return async function (parent, args, context, info) {

        let idUser = context.userInfo.id
        let {idProduct} = args.input

        let cartExists = await CartModel.exists({idUser: idUser})
        let existsInProduct = await ProductModel.exists(
            {_id: idProduct, 'inCarts.idUser': idUser}
        )

        if (cartExists) {
            return {
                status: status.invalid,
                message: status.messages.cart.creation.invalid,
                listOfErrors: [
                    `Cart for User ${context.userInfo.id} already exists.`
                ]
            }
        }

        if (existsInProduct) {
            return {
                status: status.invalid,
                message: status.messages.cart.creation.invalid,
                listOfErrors: [
                    `Register for ${idUser} already ` +
                    `exists in product ${idProduct}.`
                ]
            }
        }

        return nextResolver(parent, args, context, info)
    }
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   -

function validateProduct(nextResolver) {
    return async function resolver(parent, args, context, info) {
        let listOfErrors = []
        let {idProduct, quantity} = args.input

        let product = await ProductModel.findById(idProduct)

        if (product === null) {
            listOfErrors.push('Product does\'t exists.')
        }

        listOfErrors = _.concat(
            listOfErrors, validateProductStock(product, quantity)
        )

        if (listOfErrors.length > 0) {
            return {
                status: status.invalid,
                message: status.messages.cart.creation.invalid,
                listOfErrors: listOfErrors
            }
        }

        context.product = product

        return nextResolver(parent, args, context, info)

    }
}

function validateProductExists(nextResolver) {
    return async function (parent, args, context, info) {

        let {idProduct} = args.input

        let productExists = await ProductModel.exists({_id: idProduct})

        if (productExists) {
            return nextResolver(parent, args, context, info)
        }

        return {
            status: status.invalid,
            message: status.messages.cart.updateProduct.invalid,
            listOfErrors: [`Product ${idProduct} doesn\'t exists`]
        }

    }
}

function validateInCartRegisterForUser(nextResolver) {
    return async function (parent, args, context, info) {
        let {idProduct} = args.input
        let idUser = context.userInfo.id

        let registerExists = await ProductModel.exists(
            {
                _id: mongoose.Types.ObjectId(idProduct),
                'inCarts.idUser': mongoose.Types.ObjectId(idUser)
            }
        )

        if (registerExists) {
            return nextResolver(parent, args, context, info)
        }

        return {
            status: status.error,
            message: status.messages.cart.updateProduct.invalid,
            listOfErrors: [
                `There is no product.inCarts register for ` +
                `product ${idProduct} and user ${idUser}`
            ]
        }

    }
}

function validateProductStock(storeProduct, quantity) {
    let result = []
    let productExists = storeProduct !== null

    if (productExists && storeProduct.stock < quantity) {
        result.push('Not enough stock')
    }

    if (productExists && quantity > storeProduct.purchaseLimit) {
        result.push('Quantity over the purchase limit per unit.')
    }

    return result
}

