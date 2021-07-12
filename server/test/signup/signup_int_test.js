'use strict';
// libraries:
import {authData} from '../auth';

const axios = require('axios')
const assert = require('assert')
const mongoose = require('mongoose')
import {gql} from 'apollo-server'
import _ from 'lodash'
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../../src/types/user/user.model'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {mapUserRegister, mapAdminRegister} from '../../seed/user_data';
import {axiosConfig, hostname} from '../constants';
import {dropAll} from '../cleanup';

var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}
//==============================================================================

export var SIGNUP = {
    mutations: {
        signup: gql`
            mutation signup($input: SignupInput!){
                signup(input: $input){
                    token
                    userInfo{
                        firstName
                        middleName
                        lastName
                        secondLastName
                        role
                    }
                }
            }`.loc.source.body,
        adminSignup: gql`
            mutation signup($input: AdminSignupInput!){
                adminSignup(input: $input){
                    token
                    userInfo{
                        firstName
                        middleName
                        lastName
                        secondLastName
                        role
                    }
                }
            }`.loc.source.body
    }
}


// Remove IDs for this test suite, since IDs should be created at the backend
delete mapUserRegister._id
delete mapAdminRegister._id

describe('SIGNUP', () => {

    beforeEach(async function () {
        await dropAll()
    })

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    it('NO-AUTH.Signup: Register a user', async () => {
        var user = mapUserRegister
        var response;
        try {
            response = await axios.post(
                hostname,
                {
                    query: SIGNUP.mutations.signup,
                    variables: {input: user}
                },
                axiosConfig
            )
        } catch (_e) {
            console.log(_e.message)
        }

        let _d = response.data.data

        assert.strictEqual(_d.signup.userInfo.firstName, 'Jesus')
        assert.strictEqual(_d.signup.userInfo.middleName, 'Jair')
        assert.strictEqual(_d.signup.userInfo.lastName, 'Anguiano')
        assert.strictEqual(_d.signup.userInfo.secondLastName, 'Porras')
    })

    var _rej = 'Reject a user without'
    var listOfRequiredFields = [
        'firstName', 'lastName', 'cellphone', 'birthday', 'password', 'birthday'
    ]
    listOfRequiredFields.forEach(function (element) {
        it(`NO-AUTH.Signup: ${_rej} ${element}`, async () => {
            await missingRequiredFields(element);
        })
    })

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
    it('NO-AUTH.Signup: Register not allow for users under 18', async () => {
        let user = _.cloneDeep(mapUserRegister)
        user.birthday = '2019-10-24'

        var _r = await axios.post(
            hostname,
            {
                query: SIGNUP.mutations.signup,
                variables: {input: user}
            }, axiosConfig
        )

        assert.match(_r.data.errors[0].message, /UserInputError/)
    })

    // it('AD-AUTH.Signup: Create user as admin', async () => {
    //     let ADMIN_AUTH_CONFIG = _.cloneDeep(axiosConfig)
    //     ADMIN_AUTH_CONFIG.headers.authorization = (await authData('ADMIN')).token
    //     var res;
    //     try {
    //         res = await axios.post(
    //             hostname,
    //             {
    //                 query: SIGNUP.mutations.adminSignup,
    //                 variables: {input: mapAdminRegister}
    //             },
    //             ADMIN_AUTH_CONFIG
    //         )
    //     } catch (_e) {
    //         pp(_e.message)
    //     }
    //
    //     assert.strictEqual(1, 2)
    // })
})


async function missingRequiredFields(field) {
    let user = _.cloneDeep(mapUserRegister)
    delete user[field]
    await assert.rejects(async () => {
            await axios.post(
                hostname,
                {
                    query: SIGNUP.mutations.signup,
                    variables: {input: user}
                },
                axiosConfig
            )
        }
    )
}


