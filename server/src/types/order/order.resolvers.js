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
//==============================================================================
var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}


//==============================================================================


//==============================   TYPES   =====================================

//=============================   QUERIES   ====================================
async function queryOrder(parent, args, context, info) {
    return {}
}

//============================   MUTATIONS   ===================================

async function createOrder(parent, args, context, info) {
    let _i = args.input
    let listProductIdObjects = _i.listOfProducts.map((el) => {
        return mongoose.Types.ObjectId(el.id)
    })

    let _p = await ProductModel.find({_id: {$in: listProductIdObjects}})
    let listOfProducts = helpers.mapInputQuantityWithProductList(
        _i.listOfProducts, _p
    )
    let listOfSegregatedProducts = (
        helpers.segregateProductsByMonth(listOfProducts)
    )

    let mapBaseObject = {
        idUser: _i.idUser,
        address: _i.address,
        status: 'PENDING',
        shippingAddress: {}
    }

    let result = []
    listOfSegregatedProducts.forEach(function createOrderEntries(el) {
        let base = _.cloneDeep(mapBaseObject)
        let listOfProducts = helpers.filterListOfProductFields(el)
        base.listOfProducts = listOfProducts
        base.total = helpers.calculateTotalFromListOfProducts(listOfProducts)
        result.push(base)
    })

    try {
        await OrdersModel.insertMany(result)
        return result
    } catch (_e) {
        throw new Error(
            'Unable to create order, please ' +
            'try again later or contact us for support'
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
    }
}