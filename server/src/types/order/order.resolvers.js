'use strict';
// libraries:
import util from 'util'
import mongoose from 'mongoose'
import _ from 'lodash'
import checkoutNodeJssdk from '@paypal/checkout-server-sdk'
import axios from 'axios'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../user/user.model';
import {ProductModel} from '../product/product.model';
import {OrdersModel} from './order.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {
    getToken,
    PAYPAL_PAYMENT_API,
    PAYPAL_CLIENT,
    PAYPAL_SECRET
} from './paypal';
import {authenticated, authorized} from '../../utils/auth';
import helpers from './order.helpers';
import status from '../../utils/status'
import validate from './order.validations'
import placeholder from 'lodash/fp/placeholder';
import messages from '../user/user.messages';
import cart from '../../../../client/src/pages/checkout';
import {CartModel} from '../cart/cart.model';

var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}

//==============================================================================


async function queryOrder(parent, args, context, info) {
    return {}
}

//==============================================================================

async function createOrder(parent, args, context, info) {
    let _i = args.input
    let listProductIdObjects = _i.listOfProducts.map((el) => {
        return mongoose.Types.ObjectId(el.id)
    })
    let _p = await ProductModel.find({_id: {$in: listProductIdObjects}})

    let listOfErrors = validate.order(_i.listOfProducts, _p)

    if (listOfErrors.length > 0) {
        return {
            status: status.invalid,
            message: status.messages.order.creation.invalid,
            listOfErrors: listOfErrors
        }
    }

    let listOfProducts = helpers.mapInputQuantityWithProductList(
        _i.listOfProducts, _p
    )
    let listOfSegregatedProducts = (
        helpers.segregateProductsByMonth(listOfProducts)
    )

    let result = {
        status: 'success',
        message: 'Order created successfully',
        listOfOrders: []
    }

    let mapBaseObject = {
        idUser: _i.idUser,
        address: _i.address,
        orderStatus: status.order.pending,
        shippingAddress: {}
    }

    listOfSegregatedProducts.forEach(function createOrderEntries(el) {
        let base = _.cloneDeep(mapBaseObject)
        let listOfProducts = helpers.filterListOfProductFields(el)
        base.listOfProducts = listOfProducts
        base.total = helpers.calculateTotalFromListOfProducts(listOfProducts)
        result.listOfOrders.push(base)
    })

    try {
        await OrdersModel.insertMany(result.listOfOrders)
        return result
    } catch (_e) {
        throw new Error(_e.message)
    }

}

//=============================================================================
// PAYPAL:

async function payment(parent, args, context, info) {
    let idUser = context.userInfo.id

    let cart = await CartModel.find({idUser: idUser})

    pp(cart)

    let order
    try {
        order = await axios({
            method: 'POST',
            url: PAYPAL_PAYMENT_API,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal'
                },
                transactions: [{
                    amount: {
                        total: TOTAL.toString(),
                        currency: 'MXN'
                    }
                }],
                redirect_urls: {
                    return_url: '/',
                    cancel_url: '/'
                }
            },
            auth: {
                username: PAYPAL_CLIENT,
                password: PAYPAL_SECRET
            }
        })

    } catch (_e) {
        pp(_e.response.data)
        pp(_e.message)
    }

    return order.data
}

//=============================================================================
export default {
    Query: {
        queryOrder
    },
    Mutation: {
        createOrder: authenticated(authorized('CLIENT', createOrder)),
        payment: authenticated(payment)
    },
    OrderResult: {
        __resolveType(obj, context, info) {
            if (obj.status === status.success) {
                return 'OrderAccepted'
            }
            if (obj.status === status.invalid) {
                return 'OrderInvalid'
            }
            return null
        }
    }
}



