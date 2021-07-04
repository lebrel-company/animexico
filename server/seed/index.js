'use strict';
// libraries:
import util from 'util'
import mongoose from 'mongoose'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../src/types/product/product.model';
import {UserModel} from '../src/types/user/user.model';
import {OrdersModel} from '../src/types/order/order.model';
import {hashPassword} from '../src/utils/auth';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {forDatabaseInsertion, listOfProducts} from './product_data';
import {listOfUsers} from './user_data';

var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}
//==============================================================================

var DATABASE = 'mongodb://localhost:27017/database'

mongoose.connect(
    DATABASE,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
)

var listOfFormattedUsers = []

listOfUsers.forEach(async function _hash(el) {
    try {
        el.password = await hashPassword(el.password)
        listOfFormattedUsers.push(el)
    } catch (_e) {
        pp(_e)
        // Handle error here
    }
})

pp(listOfFormattedUsers)

async function drop(model) {
    try {
        return await model.collection.drop()
    } catch (_e) {
        return ('Unable to drop collection')
    }
}

async function seed(model, data) {
    try {
        await model.create(data)
    } catch (_e) {
        pp(_e)
    }
}

UserModel._name = 'UserModel'
ProductModel._name = 'ProductModel'

let listOfModels = [
    [UserModel, listOfFormattedUsers],
    [ProductModel, forDatabaseInsertion()]
]

listOfModels.forEach(async function functionName(_m) {
    pp(`Seeding ${_m[0]._name}`)
    await drop(_m[0])
    await seed(_m[0], _m[1])
    process.exit(0)
})




