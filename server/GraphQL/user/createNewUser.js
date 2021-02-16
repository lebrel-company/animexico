'use strict';
const User = require('../../models/User');
const bcryptsjs = require ('bcryptjs');
require('dotenv').config({ path: 'variables.env' });

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
    input.access = 'user'
    console.log('DATA:', input)

    try {
        //save new user in database
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
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


module.exports = {
    createNewUser: createNewUser
}