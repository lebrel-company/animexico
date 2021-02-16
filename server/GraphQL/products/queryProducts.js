'use strict';
const Product = require('../../models/Product');

async function queryProducts(){
    try {
        const products = await Product.find({})
        return products
    } catch (error) {
        console.log(error);
    }
}

async function queryProduct(_, {id}){
    //check if the product exist
    const product = await Product.findById(id);

    if(!product){
        throw new Error('Product not found')
    }

    return product;
}


module.exports = {
    queryProduct: queryProduct,
    queryProducts: queryProducts
}
