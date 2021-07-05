'use strict';
// libraries:
import util from 'util'
import _ from 'lodash';
import {DateTime} from 'luxon'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}

//==============================================================================


function segregateProductsByMonth(listOfProducts) {
    var result = {}
    listOfProducts.forEach(function segregatePublishes(p) {
            let date = DateTime.fromMillis(parseInt(p.publish.timestamp))
            let month = date.monthLong
            if (result.hasOwnProperty(month)) {
                result[month].push(p)
            } else {
                result[month] = [p]
            }
        }
    )
    return result
}

function remappedListOfProductFields(listOfProducts) {
    let result = []
    listOfProducts.forEach(function process(p) {
        result.push(remapProductFields(p))
    })
    return result
}

function remapProductFields(product) {
    let _p = product
    return {
        id: _p._id,
        sku: _p.sku,
        name: _p.name,
        quantity: _p.quantity,
        thumbnail: _p.listOfImages[0],
        price: {
            amount: _p.price.amount,
            currency: _p.price.currency
        },
        subtotal: _p.subtotal || (_p.price.amount * _p.quantity)
    }
}


function mapInputQuantityWithProductList(listOfOrderProducts, listOfStoreProducts) {
    let result = []

    listOfStoreProducts.forEach(function mappingValues(product) {
        let _product = _.cloneDeep(product)
        listOfOrderProducts.forEach(function functionName(entry) {
            if (entry.id === product.id) {
                _product.quantity = entry.quantity
                result.push(_product)
            }
        })
    })

    return result

}

function calculateTotalFromListOfProducts(listOfProducts) {
    let result = 0
    listOfProducts.forEach(function calculateTotal(el) {
        result = result + el.subtotal
    })
    return result
}

function listOfProductsFromListOfOrders(listOfOrders) {
    let result = []
    let listOfOrderProducts = listOfOrders.map((el) => {
        return el.listOfProducts
    })

    listOfOrderProducts.forEach((listOfProducts) => {
        listOfProducts.forEach((product) => {
            result.push(product)
        })
    })
    return result
}


export default {
    listOfProductsFromListOfOrders,
    segregateProductsByMonth,
    remapProductFields,
    remappedListOfProductFields,
    mapInputQuantityWithProductList,
    calculateTotalFromListOfProducts
}
