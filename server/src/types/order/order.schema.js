import mongoose  from 'mongoose'

export default mongoose.Schema({
    listOfProducts:{
        type:Array,
        require: true
    },
    total:{
        type: Number,
        required: true
    },
    addressName: {
        type: String,
        enum: ['primary', 'secondary'],
        default: 'primary',
        required: true
    },
    status:{
        type: String,
        enum: ['PENDING', 'IN_TRANSIT', 'COMPLETED', 'CANCELED'],
        default: 'PENDING',
        required: true
    }
});
