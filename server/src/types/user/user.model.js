'use strict';
// libraries:
import mongoose from 'mongoose'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import AddressSchema from '../address/address.schema'
import OrderSchema from '../order/order.schema'
import ToySchema from '../toy/toy.schema'
//==============================================================================

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        trim: true,
    },
    middleName:{
        type: String,
        trim: true,
    },
    lastName:{
        type:String,
        required: true,
        trim: true,
    },
    secondLastName:{
        type: String,
        required: false,
        trim: true,
    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    birthday:{
        type: Date,
        required: true,
        trim: true,
        default: null
    },
    cellphone:{
        type: String,
        required: true,
        trim: true
    },
    mapOfAddresses: {
        type: Map,
        of: AddressSchema
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN','MEMBER', 'EDITOR']
    },
    listOfOrders: [OrderSchema],
    listOfToys: [ToySchema]
}, {
    timestamps:true
});

module.exports = mongoose.model('User', UserSchema);

