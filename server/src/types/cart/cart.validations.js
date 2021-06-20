'use strict';
// libraries:
import util from 'util'
import {ProductModel} from '../product/product.model';
import _ from 'lodash';
import produce from 'immer'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import status from '../../utils/status';
import {globalSettings} from '../../config/settings';

var pp = (el) => console.log(util.inspect(el, false, 5, true))

//==============================================================================


var fields = {
    product: ['id', 'code', 'name', 'price', 'quantity', 'purchaseLimit', 'listOfImages']
}

export function validateCart(nextResolver) {
    return context(validateListOfProducts(nextResolver))
}


function __validateArguments(args) {
    let listOfProducts = _.get(args, ['input', 'listOfProducts'])
    if (!listOfProducts) {
        return {
            status: status.invalid,
            message: status.messages.cart.update.invalid,
            listOfErrors: ['There is no list of products in your request.']
        }
    } else {
        return {
            status: status.success,
            listOfProducts: listOfProducts
        }
    }
}

function hydrateContext(context, data) {
    let ctx = _.cloneDeep(context)
    return _.assign(ctx, data)
}

function hydrateProducts(listOfProducts, listOfStoreProducts) {
    let result = []

    listOfProducts.forEach((inputProduct) => {
        listOfStoreProducts.forEach((storeProduct) => {
                if (storeProduct._id.toString() === inputProduct.id.toString()) {
                    inputProduct.code = storeProduct.code
                    inputProduct.name = storeProduct.name
                    inputProduct.price = storeProduct.price
                    inputProduct.purchaseLimit = storeProduct.purchaseLimit
                    inputProduct.thumbnail = storeProduct.listOfImages[0]
                }
            }
        )
        result.push(inputProduct)
    })


    return result
}


function context(nextResolver) {
    return async function resolver(parent, args, context, info) {
        let _argsVal = __validateArguments(args)
        if (_argsVal.status === status.invalid) return _argsVal

        let {listOfProducts} = _argsVal
        let listOfProductIds = _.map(listOfProducts, (el) => {
            return {id: el.id}
        })

        let listOfProductsInStore = await ProductModel.find(
            {'_id': {$in: _.map(listOfProductIds, p => p.id)}}, fields.product
        ).lean()


        listOfProducts = hydrateProducts(listOfProducts, listOfProductsInStore)

        let data = {
            newCartData: {listOfProducts},
            newCartIds: listOfProductIds,
            listOfProductsInStore: listOfProductsInStore,
            cart: null,
            listOfErrors: []
        }

        context = hydrateContext(context, data);

        return nextResolver(parent, args, context, info)
    }
}




function validateListOfProducts(nextResolver) {
    return async function resolver(parent, args, context, info) {
        let ctx = _.cloneDeep(context)
        let listOfProductsInStore = ctx.listOfProductsInStore
        let listOfNewCartProducts = ctx.newCartData.listOfProducts


        let result = [] // Stands for listOfErrors
        result = _.concat(
            result,
            productExists(listOfProductsInStore, listOfNewCartProducts)
        )
        result = _.concat(
            result,
            productStock(listOfProductsInStore, listOfNewCartProducts)
        )
        result = _.concat(
            result,
            productPurchaseLimit(listOfProductsInStore, listOfNewCartProducts)
        )

        context.listOfErrors = _.concat(context.listOfErrors, result)

        return nextResolver(parent, args, context, info)

    }
}

function productExists(listOfProductsInStore, listOfNewCartProducts) {
    let _storeIds = _.map(listOfProductsInStore, (p) => {
        p._id
    })
    let _newCartIds = _.map(listOfNewCartProducts, (p) => {
        p._id
    })

    let listOfDifferentIds = _.difference(_storeIds, _newCartIds)

    if (!listOfDifferentIds) return []

    let listOfErrors = []
    listOfDifferentIds.forEach((_id) => {
        listOfNewCartProducts.forEach((p) => {
            p._id === _id ?
                listOfErrors.push(
                    `${p._id} ${p.name} does not exists.`
                ) : null
        })
    })

    return listOfErrors

}

function productStock(listOfProductsInStore, listOfNewCartProducts) {
    let listOfErrors = []
    listOfProductsInStore.forEach((storeProduct) => {
        listOfNewCartProducts.forEach((newProduct) => {
            if (
                storeProduct._id === newProduct._id &&
                storeProduct.stock < newProduct.quantity
            ) {
                listOfErrors.push('Not enough pieces in stock')
            }
            listOfErrors.push()
        })
    })

    return listOfErrors
}

function productPurchaseLimit(listOfProductsInStore, listOfNewCartProducts) {
    let listOfErrors = []
    listOfProductsInStore.forEach((storeProduct) => {
        listOfNewCartProducts.forEach((newProduct) => {
            if (
                storeProduct._id === newProduct.id.toString() &&
                storeProduct.purchaseLimit < newProduct.quantity
            ) {
                listOfErrors.push('Exceeding limit on allowed pieces')
            }
            listOfErrors.push()
        })
    })
    return listOfErrors
}

export var cartProductValidation = {
    productStock, productPurchaseLimit, productExists
}
