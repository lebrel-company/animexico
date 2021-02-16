const User = require('../../models/User');
const bcryptsjs = require ('bcryptjs');
require('dotenv').config({ path: 'variables.env' });
const jasonWebToken = require('jsonwebtoken')

async function authenticateUser(parent, {input}, context, info){

    const { email, password} = input;

    const userExist = await User.findOne({email});
    if(!userExist){
        throw new Error('Username does not exist')
    }

    const correctPassword = await bcryptsjs.compare(password, userExist.password );
    if(!correctPassword){
        throw new Error('Password is Wrong')
    }

    return{
        token: createToken(userExist, process.env.SECRET, '24h')
    }
}

function createToken(user, secret, expiresIn){
    const {
        id,
        name,
        middleName,
        lastname,
        secondLastname,
        email,
        birthday,
        cellphone,
        address,
        secondaryAddress
    } = user;

    return jasonWebToken.sign({ id,
        name,
        middleName,
        lastname,
        secondLastname,
        email,
        birthday,
        cellphone,
        address,
        secondaryAddress}, secret, {expiresIn})
}



module.exports = {
    authenticateUser: authenticateUser
};