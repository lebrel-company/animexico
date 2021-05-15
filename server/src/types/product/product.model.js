const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            amount: {
                type: Number,
                required: true,
                trim: true
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
        code: {
            type: String,
            required: true,
            trim: true
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
        publishDate: {
            type: Date,
            required: true
        },
        purchaseLimit:{
            type: Number,
            required: true,
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
        }]
    },
    {timestamps: true}
);


export const ProductModel = mongoose.model('Product', ProductSchema);