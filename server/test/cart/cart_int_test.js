'use strict';
// libraries:
import axios from 'axios'
import mongoose from 'mongoose'
import {gql} from 'apollo-server'
import util from 'util'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {UserModel} from '../../src/types/user/user.model';
import {ProductModel} from '../../src/types/product/product.model';
import {CartModel} from '../../src/types/cart/cart.model';
import {mapUserRegister} from '../../seed/user_data';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {hostname, axiosConfig} from '../constants';
import {hashPassword} from '../../src/utils/auth';
import {dropAll} from '../cleanup';
import {listOfProducts} from '../../seed/product_data';
import {authData} from '../auth';

var pp = (el) => console.log(util.inspect(el, false, 5, true))
chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
//==============================================================================

export var CART = {
    mutations: {
        createCart: gql`
            mutation createCart($input: CartInput!){
                updateCart(input: $input){
                    __typename
                    ... on MyCart{
                        status
                        message
                        cart{
                            id
                            idUser
                            listOfProducts{
                                id
                                code
                                quantity
                            }
                            timeout
                        }
                    }
                    ... on InvalidCart{
                        status
                        message
                        listOfErrors
                    }
                }
            }
        `.loc.source.body
    }
}

describe('CART', function cartTests() {
    before(async function _before() {
    })

    beforeEach(async function () {
        dropAll()
    })

    let cartInput = {
        product: {id: listOfProducts[0]._id.toString(), quantity: 1}
    }

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    it('NO-AUTH.Cart: Reject cart creation.', async function () {
        let _listOfProducts = _.cloneDeep(listOfProducts)
        try {
            await ProductModel.insertMany(_listOfProducts)
        } catch (_e) {
            pp(_e.message)
        }
        var res;
        try {
            res = await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: {...cartInput}
                    }
                },
                axiosConfig
            )
        } catch (_e) {
            pp(_e.message)
        }
        assert.graphQLError(res.data)
        expect(res.data.errors[0].message).to.be.equal('Not authorized')
    })


    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    it('CL-AUTH.Cart: Successful cart creation', async function () {
        var CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
        CLIENT_AUTH_CONFIG.headers.authorization = (await authData()).token
        let _listOfProducts = _.cloneDeep(listOfProducts)
        let res;
        try {
            await ProductModel.insertMany(_listOfProducts)
            res = await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: {...cartInput}
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.message)
        }
        assert.graphQL(res.data)

    })

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    it('CL-AUTH.Cart: Cart already exists', async function () {
        var CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
        CLIENT_AUTH_CONFIG.headers.authorization = (await authData()).token
        let _listOfProducts = _.cloneDeep(listOfProducts)
        let res_01;
        let res_02;
        try {
            await ProductModel.insertMany(_listOfProducts)
            res_01 = await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: {...cartInput}
                    }
                },
                CLIENT_AUTH_CONFIG
            )
            res_02 = await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: {...cartInput}
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.message)
        }

        expect(res_01.data).to.deep.equal(res_02.data)
    })
})








