import mongoose from 'mongoose'

export default mongoose.Schema({
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        zipcode: {
            type: Number,
            required: true,
            trim: true
        },
        neighbourhood: {
            type: String,
            required: true,
            trim: true
        },
        street: {
            type: String,
            required: true,
            trim: true
        },
        buildingNumber: {
            type: String,
            required: true,
            trim: true
        },
        apartmentNumber: {
            type: String,
            required: true,
            trim: true
        }
    },
)
