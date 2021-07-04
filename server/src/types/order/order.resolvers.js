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
import {authenticated, authorized} from '../../utils/auth';
import helpers from './order.helpers';
import status from '../../utils/status'
import validate from './order.validations'
import {CartModel} from '../cart/cart.model';

var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}

//==============================================================================


async function createOrder(parent, args, context, info) {
    let _i = args.input
    let {paypal} = args.input
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
        shippingAddress: {},
        paypal
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

const PAYPAL_CLIENT = 'AWRqzvZX9poAvA67i306KiwGx82vdxVrhy0BcB6aJLCi_ihcalvYmFMzavW6SRngbRLkF2eUqUMGL2BU'
const PAYPAL_SECRET = 'EKDfGW7hhCPV-OYQpDj8wpYToo72O_U2LOQSAB4j4JikvASovjDOxWqksxNy7hmsQBqEF4VvLLK-UyMX'
const PAYPAL_PAYMENT_API = 'https://api-m.sandbox.paypal.com/v1/payments/payment';
const TOTAL = 100

function executePaymentEndpoint(paymentID) {
    return `${PAYPAL_PAYMENT_API}/${paymentID}/execute`
}

async function createPayment(parent, args, context, info) {
    let idUser = context.userInfo.id

    let cart = await CartModel.find({idUser: idUser})


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
        pp(_e.message)
    }

    return order.data
}

async function executePayment(parent, args, context, info) {
    const {paymentID, payerID} = args.input
    const endpoint = executePaymentEndpoint(paymentID)


    // let payment = await axios({
    //     method: 'POST',
    //     auth: {
    //         username: PAYPAL_CLIENT,
    //         password: PAYPAL_SECRET
    //     },
    //     data: {
    //         payer_id: payerID,
    //         transactions: [{
    //             amount: {
    //                 total: TOTAL.toString(),
    //                 currency: 'MXN'
    //             }
    //         }]
    //     },
    //     header: {
    //         'Content-Type': 'application/json'
    //     }
    // })

    pp(payment)

}

//=============================================================================
export default {
    Query: {},
    Mutation: {
        createOrder: authenticated(authorized('CLIENT', createOrder)),
        createPayment: authenticated(createPayment),
        executePayment: executePayment
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



