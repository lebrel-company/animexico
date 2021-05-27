'use strict';
// libraries:
import util from 'util'
import _ from 'lodash';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../product/product.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import _helpers from '../../utils/general.helpers'
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


function validateOrders(listOfOrderProducts, listOfProducts) {
    let result = {
        status: 'success',
        message: '',
        listOfErrors: []
    }
    let _listOfOrderProd = _.cloneDeep(listOfOrderProducts)
    let _listOfProd = _.cloneDeep(listOfProducts)

    let listOfValidations = [_validateProductOutOfStock, _validateProductPurchaseLimit]

    listOfValidations.forEach((validation) => {
        Array.prototype.push.apply(
            result.listOfErrors,
            validation(_listOfOrderProd, _listOfProd)
        )
    })

    if (result.listOfErrors.length > 0) {
        result.status = status.invalid
        result.message = errorMessages.message
    }

    return result
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --
function _validateProductPurchaseLimit(_listOfOrderProd, _listOfProd) {
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

function _validateProductOutOfStock(_listOfOrderProd, _listOfProd) {
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
    validateOrders
}
