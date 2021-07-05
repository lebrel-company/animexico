'use strict';
// libraries:
import util from 'util'
import _ from 'lodash'
import axios from 'axios'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {OrdersModel} from './order.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {authenticated, authorized} from '../../utils/auth';
import h from './order.helpers';
import status from '../../utils/status'
import {validateOrderCreation} from './order.validations'
import {CartModel} from '../cart/cart.model';

var pp = (el) => console.log(util.inspect(el, false, 5, true))

//==============================================================================


async function createOrder(parent, args, context, info) {
    let _i = args.input
    let {paypal} = args.input

    let listOfProducts = h.mapInputQuantityWithProductList(
        _i.listOfProducts, context.listOfProducts
    )
    let listOfSegregatedProducts = (
        h.segregateProductsByMonth(listOfProducts)
    )

    let result = {
        status: 'success',
        message: 'Order created successfully',
        listOfOrders: []
    }

    let mapBaseObject = {
        idUser: context.userInfo.id,
        address: _i.address,
        orderStatus: status.order.pending,
        shippingAddress: {},
        paypal
    }


    _.forEach(listOfSegregatedProducts, (listOfProducts, month) => {
        let base = _.cloneDeep(mapBaseObject)
        let listOfRemappedProducts = (
            h.remappedListOfProductFields(listOfProducts)
        )
        base.month = month
        base.listOfProducts = listOfRemappedProducts
        base.total = h.calculateTotalFromListOfProducts(listOfRemappedProducts)
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

// __ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ __

function executePaymentEndpoint(paymentID) {
    return `${PAYPAL_PAYMENT_API}/${paymentID}/execute`
}

function getTotalFromCart(cart) {
    let {listOfProducts} = cart
    let total = 0
    listOfProducts.forEach((product) => {
        total += (product.price.amount * product.quantity)
    })
    return total
}

// __ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ __

async function createPayment(parent, args, context, info) {
    let idUser = context.userInfo.id
    let cart = await CartModel.findOne({idUser: idUser})
    try {
        let order = await axios({
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
                        total: getTotalFromCart(cart).toString(),
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

        return order.data

    } catch (_e) {
        throw Error(_e.message)
    }

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
        createOrder: authenticated(
            authorized('CLIENT', validateOrderCreation(createOrder))
        ),
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



