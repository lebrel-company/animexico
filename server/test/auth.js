'use strict';
// libraries:
import axios from 'axios'
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {axiosConfig, hostname} from './constants';
import {SIGNUP} from './signup/signup_int_test';
import {mapUserRegister, mapAdminRegister} from '../seed/user_data';
var pp = (el) => console.log(util.inspect(el, false, 5, true))

//==============================================================================


async function authenticateAsUser() {
    var result
    try {
        result = await axios.post(
            hostname,
            {
                query: SIGNUP.mutations.signup,
                variables: {input: mapUserRegister}
            },
            axiosConfig
        )
    } catch (_e) {
        pp(_e.message)
    }
    return result.data.data.signup
}


async function authenticateAsAdmin() {
    delete mapAdminRegister.role
    let result = await axios.post(
        hostname,
        {
            query: SIGNUP.mutations.adminSignup,
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