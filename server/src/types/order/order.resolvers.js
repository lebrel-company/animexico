'use strict';
// libraries:
import util from 'util'
import mongoose from 'mongoose'
import _ from 'lodash'
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
import validations from './order.validations'
//==============================================================================
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

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
    // VALIDATE:
    let validationResults = validations.validateOrders(_i.listOfProducts, _p)
    if (validationResults.status === status.invalid) {
        return validationResults
    }
    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
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
        orderStatus: 'PENDING',
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
        throw new Error(
            'Unable to create order, please ' +
            'try again later or contact us for support.'
        )
    }

}


// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --

async function updateOrder(parent, arts, context, info) {
    return {}
}


export default {
    Query: {
        queryOrder
    },
    Mutation: {
        createOrder: authenticated(authorized('CLIENT', createOrder)),
        updateOrder: authenticated(updateOrder)
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



