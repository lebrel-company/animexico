'use strict';
const Product = require('../../models/Product');

async function createNewProduct (_,{input}){
    try {
        const newProduct = new Product(input);

        //save in data base
        const product = await newProduct.save();

        return product
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createNewProduct: createNewProduct
}

