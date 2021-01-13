const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    middleName:{
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        trim: true
    },
    secondLastname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    birthday:{
        type: String,
        required:true,
        trim: true,
    },
    cellphone:{
        type: String,
        required: true,
        trim: true
    },
    address:{
        city:{
            type: String,
            required: true,
            trim: true
        } ,
        state:{
            type: String,
            required:true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },       
        
        zipcode:{
            type: Number,
            required: true,
            trim: true
        },
        street:{
            type: String,
            required: true,
            trim: true
        },
        buildingNumber:{
            type: String,
            required: true,
            trim: true
        },
        apartmentNumber:{
            type: String,
            required: true,
            trim: true
        },
    },
    created:{
        type: Date,
        default: Date.now()
    },
    access:{
        type: String,
        required: true,
        enum: String
    }
});

module.exports =  mongoose.model('User', UsersSchema)