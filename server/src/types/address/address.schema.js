import mongoose from 'mongoose'

export default mongoose.Schema({
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        zipcode: {
            type: String,
            trim: true
        },
        neighbourhood: {
            type: String,
            trim: true
        },
        street: {
            type: String,
            trim: true
        },
        buildingNumber: {
            type: String,
            trim: true
        },
        apartmentNumber: {
            type: String,
            trim: true
        }
    },
)
