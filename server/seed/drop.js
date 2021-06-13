'use strict';
// libraries:
import util from 'util'
import mongoose from 'mongoose'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../src/types/product/product.model';
import {UserModel} from '../src/types/user/user.model';
import {OrdersModel} from '../src/types/order/order.model';
import {CartModel} from '../src/types/cart/cart.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}
//==============================================================================

var DATABASE = 'mongodb://localhost:27017/database'

mongoose.connect(DATABASE)


async function drop() {
    try {
        await ProductModel.remove({})
        await UserModel.remove({})
        await OrdersModel.remove({})
        await CartModel.remove({})
    } catch (e) {
        pp(e)
    }

}

drop()

process.exit(0)

