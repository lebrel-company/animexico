'use strict';
// libraries:
const axios = require('axios')
const assert = require('assert')
const mongoose = require('mongoose')
import {gql} from 'apollo-server'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../../src/types/user/user.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {hostname, axiosConfig} from '../constants';
import {authenticateAsUser} from '../auth';
//==============================================================================

var getSingleUrlGql = gql`
    query awsSignedUrl{
        awsSignedUrl{
            key
            url
        }
    }
`
var getListOfSignedUrlsGql = gql`
    query listOfSignedUrls($input: Int!){
        listOfSignedUrls(input: $input){
            url
            key
        }
    }
`

var getSingleUrlMutationString = getSingleUrlGql.loc.source.body
var getListOfSignedUrlsMutationString = getListOfSignedUrlsGql.loc.source.body

describe('AWS S3 single signed URLs', () => {
        beforeEach(async () => {
            await UserModel.deleteOne({email: 'jairanpo@gmail.com'})
        })
        //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

        it('Reach for single signed URL authenticated', async () => {
            let authData = await authenticateAsUser()
            let newAxiosConfig = _.cloneDeep(axiosConfig)
            newAxiosConfig.headers.authorization = authData.token
            let urlRes = await axios.post(
                hostname,
                {
                    query: getSingleUrlMutationString
                },
                newAxiosConfig
            )
            let _url = urlRes.data.data.awsSignedUrl.url
            assert.match(_url, /https:\/\/s3.amazonaws.com/)
        })

        it('Reject for single signed URL not authenticated', async () => {
            let res = await axios.post(
                hostname,
                {
                    query: getSingleUrlMutationString
                },
                axiosConfig
            )
            assert.strictEqual(res.data.errors[0].message, 'Not authorized')
        })
    }
)

describe('AWS S3 multiple signed URLs', () => {
    it('Reach for multiple signed URL authenticated', () => {
        assert.strictEqual(1, 3)
    })

    it('Reject for multiple signed URL not authenticated', () => {
        assert.strictEqual(1, 3)
    })
})





