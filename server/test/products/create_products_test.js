'use strict';
// libraries:
const axios = require('axios')
const assert = require('assert')
const mongoose = require('mongoose')
import {gql} from 'apollo-server'
import _ from 'lodash'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../../src/types/user/user.model';
import {ProductModel} from '../../src/types/product/product.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {axiosConfig, hostname} from '../constants';
import {strCreateProductMutation} from './create_products_gql';
import {listOfProducts} from '../product_data';
import {authData} from '../auth';

var cl = console.log
chai.use(chaiGraphQL)
//==============================================================================


describe('PRODUCT CREATION', () => {
    before(async () => {
        try {
            await UserModel.collection.drop()
        } catch (_e) {
            // Handle error here
        }
        try {
            await ProductModel.collection.drop()
        } catch (_e) {
            // Handle error here
        }
        listOfProducts.forEach((e) => {
            delete e._id
        })
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
                    variables: {input: listOfProducts[0]}
                },
                config
            )
        } catch (_e) {
            console.error('WARNING:', _e.response.data.errors)
        }

        let _product_source = _.cloneDeep(listOfProducts[0])
        _product_source.publishDate = (
            (new Date('2021-04-13').getTime()).toString()
        )
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

    it('CL-AUTH: Reject create one product', async () => {
        let userData = await authData()
        let config = _.cloneDeep(axiosConfig)
        config.headers.authorization = userData.token

        assert.rejects(async () => {
            await axios.post(
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



