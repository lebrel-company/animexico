'use strict';
// libraries:
const axios = require('axios')
const assert = require('assert')
const mongoose = require('mongoose')
import {gql} from 'apollo-server'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../../src/types/user/user.model'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {mapUserRegister, mapAdminRegister} from '../user_data'
import {
    strAdminSignupMutation,
    strUserSignupMutation
} from './signup_gql';
import {axiosConfig, hostname} from '../constants';
//==============================================================================

describe('User signup', () => {
    before(async () => {
        await UserModel.collection.drop()
    })

    beforeEach(async function () {
        await UserModel.deleteOne({email: 'jairanpo@gmail.com'})
    })

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    it('Register a user', async () => {
        var response;
        var user = mapUserRegister
        try {
            response = await axios.post(
                hostname,
                {query: strUserSignupMutation, variables: {input: user}},
                axiosConfig
            )
        } catch (_e) {
            console.log(_e)
        }
        let _d = response.data.data
        assert.strictEqual(_d.signup.userInfo.firstName, 'Jesus')
        assert.strictEqual(_d.signup.userInfo.middleName, 'Jair')
        assert.strictEqual(_d.signup.userInfo.lastName, 'Anguiano')
        assert.strictEqual(_d.signup.userInfo.secondLastName, 'Porras')
    })

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    var _rej = 'Reject a user without'
    var listOfRequiredFields = [
        'firstName', 'lastName', 'cellphone', 'birthday', 'password', 'birthday'
    ]
    listOfRequiredFields.forEach(function (element) {
        it(`${_rej} ${element}`, async () => {
            await missingRequiredFields(element);
        })
    })

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
    it('Register not allow for users under 18', async () => {
        let user = _.cloneDeep(mapUserRegister)
        user.birthday = '2019-10-24'
        var _r = await axios.post(
            hostname,
            {
                query: strUserSignupMutation,
                variables: {input: user}
            }, axiosConfig
        )
        assert.match(_r.data.errors[0].message, /UserInputError/)
    })

    describe('Create user as admin', async () => {
        let res = await axios.post(
            hostname,
            {
                query: strAdminSignupMutation,
                variables: mapAdminRegister
            },
            axiosConfig
        )

        assert.strictEqual(1, 1)
    })
})


async function missingRequiredFields(field) {
    let user = _.cloneDeep(mapUserRegister)
    delete user[field]
    await assert.rejects(async () => {
            await axios.post(
                hostname,
                {
                    query: strUserSignupMutation,
                    variables: {input: user}
                },
                axiosConfig
            )
        }
    )
}


