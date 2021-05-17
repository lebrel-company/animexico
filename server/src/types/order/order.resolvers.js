'use strict';
// libraries:
import mongoose from 'mongoose'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../user/user.model';
import {ProductModel} from '../product/product.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {authenticated, authorized} from '../../utils/auth';

var cl = console.log
//==============================================================================


//==============================   TYPES   =====================================

//=============================   QUERIES   ====================================
async function queryOrder(parent, args, context, info) {
    return {}
}

//============================   MUTATIONS   ===================================

async function createOrder(parent, args, context, info) {
    cl('>'.repeat(40))

    let _i = args.input
    let _u = await UserModel.findById(_i.idUser)
    let listProductIdObjects = _i.listOfProductIds.map((el) => {
        return mongoose.Types.ObjectId(el)
    })
    let _p = await ProductModel.find({_id: {$in: listProductIdObjects}})

    cl(_i)

    cl('>'.repeat(40))
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