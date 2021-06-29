'use strict';
// libraries:
import util from 'util'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import axios from 'axios'
import mongoose from 'mongoose'
import {gql} from 'apollo-server'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {listOfProducts} from '../../seed/product_data';
import {dropAll} from '../cleanup';
import {ProductModel} from '../../src/types/product/product.model';
import _ from 'lodash';
import {axiosConfig, hostname} from '../constants';
import {authData} from '../auth';
import {CART} from './cart_int_test';
import status from '../../src/utils/status';
import {CartModel} from '../../src/types/cart/cart.model';

chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//==============================================================================

export var CART_PRODUCTS = {
    mutations: {
        addProductToCart: gql`
            mutation addProductToCart($input: CartProductInput!){
                addProductToCart(input: $input){
                    __typename
                    ... on MyCart{
                        status
                        message
                        cart{
                            id
                            idUser
                            timeout{
                                start
                                end
                            }
                            listOfProducts{
                                id
                                code
                                purchaseLimit
                                name
                                thumbnail
                                price{
                                    amount
                                    currency
                                }
                                quantity
                            }
                        }
                    }
                    ... on InvalidCart{
                        status
                        message
                        listOfErrors
                    }
                }
            }
        `.loc.source.body,
        removeProductFromCart: gql`
            mutation removeProductFromCart($input: CartProductInput!){
                removeProductFromCart(input: $input){
                    __typename
                    ... on MyCart{
                        status
                        message
                        cart{
                            id
                            idUser
                            timeout{
                                start
                                end
                            }
                            listOfProducts{
                                id
                                code
                                purchaseLimit
                                name
                                thumbnail
                                price{
                                    amount
                                    currency
                                }
                                quantity
                            }
                        }
                    }
                    ... on InvalidCart{
                        status
                        message
                        listOfErrors
                    },
                    ... on DeletedCart{
                        status
                        message
                        listOfProducts{
                            name
                        }
                    }
                }
            }
        `.loc.source.body,
        updateProductQuantity: gql`
            mutation updateProductQuantity($input: CartProductInput!){
                updateProductQuantity(input: $input){
                    __typename
                    ... on MyCart{
                        status
                        message
                        cart{
                            id
                            idUser
                            timeout{
                                start
                                end
                            }
                            listOfProducts{
                                id
                                code
                                purchaseLimit
                                name
                                thumbnail
                                price{
                                    amount
                                    currency
                                }
                                quantity
                            }
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


var gokuAsInput = {
    idProduct: listOfProducts[0]._id.toString(),
    quantity: 1
}

var gutsAsInput = {
    idProduct: listOfProducts[1]._id.toString(),
    quantity: 1
}

describe('CART.PRODUCTS', function () {
    var cart;
    var CLIENT_AUTH_CONFIG;

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    beforeEach(async function () {
        await dropAll()
        let _listOfProducts = _.cloneDeep(listOfProducts)
        CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
        let {token} = await authData()
        CLIENT_AUTH_CONFIG.headers.authorization = `Bearer ${token}`

        try {
            await ProductModel.insertMany(_listOfProducts)

            cart = await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: {...gokuAsInput}
                    }
                },
                CLIENT_AUTH_CONFIG
            )

        } catch (_e) {
            pp(_e.message)
        }
    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Cart: Add product.', async () => {
        let res;
        try {
            res = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.addProductToCart,
                    variables: {
                        input: {...gutsAsInput}
                    }
                },
                CLIENT_AUTH_CONFIG
            )

        } catch (_e) {
            pp(_e.response.data)
        }

        let product = await ProductModel.findOne(
            {_id: gutsAsInput.idProduct}
        )

        expect(product.stock).to.be.equal(9)

        assert.graphQLSubset(
            res.data,
            {
                addProductToCart: {
                    status: status.success
                }
            }
        )
    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Cart: Update product quantity.', async function () {
        let res;
        try {
            res = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.updateProductQuantity,
                    variables: {
                        input: {
                            quantity: 3,
                            idProduct: gokuAsInput.idProduct
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        // Assertions:
        let product = await ProductModel.findOne({_id: gokuAsInput.idProduct})
        let cart = await CartModel.findOne({})
        expect(product.stock).to.equal(7)

        //-   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -

        let res02;
        try {
            res02 = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.updateProductQuantity,
                    variables: {
                        input: {
                            quantity: 3,
                            idProduct: gokuAsInput.idProduct
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        // Assertions:

        let product02 = await ProductModel.findOne({_id: gokuAsInput.idProduct})
        let cart02 = await CartModel.findOne({})
        expect(product02.stock).to.equal(7)
        expect(cart02.listOfProducts[0].quantity).to.be.equal(3)

        //-   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -

        let res03;
        try {
            res03 = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.updateProductQuantity,
                    variables: {
                        input: {
                            quantity: 2,
                            idProduct: gokuAsInput.idProduct
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        // Assertions:

        let product03 = await ProductModel.findOne({_id: gokuAsInput.idProduct})
        let cart03 = await CartModel.findOne({})
        expect(product03.stock).to.equal(8)
        expect(cart03.listOfProducts[0].quantity).to.be.equal(2)

        //-   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -

    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Cart: Remove product.', async function () {
        let _listOfProducts = await ProductModel.find({})

        //-   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
        // CREATE CART
        let res01;
        try {
            res01 = await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: {
                            quantity: 3,
                            idProduct: _listOfProducts[0]._id.toString()
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }
        //-   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
        // UPDATE CART
        try {
            await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.updateProductQuantity,
                    variables: {
                        input: {
                            quantity: 3,
                            idProduct: _listOfProducts[0]._id.toString()
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        //-   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
        // ADD PRODUCT

        let res02;
        try {
            res02 = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.addProductToCart,
                    variables: {
                        input: {
                            quantity: 1,
                            idProduct: _listOfProducts[1]._id.toString()
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        //-   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
        // REMOVE PRODUCT

        let res03;
        try {
            res03 = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.removeProductFromCart,
                    variables: {
                        input: {
                            idProduct: _listOfProducts[0]._id.toString()
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        // Assertions:

        let product = await ProductModel.findOne({_id: _listOfProducts[0].id})

        expect(product.stock).to.be.equal(10)

    })
})














