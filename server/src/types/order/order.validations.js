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

var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}

//==============================================================================

var errorMessages = {
    message: 'Lo sentimos, hubo un error al procesar tu orden',
    invalidQuantity: (name, purchaseLimit) => {
        return `El limite de compra de ${name} es de ${purchaseLimit}`
    },
    outOfStock: (name, stock) => {
        return `Quedan ${stock} piezas de ${name}`
    }
}

function order(listOfOrderProducts, listOfProducts) {
    let result = []
    result = __productPurchaseLimit(listOfOrderProducts, listOfProducts)
    result = _.concat(
        result, __productOutOfStock(listOfOrderProducts, listOfProducts)
    )
    return result
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --
function __productPurchaseLimit(_listOfOrderProd, _listOfProd) {
    let result = []
    _listOfOrderProd.forEach((_op) => {
        _listOfProd.forEach((_p) => {
            let match = _op.id === _p.id
            if (match && (_op.quantity > _p.purchaseLimit)) {
                result.push(
                    errorMessages.invalidQuantity(_p.name, _p.purchaseLimit)
                )
            }
        })
    })
    return result
}

function __productOutOfStock(_listOfOrderProd, _listOfProd) {
    let result = []
    _listOfOrderProd.forEach((_op) => {
        _listOfProd.forEach((_p) => {
            let match = _op.id === _p.id
            if (match && (_op.quantity > _p.stock)) {
                result.push(
                    errorMessages.outOfStock(_p.name, _p.stock)
                )
            }
        })
    })
    return result
}


export default {
    order
}
