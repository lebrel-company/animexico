const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    order:{
        type:Array,
        require: true
    },
    total:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:'User'
    },
    address:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:'User'
    },
    status:{
        type: String,
        default: "PRENDIENTE"
    },
    created:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Order', ProductSchema);