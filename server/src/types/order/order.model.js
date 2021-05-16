'use strict';
// libraries:
import mongoose from 'mongoose';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// schemas:
import AddressSchema from '../address/address.schema';
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
    price: {type: Number, required: true}
});

OrderProductSchema.virtual('subtotal').get(function getSubtotal() {
    return this.quantity * this.price;
});

export var OrdersSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    listOfProducts: {
        type: [OrderProductSchema],
        require: true
    },
    total: {
        type: Number,
        required: true
    },
    shippingAddress: AddressSchema,
    status: {
        type: String,
        enum: ['PENDING', 'IN_TRANSIT', 'COMPLETED', 'CANCELED'],
        default: 'PENDING'
    }
});

export var OrdersModel = mongoose.model('Orders', OrdersSchema);
