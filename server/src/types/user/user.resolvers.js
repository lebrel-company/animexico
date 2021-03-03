'use strict';
const User = require('./user.model');
require('dotenv').config({path: 'variables.env'});
const jsonWebToken = require('jsonwebtoken');

//==============================================================================
// QUERIES:

async function queryUserByToken(_, {token}) {
    return await jsonWebToken.verify(token, process.env.SECRET)
}

async function queryUserInfo(parent, {}, context, info) {
    return await User.findById(context.user.id).exec();
}


//==============================================================================
// MUTATIONS:

async function createUser(parent, {input}, context, info) {
    const {email, password, birthday} = input;
    let age = getAge(birthday)
    if (age < 18) {
        throw new Error('You are not of legal age')
    }


    const userExists = await User.findOne({email})
    if (userExists) {
        throw new Error('That email has already been registered.')
    }

    const salt = await bcryptsjs.genSalt(10)
    input.password = await bcryptsjs.hash(password, salt);
    input.access = 'user'

    try {
        const user = new User(input);
        await user.save();
        console.log('Saving data')
        return user
    } catch (error) {
        console.log(error)
        return error;
    }
}

function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --

async function authUser(parent, {input}, context, info) {

    const {email, password} = input;

    const userExist = await User.findOne({email});
    if (!userExist) {
        throw new Error('Username does not exist')
    }

    const correctPassword = await bcryptsjs.compare(
        password, userExist.password
    );

    if (!correctPassword) {
        throw new Error('Password is Wrong')
    }

    return {
        token: createToken(userExist, process.env.SECRET, '24h')
    }
}

function createToken(user, secret, expiresIn) {
    const {
        id,
        firstName,
        middleName,
        lastName,
        secondLastName,
        email,
        birthday,
        cellphone,
        mapOfAddresses,
    } = user;

    return jsonWebToken.sign({
        id,
        firstName,
        middleName,
        lastName,
        secondLastName,
        email,
        birthday,
        cellphone,
        mapOfAddresses
    }, secret, {expiresIn})
}

//==============================================================================

export default {
    Query: {
        queryUserInfo,
        queryUserByToken
    },
    Mutations: {
        createUser,
        authUser
    }
}
