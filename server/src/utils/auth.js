'use strict';
// libraries:
import bcrypt from 'bcryptjs'
import jsonWebToken from 'jsonwebtoken'
import {AuthenticationError} from 'apollo-server'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import User from '../types/user/user.model'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
require('dotenv').config({path: 'variables.env'});
const __JWT_SECRET = process.env.JWT_SECRET
//==============================================================================

export function createToken(user) {
    // Sign the JWT
    if (!user.role) {
        throw new Error('No user role specified');
    }
    return jsonWebToken.sign(
        {
            sub: user._id,
            email: user.email,
            role: user.role,
            iss: 'api.tamashii',
            aud: 'api.tamashii'
        },
        __JWT_SECRET,
        {algorithm: 'HS256', expiresIn: '72h'}
    );
}

//==============================================================================

export function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//==============================================================================

export function hashPassword(password) {
    return new Promise((resolve, reject) => {
        // Generate a salt at level 12 strength
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
}

//==============================================================================


export function verifyPassword(passwordAttempt, hashedPassword) {
    return bcrypt.compare(passwordAttempt, hashedPassword);
}


//==============================================================================

export function requireAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            message: 'There was a problem authorizing the request'
        });
    }
    if (req.user.role !== 'admin') {
        return res
            .status(401)
            .json({message: 'Insufficient role'});
    }
    next();
}

//==============================================================================

export async function userFromToken(token) {
    try {
        let user = jsonWebToken.verify(token, __JWT_SECRET)
        return await User.findOne({id: user.id}).exec()
    } catch (e) {
        return null
    }
}

//==============================================================================

export function authenticated(nextResolver) {
    return function inner(root, args, context, info) {
        if (!context.user) {
            throw new AuthenticationError('Not authorized')
        }
        return nextResolver(root, args, context, info)
    }
}

//==============================================================================
export function authorized(role, nextResolver) {
    return function inner(root, args, context, info) {
        if (context.user.role !== role) {
            throw new AuthenticationError('Must be a ${role}')
        }
        return nextResolver(root, args, context, info)
    }
}
