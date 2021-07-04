'use strict';
// libraries:
import mongoose from 'mongoose'
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import status from '../../utils/status';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//==============================================================================


let CartProductSchema = new mongoose.Schema({
        id: {
            type: mongoose.ObjectId,
            required: true
        },
        sku: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        purchaseLimit: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            amount: {
                type: Number,
                required: true
            },
            currency: {
                type: String,
                required: true
            }
        }
    },
    {
        _id: false
    }
)



export var CartSchema = new mongoose.Schema(
    {
        idUser: {
            type: mongoose.Types.ObjectId,
            required: true,
            unique: true
        },
        status: {
            type: String,
            required: true,
            enum: [status.active, status.inactive]
        },
        listOfProducts: {
            type: [CartProductSchema],
            required: false
        },
        timeout: {
            start: {
                type: Number,
                required: true
            },
            end: {
                type: Number,
                required: true
            }
        }
    },
    {timestamps: true}
)


export var CartModel = mongoose.model('Carts', CartSchema)