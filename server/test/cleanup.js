'use strict';
// libraries:
import mongoose from 'mongoose'
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../src/types/user/user.model';
import {OrdersModel} from '../src/types/order/order.model';
import {ProductModel} from '../src/types/product/product.model';
import {CartModel} from '../src/types/cart/cart.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))

//==============================================================================


export function dropAll() {
    var listOfModels = [
        UserModel, ProductModel, CartModel, OrdersModel
    ]
    listOfModels.forEach(async function (el) {
        try {
            await el.remove({})
        } catch (_e) {
            pp(_e.message)
        }
    })
}
