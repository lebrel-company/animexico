import {AuthenticationError} from 'apollo-server'
import User from '../types/user/user.model'
import jsonWebToken from 'jsonwebtoken'
require('dotenv').config({path: 'variables.env'});

export function createToken(user){
    let {id, role} = user
    return jsonWebToken.sign({id, role}, process.env.SECRET)
}

export async function userFromToken(token){
    try{
        let user = jsonWebToken.verify(token, process.env.SECRET)
        return await User.findOne({id: user.id}).exec()
    }catch(e){
        return null
    }
}

export function authenticated(nextResolver){
    return function inner(root, args, context, info){
        if (!context.user){
            throw new AuthenticationError('Not authorized')
        }
        return nextResolver(root, args, context, info)
    }
}

export function authorized(role, nextResolver){
    return function inner(root, args, context, info){
        if (context.user.role !== role){
            throw new AuthenticationError('Must be a ${role}')
        }
        return nextResolver(root, args, context, info)
    }
}
