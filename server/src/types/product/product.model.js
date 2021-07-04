'use strict';
// libraries:
import util from 'util'
const mongoose = require('mongoose');
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


export var PublishSchema = mongoose.Schema({
        date: {
            type: Date,
            required: true,
            trim: true
        },
        timestamp: {
            type: String,
            required: true
        },
        local: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
)


export var InCartProductsSchema = new mongoose.Schema({
        idUser: {
            type: mongoose.ObjectId,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        }
    },
    {
        _id: false
    }
)

var ProductSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
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
        description: {
            type: String,
            required: true,
            trim: true
        },
        sku: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        stock: {
            type: Number,
            required: true,
            trim: true
        },
        available: {
            type: Boolean,
            required: true,
            trim: true
        },
        purchaseLimit: {
            type: Number,
            required: true
        },
        publish: {
            type: PublishSchema,
            required: true
        },
        listOfImages: [{
            type: String,
            required: true,
            trim: true
        }],
        listOfTags: [{
            type: String,
            required: false,
            trim: true
        }],
        inCarts: [{
            type: InCartProductsSchema,
            required: false
        }]

    },
    {timestamps: true}
);


export const ProductModel = mongoose.model('Product', ProductSchema);