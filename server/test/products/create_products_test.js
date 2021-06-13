'use strict';
// libraries:
import lodash from 'lodash';

const axios = require('axios')
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
import {strCreateProductMutation} from './products_gql';
import {listOfProducts} from '../../seed/product_data';
import {authData} from '../auth';

var cl = console.log
chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
//==============================================================================


describe('PRODUCT.CREATION', () => {
    var _listOfProducts = lodash.cloneDeep(listOfProducts)
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
        _listOfProducts.forEach((e) => {
            delete e._id
        })
    })

    it('AD-AUTH: Create one product',
        async function createOneProductAsAdmin() {
            let userData = await authData('admin')
            let config = _.cloneDeep(axiosConfig)
            config.headers.authorization = userData.token
            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: strCreateProductMutation,
                        variables: {input: _listOfProducts[0]}
                    },
                    config
                )
            } catch (_e) {
                console.error('WARNING:', _e)
            }

            let sourceProduct = _.cloneDeep(_listOfProducts[0])
            sourceProduct.publish.date = (
                (new Date(sourceProduct.publish.date).getTime()).toString()
            )

            sourceProduct.publish.month = 'APRIL'
            assert.graphQL(
                {
                    data: res.data.data.createProduct
                }
                ,
                sourceProduct
            )
        })

    it('NO-AUTH: Reject create one product', async () => {
        try {
            await axios.post(
                hostname,
                {
                    query: strCreateProductMutation,
                    variables: {
                        input: _listOfProducts[0]

                    }
                },
                axiosConfig
            )
        } catch (_e) {
            // Handle error here
            assert.graphQLError(_e.response.data)
        }
    })

    it('CL-AUTH: Reject create one product', async () => {
        let userData = await authData()
        let config = _.cloneDeep(axiosConfig)
        config.headers.authorization = userData.token

        try {
            await axios.post(
                hostname,
                {
                    query: strCreateProductMutation,
                    variables: {
                        input: _listOfProducts[0]

                    }
                },
                config
            )
        } catch (_e) {
            assert.graphQLError(_e.response.data)
        }
    })

})



