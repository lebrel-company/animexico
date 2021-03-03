const Product = require('./product.model');

//==============================================================================


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

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --

async function queryListOfProducts(){
    try {
        const products = await Product.find({}).exec();
        return products;
    } catch (error) {
        console.log(error);
    }
}

async function queryProduct(_, {id}){
    const product = await Product.findById(id);
    if(!product){
        throw new Error('Product not found')
    }
    return product;
}


//==============================================================================

export default {
    Query: {
        queryListOfProducts
    },
    Mutation: {
        createNewProduct
    }
}
