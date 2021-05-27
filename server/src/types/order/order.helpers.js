'use strict';
// libraries:
import util from 'util'
import _ from 'lodash';
import {listOfProducts} from '../../../test/product_data';
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
    listOfProducts.forEach(function segregatePublishes(el) {
            if (result.hasOwnProperty(el.publish.month)) {
                result[el.publish.month].push(el)
            } else {
                result[el.publish.month] = [el]
            }
        }
    )
    return Object.values(result)
}

function filterListOfProductFields(listOfProducts) {
    let result = []
    listOfProducts.forEach(function process(el) {
        result.push(filterProductFields(el))
    })
    return result
}

function filterProductFields(product) {
    let _p = product
    return {
        id: _p._id,
        code: _p.code,
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


function mapInputQuantityWithProductList(listOfInputs, listOfProducts) {
    let result = []

    listOfProducts.forEach(function mappingValues(product) {
        let _product = _.cloneDeep(product)
        listOfInputs.forEach(function functionName(entry) {
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
    filterProductFields,
    filterListOfProductFields,
    mapInputQuantityWithProductList,
    calculateTotalFromListOfProducts
}
