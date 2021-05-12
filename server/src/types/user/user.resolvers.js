'use strict';
// libraries:
import bcrypt from 'bcryptjs';
import jwtDecode from 'jwt-decode';

const jsonWebToken = require('jsonwebtoken');
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from './user.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {
    authenticated,
    addUserWithRole,
    authorized,
    getAge,
    verifyPassword,
    createToken,
    hashPassword,
} from '../../utils/auth';
import messages from './user.messages';

require('dotenv').config({path: 'variables.env'});

//=============================   QUERIES   ====================================

async function queryUserByToken(_, {token}) {
    return await jsonWebToken.verify(token, process.env.SECRET);
}

async function queryUserInfo(parent, {}, context, info) {
    return await UserModel.findById(context.user.id).exec();
}

function me(parent, args, context, info) {
    return context.user;
}

//==============================   TYPES   =====================================
function mapOfAddresses(parent, args, context, info) {
    return {
        primary: parent.mapOfAddresses.get('primary'),
        secondary: parent.mapOfAddresses.get('secondary'),
    };
}

//============================   MUTATIONS   ===================================

function signup(parent, {input}, context, info) {
    return addUserWithRole('MEMBER')(parent, {input}, context, info);
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --


function adminSignup(parent, {input}, context, info) {
    return addUserWithRole('ADMIN')(parent, {input}, context, info);
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --

async function signin(parent, {input}, context, info) {
    try {
        const user = await UserModel.findOne({email: input.email}).lean();
        if (!user) {
            throw Error(messages.signin.errors.noRegisteredEmail);
        }

        const passwordValid = (
            await verifyPassword(input.password, user.password)
        );

        if (passwordValid) {
            const {
                _id,
                firstName,
                middleName,
                lastName,
                secondLastName,
                email,
                mapOfAddresses,
                role,
            } = user;

            const userInfo = Object.assign(
                {}, {
                    id: _id,
                    firstName,
                    middleName,
                    lastName,
                    secondLastName,
                    email,
                    role,
                },
            );

            const token = createToken(userInfo);
            const decodedToken = jwtDecode(token);
            const expiresIn = decodedToken.exp;

            return {token, userInfo, expiresIn};
        } else {
            throw Error(messages.signin.errors.credentials);
        }
    } catch (err) {
        throw Error(err);
    }
}

//==============================================================================

export default {
    Query: {
        queryUserInfo: authenticated(queryUserInfo),
        queryUserByToken: authenticated(queryUserByToken),
        me: authenticated(me),
    },
    User: {
        mapOfAddresses: mapOfAddresses,
    },
    Mutation: {
        adminSignup,
        signup,
        signin,
    },
};
