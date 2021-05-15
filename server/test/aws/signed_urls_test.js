'use strict';
// libraries:
const axios = require('axios')
const assert = require('assert')
const mongoose = require('mongoose')
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../../src/types/user/user.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {hostname, axiosConfig} from '../constants';
import {authData} from '../auth';
import {
    strSingleUrlMutationString,
    listOfSignedUrlMutation
} from './signed_urls_gql';
//==============================================================================


describe('AWS S3 single signed URLs', () => {
        beforeEach(async () => {
            await UserModel.deleteOne({email: 'jairanpo@gmail.com'})
            await UserModel.deleteOne({email: 'sofia@gmail.com'})
        })
        //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

        it('AD-AUTH: Reach for single signed URL', async () => {
            let _userData = await authData('admin')
            let _config = _.cloneDeep(axiosConfig)
            _config.headers.authorization = _userData.token
            let res = await axios.post(
                hostname,
                {
                    query: strSingleUrlMutationString
                },
                _config
            )
            let _url = res.data.data.signedAwsUrl.url
            assert.match(_url, /https:\/\/s3.amazonaws.com/)
        })

        it('NO_AUTH: Reject for single signed URL not authenticated', async () => {
            let res = await axios.post(
                hostname,
                {
                    query: strSingleUrlMutationString
                },
                axiosConfig
            )
            assert.strictEqual(res.data.errors[0].message, 'Not authorized')
        })

        //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

        it('AD_AUTH: Reach for multiple signed URL', async () => {
            let _userData = await authData('admin')
            let _config = _.cloneDeep(axiosConfig)
            _config.headers.authorization = _userData.token

            let res = await axios.post(
                hostname,
                {
                    query: listOfSignedUrlMutation,
                    variables: {input: 20}
                },
                _config
            )

            let listOfUrls = res.data.data.listOfSignedAwsUrls

            listOfUrls.forEach((element)=>{
                assert.match(element.url, /https:\/\/s3.amazonaws.com/)
            })
        })

        it('NO-AUTH: Reject for multiple signed URL', async () => {
            let res = await axios.post(
                hostname,
                {
                    query: listOfSignedUrlMutation,
                    variables: {input: 20}
                },
                axiosConfig
            )
            assert.strictEqual(res.data.errors[0].message, 'Not authorized')
        })
    }
)





