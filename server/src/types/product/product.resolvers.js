'use strict';
// libraries:
import {ProductModel} from './product.model';
import {authenticated, authorized} from '../../utils/auth';
import {DateTime} from 'luxon'
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))

//=============================================================================


export function generatePublishDatesInput(ISOPublishDate) {
    let d = DateTime.fromISO(ISOPublishDate)
    return {
        date: d,
        timestamp: d.ts.toString(),
        local: d.setLocale('ES-MX').toLocaleString(DateTime.DATE_FULL)
    }

}

async function createProduct(parent, args, context, info) {

    let product = args.input
    product.publish = generatePublishDatesInput(product.publish)

    try {
        return await ProductModel.create(product)
    } catch (e) {
        throw new Error(e.message)
    }
}


// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --

async function queryListOfProducts() {
    var _p = await ProductModel.find({'available': true})
    pp(_p)
    return _p
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --

async function updateProduct(parent, args, context, info) {
    const _product = await ProductModel.findOneAndUpdate(
        {
            _id: args.id
        },
        {
            name: args.name,
            price: {
                amount: args.price.amount,
                currency: args.price.currency
            },
            description: args.description,
            sku: args.sku,
            stock: args.stock,
            publishDate: new Date(args.publish),
            available: args.available,
            listOfImages: args.listOfImages,
            listOfTags: args.listOfTags
        }
    );
}

async function queryProductById(parent, args, context, info) {
    var result;
    try {
        result = await ProductModel.findOne({_id: args.input})
        console.log(result)
    } catch (_e) {
        console.log(_e)
    }

    return result
}

//==============================================================================

export default {
    Query: {
        queryProducts: queryListOfProducts,
        queryProductById: queryProductById
    },
    Mutation: {
        createProduct: authenticated(
            authorized('ADMIN', createProduct)
        ),
        updateProduct: authenticated(
            authorized('ADMIN', updateProduct)
        )
    }
};
