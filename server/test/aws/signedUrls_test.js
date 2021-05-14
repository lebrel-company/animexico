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
import {authData} from '../auth';
//==============================================================================

var getSingleUrlGql = gql`
    query signedAwsUrl{
        signedAwsUrl{
            key
            url
        }
    }
`
var getListOfSignedUrlsGql = gql`
    query listOfSignedAwsUrls($input: Int!){
        listOfSignedAwsUrls(input: $input){
            key
            url
        }
    }
`

var getSingleUrlMutationString = getSingleUrlGql.loc.source.body
var getListOfSignedUrlsMutationString = getListOfSignedUrlsGql.loc.source.body

describe('AWS S3 single signed URLs', () => {
        beforeEach(async () => {
            await UserModel.deleteOne({email: 'jairanpo@gmail.com'})
            await UserModel.deleteOne({email: 'sofia@gmail.com'})
        })
        //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

        it('Reach for single signed URL authenticated', async () => {
            let _userData = await authData('admin')
            let _config = _.cloneDeep(axiosConfig)
            _config.headers.authorization = _userData.token
            let res = await axios.post(
                hostname,
                {
                    query: getSingleUrlMutationString
                },
                _config
            )
            let _url = res.data.data.signedAwsUrl.url
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

        //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

        it('Reach for multiple signed URL authenticated', async () => {
            let _userData = await authData('admin')
            let _config = _.cloneDeep(axiosConfig)
            _config.headers.authorization = _userData.token

            let res = axios.post(
                hostname,
                {
                    query: getListOfSignedUrlsMutationString
                },
                axiosConfig
            )

        })

        it('Reject for multiple signed URL not authenticated', async () => {
            let res = await axios.post(
                hostname,
                {
                    query: getListOfSignedUrlsMutationString,
                    variables: {input: 20}
                },
                axiosConfig
            )
            assert.strictEqual(res.data.errors[0].message, 'Not authorized')
        })
    }
)





