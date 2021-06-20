'use strict';
// libraries:
import util from 'util'
import mongoose from 'mongoose'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../product/product.model';
import {CartModel} from './cart.model';
import {authenticated, authorized, userFromToken} from '../../utils/auth';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import status from '../../utils/status';
import {globalSettings} from '../../config/settings';
import {validateCart} from './cart.validations'

var pp = (el) => console.log(util.inspect(el, false, 5, true))
//==============================================================================

const SETTINGS = globalSettings()

async function updateCart(parent, args, context, info) {

    if (context.listOfErrors.length > 0) {
        return {
            status: status.invalid,
            message: status.messages.cart.update.invalid,
            listOfErrors: context.listOfErrors
        }
    }

    let cart = await CartModel.findOneAndUpdate(
        {idUser: context.userInfo.id},
        context.newCartData,
        {
            new: true,
            upsert: true
        }
    ).lean()


    return {
        status: status.success,
        message: status.messages.cart.update.success,
        cart: cart
    }
}

async function queryCartWithToken(parent, args, context, info) {
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

async function deleteCart(parent, args, context, input) {
    let {idUser} = context.userInfo
    try {
        let cart = await CartModel.findOneAndDelete({idUser})
        if (cart) {
            return {
                status: status.deleted,
                message: status.messages.cart.delete.exists
            }
        } else {
            return {
                status: status.deleted,
                message: status.messages.cart.delete.notExists
            }
        }
    } catch (_e) {
        throw Error(_e.message)
    }
}

export default {
    Query: {
        queryCartWithToken: authenticated(queryCartWithToken)
    },
    Mutation: {
        updateCart: authenticated(authorized('CLIENT', validateCart(updateCart))),
        deleteCart: deleteCart
    },
    CartResult: {
        __resolveType: function (obj, context, info) {
            switch (obj.status) {
                case status.success:
                    return 'MyCart'
                case status.invalid:
                    return 'InvalidCart'
                case status.deleted:
                    return 'DeletedCart'
                default:
                    return null
            }
        }
    }
}
