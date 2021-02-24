const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    price:[{
        amount:{
            type:Number,
            required: true,
            trim: true
        },
        currency:{
            type:String,
            required: true,
            trim: true
        }
    }],
    description:{
        type: String,
        required: true,
        trim: true
    },
    
    jancode:{
        type:String,
        required: true,
        trim: true
    },        
    
    category:{
        type:String,
        required: true,
        trim: true
    },
    stock:{
        type: Number,
        required: true,
        trim: true
    },
    available:{
        type: Boolean,
        required: true,
        trim: true
    },
    images:{
        type: String,
        required: true,
        trim: true
    },
    created:{
        type: Date,
        dafault: Date.now()
    },
 
});


module.exports = mongoose.model('Product', ProductSchema);