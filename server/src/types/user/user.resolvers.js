'use strict';
// libraries:
import bcrypt from 'bcryptjs';
import jwtDecode from 'jwt-decode';

const jsonWebToken = require('jsonwebtoken');
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import User from './user.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {
    authenticated,
    authorized,
    getAge,
    verifyPassword,
    createToken,
    hashPassword
} from "../../utils/auth";
import messages from './user.messages'

require('dotenv').config({path: 'variables.env'});

//=============================   QUERIES   ====================================

async function queryUserByToken(_, {token}) {
    return await jsonWebToken.verify(token, process.env.SECRET)
    gnin
}

async function queryUserInfo(parent, {}, context, info) {
    return await User.findById(context.user.id).exec();
}

function me(parent, args, context, info) {
    return context.user
}

//==============================   TYPES   =====================================
function mapOfAddresses(parent, args, context, info) {
    return {
        primary: parent.mapOfAddresses.get('primary'),
        secondary: parent.mapOfAddresses.get('secondary')
    }
}

//============================   MUTATIONS   ===================================
async function signup(parent, {input}, context, info) {
    try {

        let age = getAge(input.birthday)
        if (age < 18) {
            throw new Error(message.signup.errors.age)
        }

        const hashedPassword = await hashPassword(input.password)

        const userData = {
            email: input.email,
            firstName: input.firstName,
            middleName: input.middleName,
            lastName: input.lastName,
            secondLastName: input.secondLastName,
            birthday: input.birthday,
            cellphone: input.cellphone,
            password: hashedPassword,
            role: 'MEMBER',
            mapOfAddresses: {
                primary: {
                    country: input.mapOfAddresses.primary.country,
                    city: input.mapOfAddresses.primary.city,
                    state: input.mapOfAddresses.primary.state,
                    zipcode: input.mapOfAddresses.primary.zipcode,
                    neighbourhood: input.mapOfAddresses.primary.neighbourhood,
                    street: input.mapOfAddresses.primary.street,
                    buildingNumber: input.mapOfAddresses.primary.buildingNumber,
                    apartmentNumber: input.mapOfAddresses.primary.apartmentNumber,
                }
            }
        };

        const existingEmail = await User.findOne({
            email: userData.email
        }).lean();

        if (existingEmail) {
            throw new Error(messages.signup.errors.duplicatedEmail)
        }

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        if (savedUser) {
            const token = createToken(savedUser);
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            const {
                firstName,
                lastName,
                email,
                role
            } = savedUser;

            const userInfo = {
                firstName,
                lastName,
                email,
                role
            };

            return {
                token: token,
                user: userInfo,
                expiresAt: expiresAt
            }
        } else {
            throw new Error(messages.signup.errors.process)
        }
    } catch (err) {
        throw new Error(err)
    }
}


//==============================================================================

async function signin(parent, {input}, context, info) {
    try {
        const user = await User.findOne({email: input.email}).lean()
        if (!user) {
            throw Error(messages.signin.errors.noRegisteredEmail)
        }


        const passwordValid =
            await verifyPassword(
                input.password,
                user.password
            );


        if (passwordValid) {
            const {password, bio, ...rest} = user;
            const {
                id,
                firstName,
                middleName,
                lastName,
                secondLastName,
                email,
                mapOfAddresses,
                role,
            } = user

            const userInfo = Object.assign(
                {}, {
                    id,
                    firstName,
                    middleName,
                    lastName,
                    secondLastName,
                    email,
                    mapOfAddresses,
                    role
                }
            );

            const token = createToken(userInfo);
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            return {token, user, expiresAt}
        } else {
            throw Error(messages.signin.errors.credentials)
        }
    } catch (err) {
        throw Error(err)
    }
}

//==============================================================================

export default {
    Query: {
        queryUserInfo: authenticated(queryUserInfo),
        queryUserByToken: authenticated(queryUserByToken),
        me: authenticated(me)
    },
    User: {
        mapOfAddresses: mapOfAddresses
    },
    Mutation: {
        signup,
        signin
    }
}
