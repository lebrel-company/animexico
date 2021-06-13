'use strict';
// libraries:
import util from 'util'
import mongoose from 'mongoose'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../product/product.model';
import {CartModel} from './cart.model';
import {authenticated, authorized} from '../../utils/auth';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import status from '../../utils/status';
import {globalSettings} from '../../config/settings';
import validate from './cart.validations'

var pp = (el) => console.log(util.inspect(el, false, 5, true))

//==============================================================================


const SETTINGS = globalSettings()

async function updateCart(parent, args, context, info) {
    let result = {
        status: status.success,
        message: status.messages.cart.creation.success,
        cart: null
    }
    pp(context)
    let cart = CartModel.findOneAndUpdate(
        {idUser: context.userInfo.id},
        {
            status: status.active,
            listOfProducts: [
                {
                    code: context.product.code,
                    id: context.product._id,
                    quantity: context.cartProduct.quantity,
                    name: context.product.name,
                    price: context.product.price
                }
            ],
            timeout: SETTINGS.cartTimeout
        },
        {
            new: true,
            upsert: true
        }
    )
    result.cart = cart
    return result
}

// async function __findExistingCart(context) {
//     try {
//         let cart = await CartModel.findOne({idUser: context.userInfo.id})
//         if (cart === null) return null
//         if (cart.status === status.inactive) {
//             await CartModel.deleteOne({idUser: context.userInfo.id})
//             return null
//         }
//         return cart
//     } catch (_e) {
//         throw Error(_e.message)
//     }
// }
//
//
// async function __createCart(context) {
//     try {
//         let cart = await CartModel.create({
//             idUser: context.userInfo.id,
//             status: status.active,
//             listOfProducts: [
//                 {
//                     code: context.product.code,
//                     id: context.product._id,
//                     quantity: context.cartProduct.quantity
//                 }
//             ],
//             timeout: SETTINGS.cartTimeout
//         })
//         return cart
//     } catch (_e) {
//         pp(_e)
//         throw Error(_e.message)
//     }
// }


export default {
    Query: {},
    Mutation: {
        updateCart: authenticated(authorized(
            'CLIENT',
            validate.products(updateCart)
        ))
    },
    CartResult: {
        __resolveType: function (obj, context, info) {
            switch (obj.status) {
                case status.success:
                    return 'MyCart'
                case status.invalid:
                    return 'InvalidCart'
                default:
                    return null
            }
        }
    }
}
