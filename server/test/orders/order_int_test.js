'use strict';
// libraries:
import util from 'util'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import _ from 'lodash'
import axios from 'axios'
import {gql} from 'apollo-server'
import mongoose from 'mongoose'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../../src/types/product/product.model';
import {UserModel} from '../../src/types/user/user.model';
import {OrdersModel} from '../../src/types/order/order.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {axiosConfig, hostname} from '../constants';
import {listOfProducts} from '../../seed/product_data';
import status from '../../src/utils/status';
import {
    listOfUsers,
    mapAdminRegister,
    mapUserRegister
} from '../../seed/user_data';
import {authData} from '../auth';
import {dropAll} from '../cleanup';

var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}
chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
//==============================================================================

export var ORDER = {
    mutations: {
        createOrder: gql`
            mutation createOrder($input: OrderInput!){
                createOrder(input: $input){
                    __typename
                    ... on OrderAccepted{
                        status
                        listOfOrders{
                            idUser
                            address
                            orderStatus
                            total
                            listOfProducts{
                                name
                            }
                        }
                    }
                    ... on OrderInvalid{
                        status
                        message
                        listOfErrors
                    }
                }
            }`.loc.source.body
    }
}


var CLIENT_AUTH_CONFIG;


describe('ORDER.CREATION', function () {

    beforeEach(async () => {
        await dropAll()
        CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
        let {token} = await authData()
        CLIENT_AUTH_CONFIG.headers.authorization = `Bearer ${token}`
    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('NO-AUTH.Order: Reject create order.',
        async () => {
            let _listOfProducts = _.cloneDeep(listOfProducts)
            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: ORDER.mutations.createOrder,
                        variables: {
                            input: _listOfProducts[0]
                        }
                    },
                    axiosConfig
                )
            } catch (e) {
                assert.graphQLError(e.response.data)
            }
        }
    )

    async function createMapOfProducts(listOfProducts, quantity, filter = {}) {
        let _p = await ProductModel.find(filter)

        let result = _p.map((el) => {
            return {
                id: el.id,
                quantity: quantity
            }
        })
        return result
    }

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Order: Succesfully create order.',
        async function userAuthenticatedOrderCreation() {
            let _listOfProducts = _.cloneDeep(listOfProducts)
            var _fetchedListOfProducts;
            try {
                _fetchedListOfProducts = await ProductModel.create(_listOfProducts)
            } catch (_e) {
                pp(_e.message)
            }

            let _u = await UserModel.findOne({email: mapUserRegister.email})
            let _p = await ProductModel.find()
            let _mapOfOrderProducts = (
                await createMapOfProducts(_fetchedListOfProducts, 1)
            )

            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: ORDER.mutations.createOrder,
                        variables: {
                            input: {
                                idUser: _u._id,
                                listOfProducts: _mapOfOrderProducts,
                                address: 'primary',
                                paypal: {
                                    idOrder: '123',
                                    idPayer: 'abc'
                                }
                            }
                        }
                    },
                    CLIENT_AUTH_CONFIG
                )
            } catch (_e) {
                pp(_e.response.data)
            }

            assert.graphQLSubset(
                {data: res.data.data.createOrder},
                {
                    __typename: 'OrderAccepted',
                    status: 'success',
                    listOfOrders: [
                        {
                            idUser: _u.id,
                            address: 'primary',
                            orderStatus: status.order.pending,
                            total: 14000,
                            listOfProducts: [
                                {
                                    name: 'Goku'
                                },
                                {
                                    name: 'Kenshin Himura'
                                }
                            ]
                        },
                        {
                            idUser: _u.id,
                            address: 'primary',
                            orderStatus: status.order.pending,
                            total: 73030,
                            listOfProducts: [
                                {
                                    name: 'Guts'
                                }
                            ]
                        },
                        {
                            idUser: _u.id,
                            address: 'primary',
                            orderStatus: status.order.pending,
                            total: 14000,
                            listOfProducts: [
                                {
                                    name: 'Shaka de Virgo'
                                }
                            ]
                        }
                    ]
                }
            )
        }
    )

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    // it('CL-AUTH.Order: Reject order for product amount over the allowed limit',
    //     async function rejectOrderWithProductsOverTheLimit() {
    //         let _listOfProducts = _.cloneDeep(listOfProducts)
    //         try {
    //             await ProductModel.create(_listOfProducts)
    //         } catch (_e) {
    //             pp(_e.message)
    //             // Handle error here
    //         }
    //
    //         let _u = await UserModel.findOne({email: mapUserRegister.email})
    //
    //         let _mapOfProducts = _.cloneDeep(listOfProducts)
    //         let _mapOfOrderProducts = await createMapOfProducts(listOfProducts, 5)
    //         var res;
    //         try {
    //             res = await axios.post(
    //                 hostname,
    //                 {
    //                     query: ORDER.mutations.createOrder,
    //                     variables: {
    //                         input: {
    //                             idUser: _u._id,
    //                             listOfProducts: _mapOfOrderProducts,
    //                             address: 'primary',
    //                             paypal: {
    //                                 idOrder: '123',
    //                                 idPayer: 'abc'
    //                             }
    //                         }
    //                     }
    //                 },
    //                 CLIENT_AUTH_CONFIG
    //             )
    //         } catch (e) {
    //             pp(e.response.data)
    //         }
    //
    //         assert.graphQLSubset(
    //             {data: res.data.data.createOrder},
    //             {
    //                 __typename: 'OrderInvalid',
    //                 status: status.invalid,
    //                 message: status.messages.order.creation.invalid
    //             }
    //         )
    //     }
    // )

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    // it('CL-AUTH.Order: Reject order creation for out of stock products',
    //     async function rejectOrderOutOfStock() {
    //         let _listOfProducts = _.cloneDeep(listOfProducts)
    //         let listOfOutOfStockProducts = []
    //
    //         _listOfProducts.forEach((product) => {
    //                 product.stock = 0
    //                 listOfOutOfStockProducts.push(product)
    //             }
    //         )
    //
    //         await ProductModel.create(listOfOutOfStockProducts)
    //
    //         let _u = await UserModel.findOne({email: mapUserRegister.email})
    //         let _mapOfOrderProducts = (
    //             await createMapOfProducts(_listOfProducts, 5)
    //         )
    //         var res;
    //         try {
    //             res = await axios.post(
    //                 hostname,
    //                 {
    //                     query: ORDER.mutations.createOrder,
    //                     variables: {
    //                         input: {
    //                             idUser: _u._id,
    //                             listOfProducts: _mapOfOrderProducts,
    //                             address: 'primary',
    //                             paypal: {
    //                                 idOrder: '123',
    //                                 idPayer: 'abc'
    //                             }
    //                         }
    //                     }
    //                 },
    //                 CLIENT_AUTH_CONFIG
    //             )
    //         } catch (e) {
    //             pp(e.response.data)
    //         }
    //
    //         assert.graphQLSubset(
    //             {data: res.data.data.createOrder},
    //             {
    //                 __typename: 'OrderInvalid',
    //                 status: status.invalid,
    //                 message: status.messages.order.creation.invalid
    //             }
    //         )
    //     }
    // )
});


