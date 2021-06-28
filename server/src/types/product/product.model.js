const mongoose = require('mongoose');

var listOfMonths = [
    'JANUARY', 'FEBRUARY', 'MARCH',
    'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER',
    'OCTOBER', 'NOVEMBER', 'DECEMBER'
]

export var PublishSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
        trim: true
    }
},
    {
        _id: false
    }
)

export var ProductPriceSchema = mongoose.Schema({})

PublishSchema.virtual('month').get(function releaseMonth() {
        let _d = new Date(this.date)
        return listOfMonths[_d.getMonth()]
    }
)

export var InCartProductsSchema = new mongoose.Schema({
        idUser: {
            type: mongoose.ObjectId,
            required: true,
            unique: true
        },
        quantity: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        }
    },
    {
        _id: false
    }
)

var ProductSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            amount: {
                type: Number,
                required: true
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
            trim: true,
            unique: true
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
        purchaseLimit: {
            type: Number,
            required: true
        },
        publish: {
            type: PublishSchema,
            required: true
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
        }],
        inCarts: [{
            type: InCartProductsSchema,
            required: false
        }]

    },
    {timestamps: true}
);


export const ProductModel = mongoose.model('Product', ProductSchema);