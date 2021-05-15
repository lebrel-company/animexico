'use strict';
// libraries:
import axios from 'axios'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {axiosConfig, hostname} from './constants';
import {
    strAdminSignupMutation,
    strUserSignupMutation
} from './signup/signup_gql';
import {mapUserRegister, mapAdminRegister} from './user_data';

//==============================================================================

async function authenticateAsUser() {
    let result = await axios.post(
        hostname,
        {
            query: strUserSignupMutation,
            variables: {input: mapUserRegister}
        },
        axiosConfig
    )
    return result.data.data.signup
}


async function authenticateAsAdmin() {
    let result = await axios.post(
        hostname,
        {
            query: strAdminSignupMutation,
            variables: {input: mapAdminRegister}
        },
        axiosConfig
    )
    return result.data.data.adminSignup
}


export async function authData(role = '') {
    let _auth = role === 'admin' ? authenticateAsAdmin : authenticateAsUser
    let authData = await _auth()
    return authData
}