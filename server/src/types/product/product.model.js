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
        images: [{
            type: String,
            required: true,
            trim: true
        }],
    },
    {timestamps: true}
);


module.exports = mongoose.model('Product', ProductSchema);