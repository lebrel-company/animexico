'use strict';
// libraries:
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'

const mongoose = require('mongoose')
const axios = require('axios')
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../../src/types/user/user.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {hostname, axiosConfig} from '../constants';
import {authData} from '../auth';
import {
    strSingleUrlMutationString, listOfSignedUrlMutation
} from './signed_urls_gql';
import {dropAll} from '../cleanup';

var cl = console.log
chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
//==============================================================================

describe('FILE.AWS_S3_SIGNED_URL', () => {
    beforeEach(async () => {
        await dropAll()
    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('AD-AUTH: Reach for single signed URL', async () => {
        let _userData = await authData('admin')
        let _config = _.cloneDeep(axiosConfig)
        _config.headers.authorization = `Bearer ${_userData.token}`
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

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('NO_AUTH: Reject for single signed URL not authenticated', async () => {
        try {
            await axios.post(
                hostname,
                {
                    query: strSingleUrlMutationString
                },
                axiosConfig
            )
        } catch (_e) {
            assert.graphQLError(_e.response, 'Not authorized')
        }

    })


    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('AD_AUTH: Reach for multiple signed URL', async () => {
        let _userData = await authData('admin')
        let _config = _.cloneDeep(axiosConfig)
        _config.headers.authorization = `Bearer ${_userData.token}`

        let res = await axios.post(
            hostname,
            {
                query: listOfSignedUrlMutation,
                variables: {input: 20}
            },
            _config
        )

        let listOfUrls = res.data.data.listOfSignedAwsUrls

        listOfUrls.forEach((element) => {
            assert.match(element.url, /https:\/\/s3.amazonaws.com/)
        })
    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

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
})





