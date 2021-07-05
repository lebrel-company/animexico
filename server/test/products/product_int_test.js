'use strict';
// libraries:
import {dropAll} from '../cleanup';

const axios = require('axios')
import _ from 'lodash'
import {DateTime} from 'luxon'

const mongoose = require('mongoose')
import {gql} from 'apollo-server'
import util from 'util'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../../src/types/user/user.model';
import {ProductModel} from '../../src/types/product/product.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {axiosConfig, hostname} from '../constants';
import {forDatabaseInsertion, listOfProducts} from '../../seed/product_data';
import {authData} from '../auth';
var pp = (el) => console.log(util.inspect(el, false, 5, true))
chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.shoud
//==============================================================================


export const PRODUCT = {
    mutations: {
        create: gql`
            mutation createProduct($input: ProductInput!){
                createProduct(input: $input){
                    name
                    price{
                        amount
                        currency
                    }
                    description
                    sku
                    stock
                    available
                    publish{
                        date
                        timestamp
                    }
                    purchaseLimit
                    listOfImages
                    listOfTags
                }
            }
        `.loc.source.body
    },
    queries: {
        all: gql`
            query queryProducts{
                queryProducts{
                    id
                    name
                    price{
                        amount
                        currency
                    }
                    description
                    sku
                    publish{
                        date
                        timestamp
                    }
                    listOfImages
                    purchaseLimit
                }
            }
        `.loc.source.body
    }
}


describe('PRODUCT CREATION', () => {
    var _listOfProducts = _.cloneDeep(listOfProducts)
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

    beforeEach(async () => {
        await dropAll()
    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('AD-AUTH.Product: Create one product',
        async function createOneProductAsAdmin() {
            let userData = await authData('admin')
            let config = _.cloneDeep(axiosConfig)
            config.headers.authorization = `Bearer ${userData.token}`
            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: PRODUCT.mutations.create,
                        variables: {input: _listOfProducts[0]}
                    },
                    config
                )
            } catch (_e) {
                pp(_e.request.data)
            }

            let sourceProduct = _.cloneDeep(_listOfProducts[0])

            let mongoProduct = await ProductModel.findOne({
                sku: _listOfProducts[0].sku
            })

            {
                expect(res.data.data.createProduct.sku)
                    .to.be.equal(mongoProduct.sku)
            }

        })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('NO-AUTH.Product: Reject create one product', async () => {
        try {
            await axios.post(
                hostname,
                {
                    query: PRODUCT.mutations.create,
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

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Product: Reject create one product', async () => {
        let userData = await authData()
        let config = _.cloneDeep(axiosConfig)
        config.headers.authorization = `Bearer ${userData.token}`

        try {
            await axios.post(
                hostname,
                {
                    query: PRODUCT.mutations.create,
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

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('NO-AUTH.Product: Query all available products', async function () {

        let _listOfProducts = forDatabaseInsertion()

        await ProductModel.insertMany(_listOfProducts)


        let res;

        try {
            res = await axios.post(
                hostname, {query: PRODUCT.queries.all}, axiosConfig
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        {
            // Assertions:
            expect(res.data.data.queryProducts.length)
                .to.be.equal(_listOfProducts.length)
        }
    })

})



