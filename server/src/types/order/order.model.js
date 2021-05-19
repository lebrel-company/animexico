'use strict';
// libraries:
import mongoose from 'mongoose';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// schemas:
import AddressSchema from '../address/address.schema';
import {ProductPriceSchema} from '../product/product.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

let OrderProductSchema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    currency: {type: String, default: 'MXN', required: false},
    quantity: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
            trim: true
        }
    },
    subtotal: {
        type: Number,
        required: true
    }
});


export var OrderSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    listOfProducts: {
        type: [OrderProductSchema],
        require: true
    },
    address: {
        type: String,
        required: true
    },
    shippingAddress: AddressSchema,
    status: {
        type: String,
        enum: ['PENDING', 'READY', 'IN_TRANSIT', 'COMPLETED', 'CANCELED'],
        default: 'PENDING'
    },
    total: {
        type: Number,
        required: true
    }
});


export var OrdersModel = mongoose.model('Orders', OrderSchema);
