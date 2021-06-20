'use strict';
// libraries:
import util from 'util'
import bcrypt from 'bcryptjs'
import jsonWebToken from 'jsonwebtoken'
import jwtDecode from 'jwt-decode';
import {AuthenticationError, UserInputError} from 'apollo-server'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../types/user/user.model'
import messages from '../types/user/user.messages';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
require('dotenv').config({path: 'variables.env'});
const __JWT_SECRET = process.env.JWT_SECRET
var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}

//==============================================================================


export function createToken(user) {
    // Sign the JWT
    if (!user.role) {
        throw new Error('No user role specified');
    }
    return jsonWebToken.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            iss: 'api.tamashii',
            aud: 'api.tamashii'
        },
        __JWT_SECRET,
        {algorithm: 'HS256', expiresIn: '72h'}
    );
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --

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


export function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
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

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --

export function verifyPassword(passwordAttempt, hashedPassword) {
    return bcrypt.compare(passwordAttempt, hashedPassword);
}


export function requireAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            message: 'There was a problem authorizing the request'
        });
    }
    if (req.user.role !== 'ADMIN') {
        return res
            .status(401)
            .json({message: 'Insufficient role'});
    }
    next();
}

//==============================================================================

export function userFromToken(token) {
    try {
        let userInfo = jsonWebToken.verify(token, __JWT_SECRET)
        return userInfo
    } catch (e) {
        return null
    }
}

//==============================================================================

export function authenticated(nextResolver) {
    return function inner(root, args, context, info) {
        if (!context.userInfo) {
            throw new AuthenticationError('Not authorized')
        }
        return nextResolver(root, args, context, info)
    }
}

//==============================================================================
export function authorized(role, nextResolver) {

    return async function inner(root, args, context, info) {
        const _user = await UserModel.findById(context.userInfo.id)
        if (_user.role !== role) {
            throw new AuthenticationError('Must be a ${role}')
        }
        return nextResolver(root, args, context, info)
    }
}

//==============================================================================

export function addUserWithRole(role) {
    return async function _resolver(parent, {input}, context, info) {

        if (!input.lastName) {
            throw new UserInputError('Missing lastName field');
        }

        try {
            let age = getAge(input.birthday)
            if (age < 18) {
                throw new UserInputError(messages.signup.errors.age)
            }
            const hashedPassword = await hashPassword(input.password)
            const userData = mapOfValues(input, hashedPassword, role);

            const existingEmail = await UserModel.findOne({
                email: userData.email
            }).lean();

            if (existingEmail) {
                throw new Error(messages.signup.errors.duplicatedEmail)
            }

            const newUser = new UserModel(userData);
            const savedUser = await newUser.save();

            if (savedUser) {
                const token = createToken(savedUser);
                const decodedToken = jwtDecode(token);
                const expiresIn = decodedToken.exp;

                const {
                    id, firstName, middleName, lastName,
                    secondLastName, email, role
                } = savedUser;

                const userInfo = {
                    id, firstName, middleName, secondLastName,
                    lastName, email, role
                };

                return {
                    token: token,
                    userInfo: userInfo,
                    expiresIn: expiresIn
                }
            } else {
                throw new Error(messages.signup.errors.process)
            }
        } catch (err) {
            throw new Error(err)
        }
    }
}

function mapOfValues(input, hashedPassword, role) {
    var userData;
    if (role === 'CLIENT') {
        userData = {
            email: input.email,
            firstName: input.firstName,
            middleName: input.middleName,
            lastName: input.lastName,
            secondLastName: input.secondLastName,
            birthday: input.birthday,
            cellphone: input.cellphone,
            password: hashedPassword,
            role: role,
            mapOfAddresses: {
                primary: {
                    country: input.mapOfAddresses.primary.country,
                    city: input.mapOfAddresses.primary.city,
                    state: input.mapOfAddresses.primary.state,
                    zipcode: input.mapOfAddresses.primary.zipcode,
                    neighbourhood: input.mapOfAddresses.primary.neighbourhood,
                    street: input.mapOfAddresses.primary.street,
                    buildingNumber: input.mapOfAddresses.primary.buildingNumber,
                    apartmentNumber: input.mapOfAddresses.primary.apartmentNumber
                }
            }
        };
    }

    if (role === 'ADMIN') {
        userData = {
            email: input.email,
            firstName: input.firstName,
            middleName: input.middleName,
            lastName: input.lastName,
            secondLastName: input.secondLastName,
            cellphone: input.cellphone,
            password: hashedPassword,
            role: role
        };
    }

    return userData;
}
