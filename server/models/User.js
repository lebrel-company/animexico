
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    middleName:{
        type: String,
        trim: true
    },
    lastname:{
        type:String,
        required: true,
        trim: true
    },
    secondLastname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique: true
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
    address: [{
        city:{
            type: String,
            required: true,
            trim: true
        },
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
        suburb:{
            type: String,
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
        
    
    }],
    secondaryAddress: [{
        city:{
            type: String,
            required: true,
            trim: true
        },
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
        suburb:{
            type: String,
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
        
    
    }],

    created:{
        type: Date,
        default: Date.now()
    },

    access:{
        type: String,
        required: true,
        enum: ['user','admin'],
    }
});

module.exports = mongoose.model('User', UserSchema);



