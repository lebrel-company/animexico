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
import {forDatabaseInsertion, listOfProducts} from '../../seed/product_data';
import {dropAll} from '../cleanup';
import {ProductModel} from '../../src/types/product/product.model';
import _ from 'lodash';
import {axiosConfig, hostname} from '../constants';
import {authData} from '../auth';
import {CART} from './cart_int_test';
import status from '../../src/utils/status';
import {CartModel} from '../../src/types/cart/cart.model';
import {cartFragments} from './cart_int_test';

chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//==============================================================================


export var CART_PRODUCTS = {
    mutations: {
        addProductToCart: `
            mutation addProductToCart($input: CartProductInput!){
                addProductToCart(input: $input){
                    ${cartFragments()}
                }
            }
        `,
        removeProductFromCart: `
            mutation removeProductFromCart($input: CartProductInput!){
                removeProductFromCart(input: $input){
                    ${cartFragments()}
                }
            }
        `,
        updateProductQuantity: `
            mutation updateProductQuantity($input: CartProductInput!){
                updateProductQuantity(input: $input){
                    ${cartFragments()}
                }
            }
        `
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

describe('CART.PRODUCTS', async function () {
    var cart;
    var CLIENT_AUTH_CONFIG;
    CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
    let {token} = await authData()
    CLIENT_AUTH_CONFIG.headers.authorization = `Bearer ${token}`

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    beforeEach(async function () {
        await dropAll()
        try {
            await ProductModel.insertMany(forDatabaseInsertion())
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
        let listOfProducts = await ProductModel.find({})

        try {
            res = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.addProductToCart,
                    variables: {
                        input: {
                            idProduct: listOfProducts[0].id,
                            quantity: 1
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )

        } catch (_e) {
            pp(_e.response.data)
        }

        let product = await ProductModel.findOne({_id: listOfProducts[0]._id})


        // Assertions:
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
        let lop = await ProductModel.find({})
        let goku = lop[0]

        try {
            res = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.updateProductQuantity,
                    variables: {
                        input: {quantity: 3, idProduct: goku._id}
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        // Assertions:
        let product = await ProductModel.findOne({_id: goku._id})
        pp(product)
        pp(res)
        let cart = await CartModel.findOne({})
        expect(product.stock).to.equal(7)


        let res02;
        try {
            res02 = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.updateProductQuantity,
                    variables: {
                        input: {
                            quantity: 3,
                            idProduct: goku._id
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        // Assertions:
        let product02 = await ProductModel.findOne({_id: goku._id})
        let cart02 = await CartModel.findOne({})
        expect(product02.stock).to.equal(7)
        expect(cart02.listOfProducts[0].quantity).to.be.equal(3)

        let res03;
        try {
            res03 = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.updateProductQuantity,
                    variables: {
                        input: {
                            quantity: 2,
                            idProduct: goku._id
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        // Assertions:

        let product03 = await ProductModel.findOne({_id: goku._id})
        let cart03 = await CartModel.findOne({})
        expect(product03.stock).to.equal(8)
        expect(cart03.listOfProducts[0].quantity).to.be.equal(2)


    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Cart: Remove product.', async function () {
        let _listOfProducts = await ProductModel.find({})
        let goku = _listOfProducts[0]
        // UPDATE CART
        try {
            await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.updateProductQuantity,
                    variables: {
                        input: {
                            quantity: 3,
                            idProduct: goku._id
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

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
                            idProduct: goku._id
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        // REMOVE PRODUCT
        let res03;
        try {
            res03 = await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.removeProductFromCart,
                    variables: {
                        input: {
                            idProduct: goku._id
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














