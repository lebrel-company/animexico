'use strict';
// libraries:
import {authData} from '../auth';

const axios = require('axios')
const assert = require('assert')
const mongoose = require('mongoose')
import {gql} from 'apollo-server'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../../src/types/product/product.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {axiosConfig, hostname} from '../constants';
import {strCreateProductMutation} from './create_products_gql';
import {listOfProducts} from './create_products_data';
import {UserModel} from '../../src/types/user/user.model';
//==============================================================================

describe('Create product', () => {

    before(async () => {
        await UserModel.collection.drop()
    })

    it('AD-AUTH: Create one product', async () => {
        let userData = await authData('admin')
        let config = _.cloneDeep(axiosConfig)
        config.headers.authorization = userData.token
        var res;
        try {
            res = await axios.post(
                hostname,
                {
                    query: strCreateProductMutation,
                    variables: {
                        input: listOfProducts[0]

                    }
                },
                config
            )
        } catch (_e) {
            console.warn(_e)
        }

        let _product_source = _.cloneDeep(listOfProducts[0])
        _product_source.publishDate = (
            new Date('2021-04-13').getTime()
        ).toString()
        assert.deepStrictEqual(_product_source, res.data.data.createProduct)
    })

    it('NO-AUTH: Reject create one product', async () => {
        assert.rejects(async () => {
            let res = await axios.post(
                hostname,
                {
                    query: strCreateProductMutation,
                    variables: {
                        input: listOfProducts[0]

                    }
                },
                axiosConfig
            )
        })
    })

    it('ME-AUTH: Reject create one product', async () => {
        let userData = await authData()
        let config = _.cloneDeep(axiosConfig)
        config.headers.authorization = userData.token

        assert.rejects(async () => {
            let res = await axios.post(
                hostname,
                {
                    query: strCreateProductMutation,
                    variables: {
                        input: listOfProducts[0]

                    }
                },
                config
            )
        })
    })
})



