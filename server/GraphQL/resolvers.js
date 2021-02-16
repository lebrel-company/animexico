const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const bcryptsjs = require('bcryptjs');
require('dotenv').config({path: 'variables.env'});
const {createNewUser} = require('./user/createNewUser');
const {authenticateUser} = require('./user/authenticateUser');
const {queryProducts, queryProduct} = require('./products/queryProducts');
const {createNewProduct} = require('./products/createNewProduct')
const {queryUserByToken, queryUserInfo} = require('./user/queryUser')


//Resolvers
const resolvers = {
    Query: {
        queryUserByToken: queryUserByToken,
        queryProducts: queryProducts,
        queryProduct: queryProduct,
        queryUserInfo: queryUserInfo
    },
    Mutation: {
        createNewUser: createNewUser,
        authenticateUser: authenticateUser,
        createNewProduct: createNewProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct,
        newOrder: newOrder,
        deleteUser: deleteUser,
        updateUser: updateUser,
        resetPassword: resetPassword
    },
}


async function updateProduct(_, {id, input}) {
    //check if the product exist
    let product = await Product.findById(id);

    if (!product) {
        throw new Error('Product not found')
    }

    product = await Product.findOneAndUpdate({_id: id}, input, {new: true});

    return product;

}

async function deleteProduct(_, {id}) {

    //check if the product exist
    let product = await Product.findById(id);

    if (!product) {
        throw new Error('Product not found');
    }

    //Remove product
    await Product.findByIdAndDelete({_id: id});

    return "Product deleted"
}

async function newOrder(_, {input}, context) {

    const {user, address} = input;


    //check if the user exist

    let userExist = await User.findById(user)
    if (!userExist) {
        throw new Error('User does not exist')
    }

    for await (const piece of input.order) {
        const {id} = piece;

        const product = await Product.findById(id);

        if (piece.amount > product.stock) {
            throw new Error(`El articulo: ${product.name} exceed the quantity available`)
        } else {
            //subtract from available quantity
            product.stock = product.stock - piece.amount;

            await product.save()
        }

    }
    //create new order
    const newOrder = new Order(input);


    //assign new order
    newOrder.user = newOrder.user;


    const result = await newOrder.save()

    return result

}

async function deleteUser(_, {id}) {

    //check if the product exist
    let user = await User.findById(id);

    if (!user) {
        throw new Error('User not found');
    }

    //Remove product
    await User.findByIdAndDelete({_id: id});

    return "User deleted"
}

async function updateUser(_, {input}, context) {

    //console.log(context)
    let user = await User.findById(context.user.id);

    let id = user.id

    user = await User.findOneAndUpdate({_id: id}, input, {new: true});
    console.log(user)

    return user

}


async function resetPassword(parent, {input}, context, info) {

    const {email, password, confirmPassword} = input

    let user = await User.findOne({email});
    if (!user) {
        throw new Error('User not found')
    }
    if (password !== confirmPassword) {
        throw new Error('The password is not the same')
    }
    const salt = await bcryptsjs.genSalt(10)
    input.password = await bcryptsjs.hash(password, salt);

    let id = user.id;

    user = await User.findByIdAndUpdate({_id: id}, input, {new: true})

    return user;

}


module.exports = resolvers;
