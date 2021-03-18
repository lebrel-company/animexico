import mongoose from 'mongoose'

export default mongoose.Schema({
        jancode: {
            type: String,
            required: true,
            trim: true
        },
        purchasedAmount: {
            type: Number,
            required: true
        },
        limit:{
            type: Number,
            required: true
        }
    }
)
