'use strict';
// libraries:
import bcrypt from 'bcryptjs';
import jwtDecode from 'jwt-decode';
import util from 'util'
import produce from 'immer'

const jsonWebToken = require('jsonwebtoken');
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from './user.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import messages from './user.messages';
import {
    addUserWithRole,
    verifyPassword,
    createToken, authenticated
} from '../../utils/auth';
import status from '../../utils/status'

var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}
//==============================================================================


require('dotenv').config({path: 'variables.env'});


function mapOfAddresses(parent, args, context, info) {
    return {
        primary: parent.mapOfAddresses.get('primary'),
        secondary: parent.mapOfAddresses.get('secondary')
    };
}


function signup(parent, args, context, info) {
    return addUserWithRole('CLIENT')(parent, args, context, info);
}


function adminSignup(parent, args, context, info) {
    return addUserWithRole('ADMIN')(parent, args, context, info);
}


async function login(parent, args, context, info) {
    try {
        const user = await UserModel.findOne({email: args.input.email}).lean();
        if (!user) {
            throw Error(messages.signin.errors.noRegisteredEmail);
        }


        const passwordValid = (
            await verifyPassword(args.input.password, user.password)
        );

        if (passwordValid) {
            const {
                _id,
                firstName,
                middleName,
                lastName,
                secondLastName,
                email,
                role
            } = user;

            const userInfo = Object.assign(
                {}, {
                    id: _id,
                    firstName,
                    middleName,
                    lastName,
                    secondLastName,
                    email,
                    role
                }
            );

            const token = createToken(userInfo);
            const decodedToken = jwtDecode(token);
            const expiresIn = decodedToken.exp;

            return {
                status: status.success,
                message: status.messages.auth.login.success,
                authInfo: {
                    token: token,
                    userInfo: userInfo,
                    expiresIn: expiresIn
                }
            }
        } else {
            return {
                status: status.invalid,
                message: status.messages.auth.login.invalid,
                listOfErrors: []
            }
        }
    } catch (err) {
        throw Error(err);
    }
}


async function me(parent, args, context, info) {
    let {id} = context.userInfo

    let me = await UserModel.findById(id, [
            'id', 'firstName', 'middleName', 'lastName', 'secondLastName',
            'mapOfAddresses', 'email', 'birthday', 'role', 'cellphone'
        ]
    ).lean()


    if (!me) {
        return {
            status: status.invalid,
            message: status.messages.user.query.invalid,
            listOfErrors: ['Something went wrong when trying to find user.']
        }
    }

    return {
        status: status.success,
        message: status.messages.user.query.success,
        me: me
    }

}


//==============================================================================

export default {
    Query: {
        me: authenticated(me),
        login: login
    },
    User: {
        mapOfAddresses: mapOfAddresses
    },
    Mutation: {
        adminSignup,
        signup
    },
    UserAuthResult: {
        __resolveType(obj, context, info) {
            if (obj.status === status.success) {
                return 'SuccessfulUserAuth'
            }
            if (obj.status === status.invalid) {
                return 'InvalidUserAuth'
            }
        }
    },
    UserResult: {
        __resolveType: function resolveType(obj, context, info) {
            switch (obj.status) {
                case status.success:
                    return 'Me'
                case status.invalid:
                    return 'InvalidUser'
                default:
                    return null

            }
        }
    }

};
