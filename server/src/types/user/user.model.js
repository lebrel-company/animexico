const mongoose = require('mongoose');
const AddressSchema = require('../address/address.schema');

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
        enum: ['user','admin'],
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('User', UserSchema);



