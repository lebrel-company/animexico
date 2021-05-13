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
import {values} from '../user_data'
import {signupMutationString} from '../signup.mutation';
import {axiosConfig, hostname} from '../constants';
//==============================================================================

describe('User signup', () => {

    beforeEach(async function () {
        await UserModel.deleteOne({email: 'jairanpo@gmail.com'})
    })

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    it('Register a user', async () => {
        var response;
        var user = values
        try {
            response = await axios.post(
                hostname,
                {query: signupMutationString, variables: {input: user}},
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
        let user = _.cloneDeep(values)
        user.birthday = '2019-10-24'
        var _r = await axios.post(
            hostname,
            {query: signupMutationString, variables: {input: user}}, axiosConfig
        )
        assert.match(_r.data.errors[0].message, /UserInputError/)
    })
})

async function missingRequiredFields(field) {
    let user = _.cloneDeep(values)
    delete user[field]
    await assert.rejects(async () => {
            await axios.post(
                hostname,
                {
                    query: signupMutationString,
                    variables: {input: user}
                },
                axiosConfig
            )
        }
    )
}
