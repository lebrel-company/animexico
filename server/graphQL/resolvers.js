const User = require('../models/User');
const bcryptsjs = require ('bcryptjs');
require('dotenv').config({ path: 'variables.env' });
const jasonWebToken = require('jsonwebtoken')


//Resolvers
const resolvers = {
        Query:{
            getUser:getUser
    },
        Mutation:{
            createNewUser: createNewUser ,
            authenticateUser:authenticateUser                              
        
    },          
        
    
}

async function createNewUser(parent, {input}, context, info){
    const{email, password} = input;

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
    const {id, email, name, lastname} = user;

    return jasonWebToken.sign({ id, email, name, lastname }, secret, {expiresIn})
}

async function getUser(parent, {token}, context, info){
    const userId = await jasonWebToken.verify(token, process.env.SECRET )

    return userId
}




module.exports = resolvers;
