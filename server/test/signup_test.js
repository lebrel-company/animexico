'use strict';
// libraries:
const axios = require('axios')
const assert = require('assert')
const mongoose = require('mongoose')
import {gql} from 'apollo-server'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../src/types/user/user.model'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {values} from './user_data'
import messages from '../src/types/user/user.messages';
//==============================================================================

var _ax = {
    headers: {
        'Content-Type': 'application/json'
    }
}

var HOST = 'http://localhost:5000/api'

describe('User signup', () => {
    var signupMutationGql = gql`
        mutation signup($input: SignupInput!){
            signup(input: $input){
                token
                userInfo{
                    firstName
                    middleName
                    lastName
                    secondLastName
                }
            }
        }
    `
    var signupMutation = signupMutationGql.loc.source.body
    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
    beforeEach(async function () {
        await UserModel.deleteOne({email: 'jairanpo@gmail.com'})
    })
    after(async function () {
        await mongoose.connection.close()
    })
    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
    it('Register a user', async () => {
        var response;
        var user = values
        try {
            response = await axios.post(
                HOST,
                {query: signupMutation, variables: {input: user}}, _ax
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
            await missingRequiredFields(signupMutation, element);
        })
    })

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
    it('Register not allow for users under 18', async () => {
        let user = _.cloneDeep(values)
        user.birthday = '2019-10-24'
        var _r = await axios.post(
            HOST,
            {query: signupMutation, variables: {input: user}}, _ax
        )
        assert.match(_r.data.errors[0].message, /UserInputError/)
    })
})

async function missingRequiredFields(signupMutation, field) {
    let user = _.cloneDeep(values)
    delete user[field]
    await assert.rejects(async () => {
            await axios.post(
                HOST,
                {query: signupMutation, variables: {input: user}}, _ax
            )
        }
    )
}
