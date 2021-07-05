'use strict';
// libraries:
import util from 'util'
import _ from 'lodash';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {listOfProductsFromListOfOrders} from './order.helpers'
import status from '../../utils/status'
import {ProductModel} from '../product/product.model';

var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}

//==============================================================================


export function validateOrderCreation(nextResolver) {
    return findProductsAndHydrateContext(
        validateProductsQuantity(nextResolver)
    )
}

// __ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ __
// CONTEXT HYDRATION:


function findProductsAndHydrateContext(nextResolver) {
    return async function _findProductsAndHydrateContext(
        parent, args, context, info
    ) {
        let {listOfProducts} = args.input
        let listOfIds = listOfProducts.map(p => p.id)

        // lop = listOfProducts
        let lop = await ProductModel.find({_id: {$in: listOfIds}})

        if (lop === null && lop.length !== listOfIds.length) {
            return {
                status: status.invalid,
                message: status.messages.order.creation.invalid,
                listOfErrors: [
                    'Cannot find products with given IDs.',
                    'Amount of given IDs does not match Products found.'
                ]
            }
        } else {
            context.listOfProducts = lop
            return nextResolver(parent, args, context, info)
        }
    }
}

// __ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ __
// ORDER PRODUCTS VALIDATIONS:

function validateProductsQuantity(nextResolver) {
    return async function _validateProductsQuantity(
        parent, args, context, info
    ) {
        let loe = [] // for "list of errors"
        context.listOfProducts.forEach((storeProduct) => {
            args.input.listOfProducts.forEach((orderProduct) => {
                let _id = storeProduct._id.toString()
                if (_id === orderProduct.id) {
                    loe = _.concat(
                        loe, __validProductQuantityVsStock(
                            storeProduct, orderProduct
                        )
                    )
                    loe = _.concat(
                        loe, __validProductQuantityVsPurchaseLimit(
                            storeProduct, orderProduct
                        )
                    )
                }
            })
        })

        if (loe.length > 0) {
            return {
                status: status.invalid,
                message: status.messages.order.creation.invalid,
                listOfErrors: loe
            }
        } else {

            return nextResolver(parent, args, context, info)
        }

    }
}

function __validProductQuantityVsStock(storeProduct, orderProduct) {
    let result = []
    if (storeProduct.stock < orderProduct.quantity) {
        result.push(
            `Not enough stock to fulfill the Order for Product ${storeProduct.id}.`
        )
    }
    return result
}

function __validProductQuantityVsPurchaseLimit(storeProduct, orderProduct) {
    let result = []
    if (storeProduct.purchaseLimit < orderProduct.quantity) {
        result.push(
            `Product ${storeProduct.id} over the purchase limit.`
        )
    }
    return result
}






