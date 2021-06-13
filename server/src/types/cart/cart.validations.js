'use strict';
// libraries:
import util from 'util'
import {ProductModel} from '../product/product.model';
import _ from 'lodash';
import status from '../../utils/status';
import mongoose from 'mongoose'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))

//==============================================================================


function products(nextResolver) {
    return async function _resolver(parent, args, context, info) {
        let result = {}
        let cartProduct = args.input.product
        let product;
        let _id = mongoose.Types.ObjectId(cartProduct.id)
        try {
            product = await ProductModel.findById(_id)
        } catch (_e) {
            throw Error(_e.message)
        }
        let loe = [] // Stands for listOfErrors
        loe = _.concat(loe, __productExists(product))
        loe = _.concat(loe, __productStock(product, cartProduct))
        loe = _.concat(loe, __productPurchaseLimit(product, cartProduct))

        if (loe.length > 0) {
            result.status = status.invalid
            result.message = status.messages.cart.creation.invalid
            result.listOfErrors = loe
            return result
        } else {
            context.product = product
            context.cartProduct = cartProduct
            return nextResolver(parent, args, context, info)
        }
    }
}

function __productExists(product, cartProduct = {}) {
    let result = []
    if (product === null) {
        result.push('Non existing product')
    }
    return result
}

function __productStock(product, cartProduct) {
    let result = []
    if (product === null) return result;
    if (product.stock < cartProduct.quantity) {
        result.push('Not enough stock')
    }
    return result
}

function __productPurchaseLimit(product, cartProduct) {
    let result = []
    if (product === null) return result;
    if (cartProduct > product.purchaseLimit) {
        result.push('Invalid product quantity')
    }
    return result
}


export default {
    products
}