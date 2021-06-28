'use strict';
// libraries:
import _ from 'lodash';
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import status from '../../utils/status';
import {ProductModel} from '../product/product.model';
import {CartModel} from './cart.model';

var pp = (el) => console.log(util.inspect(el, false, 5, true))

//=============================================================================


export async function modifyCartProduct(parent, args, context, info) {
    pp(args)
    pp(context)
    let idUser = context.userInfo.id
    let result = {
        status: ''
    }

    let cart = await CartModel.findOne({idUser: idUser})
    pp(cart)
    // let validProductInput = _.has(product, ['quantity', 'id'])
    // let validCartInput = _.has(cart, ['listOfProducts', 'idUser'])
    // !validProductInput || !validCartInput ? (result = {
    //     status: status.invalid,
    //     message: status.messages.cart.addProduct.invalid,
    //     listOfErrors: [`Unable to add product with id: ${product.id}`]
    // }) : null
    // if (result.status === status.invalid) return result;


}


async function __updateQuantity(idUser, idProduct, quantity) {
    let product;
    let cart;
    try {
        product = await ProductModel.findOneAndUpdate(
            {
                _id: idProduct,
                stock: {$gte: quantity}
            },
            {
                $inc: {
                    stock: -quantity
                },
                $push: {
                    inCarts: {
                        idUser: idUser,
                        quantity: quantity,
                        timestamp: DateTime.local()
                    }
                }
            },
            {
                new: true
            }
        )
        cart = await CartModel.findOneAndUpdate(
            {}
        )
    } catch (_e) {
        throw Error(_e.message)
    }
    return cart
}

