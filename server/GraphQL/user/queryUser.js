'use strict';
const User = require('../../models/User');
require('dotenv').config({ path: 'variables.env' });


async function queryUserByToken(_,{token}){
    return await jasonWebToken.verify(token, process.env.SECRET)
}

async function queryUserInfo(parent,{},context,info){
   
    return await User.findById(context.user.id);
}

module.exports = {
    queryUserByToken: queryUserByToken,
    queryUserInfo: queryUserInfo
}