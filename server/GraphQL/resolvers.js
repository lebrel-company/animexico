const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');



const bcryptsjs = require ('bcryptjs');
require('dotenv').config({ path: 'variables.env' });
const jasonWebToken = require('jsonwebtoken')


//Resolvers
const resolvers = {
        Query:{
            getUser:getUser,
            getProducts:getProducts,
            getProduct:getProduct,
            
    },
        Mutation:{
            createNewUser: createNewUser ,
            authenticateUser:authenticateUser,
            newProduct:newProduct,
            updateProduct:updateProduct,
            deleteProduct:deleteProduct,
            newOrder:newOrder,
            deleteUser:deleteUser,
            updateUser:updateUser                          
        
    },         
}

async function createNewUser(parent, {input}, context, info){
    const{email, password, birthday} = input;

    let age = getAge(birthday)

    if(age < 18){
        throw new Error('You are not of legal age')
    }  

    
    const userExists = await User.findOne({email})
    if(userExists){
        throw new Error('The user is already registered')
    }
    // TODO: Hash the password or any other data that require.
    const salt = await bcryptsjs.genSalt(10)
    input.password = await bcryptsjs.hash(password, salt);    

    try {
        //save new user in database
        const user = new User(input);
        user.save();
        return user
    } catch (error) {
        console.log(error)
    }
}

async function authenticateUser(parent, {input}, context, info){

    const { email, password} = input;

    //if the user exist
    const userExist = await User.findOne({email});
    if(!userExist){
        throw new Error('Username does not exist')
    }
    
    //Check if the user is correct
    const correctPassword = await bcryptsjs.compare(password, userExist.password );
    if(!correctPassword){
        throw new Error('Password is Wrong')
    }


    //create the Token

    return{
        token: createToken(userExist, process.env.SECRET, '24h')
    }
}

function createToken(user, secret, expiresIn){
    //console.log(user);
    const {id, email, name, lastname, address} = user;

    return jasonWebToken.sign({ id, email, name, lastname, address }, secret, {expiresIn})
}

async function getUser(_,{id}){

      const user = await User.findById(id)

      if(!user){
        throw new Error('User not found')
    }

    return user;
    
}

//Products resolvers

async function newProduct (_,{input}){
    try {
        const newProduct = new Product(input);


        //save in data base
        const product = await newProduct.save();

        return product
    } catch (error) {
        console.log(error);
    }
}

async function getProducts(){
    try {
        const products = await Product.find({})
        return products
    } catch (error) {
        console.log(error);
    }
}

async function getProduct(_, {id}){
    //check if the product exist
    const product = await Product.findById(id);

    if(!product){
        throw new Error('Product not found')
    }

    return product;
}

async function updateProduct(_, {id, input}){
    //check if the product exist
    let product = await Product.findById(id);

    if(!product){
        throw new Error('Product not found')
    }

    product = await Product.findOneAndUpdate({_id : id}, input, {new: true});

    return product;

}

async function deleteProduct (_, { id }){

    //check if the product exist
    let product = await Product.findById(id);

    if(!product){
        throw new Error('Product not found');
    }

    //Remove product
    await Product.findByIdAndDelete({_id: id});

    return "Product deleted"
}

async function newOrder (_,{input}, context){

    const {user, address} = input;
    
    
    //check if the user exist

    let userExist = await User.findById(user)
    if(!userExist){
        throw new Error ('User does not exist')
    }

    for await (const piece of input.order){
        const { id } = piece;

        const product = await Product.findById(id);

        if(piece.amount > product.stock){
            throw new Error(`El articulo: ${product.name} exceed the quantity available`)
        }else{
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
async function deleteUser (_, { id }){

    //check if the product exist
    let user = await User.findById(id);

    if(!user){
        throw new Error('User not found');
    }

    //Remove product
    await User.findByIdAndDelete({_id: id});

    return "User deleted"
}

async function updateUser(_, {id,input}){
    const{ password } = input;
    

    //check if the user exist
    let user = await User.findById(id);
    
    if(!user){
        throw new Error('User not found')
    }
    const salt = await bcryptsjs.genSalt(10)
    input.password = await bcryptsjs.hash(password, salt); 
    
    user = await User.findOneAndUpdate({_id : id}, input, {new: true});

    return user;

}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

module.exports = resolvers;
