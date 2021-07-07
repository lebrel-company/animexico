'use strict';
// libraries:
import util from 'util'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import _ from 'lodash'
import axios from 'axios'
import {gql} from 'apollo-server'
import {DateTime} from 'luxon'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../../src/types/product/product.model';
import {UserModel} from '../../src/types/user/user.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {axiosConfig, hostname} from '../constants';
import {forDatabaseInsertion, listOfProducts} from '../../seed/product_data';
import status from '../../src/utils/status';
import {mapUserRegister} from '../../seed/user_data';
import {authData} from '../auth';
import {dropAll} from '../cleanup';

chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
var pp = (el) => console.log(util.inspect(el, false, 5, true))
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
                            month
                            address
                            orderStatus
                            total
                            paypal{
                                idOrder
                                idPayer
                                idPayment
                            }
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

describe('ORDER.CREATION', function () {

    async function productQuantityAndId(quantity, filter = {}) {
        let lop = await ProductModel.find(filter)

        let result = lop.map((p) => {
            return {
                id: p.id,
                quantity: quantity
            }
        })
        return result
    }

    beforeEach(async () => {
        await dropAll()
        await ProductModel.insertMany(forDatabaseInsertion())
    })

    // __ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ __

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

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Order: Succesfully create order.', async function () {
        var CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
        let {token} = await authData()
        CLIENT_AUTH_CONFIG.headers.authorization = `Bearer ${token}`

        let _u = await UserModel.findOne({email: mapUserRegister.email})

        let _mapOfOrderProducts = (await productQuantityAndId(1))

        var res;
        try {
            res = await axios.post(
                hostname,
                {
                    query: ORDER.mutations.createOrder,
                    variables: {
                        input: {
                            listOfProducts: _mapOfOrderProducts,
                            address: 'primary',
                            paypal: {
                                idOrder: '123',
                                idPayer: 'abc',
                                idPayment: '123abc'
                            }
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        if (res.data.errors) pp(res.data.errors)


        let listOfProductsSource = _.cloneDeep(listOfProducts)
        let mapOfSegregatedProducts = {}
        listOfProductsSource.forEach((p) => {
            let month = DateTime.fromISO(p.publish).monthLong
            let __p = {
                name: p.name
            }
            if (_.has(mapOfSegregatedProducts, [month, 'listOfProducts'])) {
                mapOfSegregatedProducts[month].listOfProducts.push(__p)
            } else {
                mapOfSegregatedProducts[month] = {listOfProducts: [__p]}
            }
        })

        let orderResult = {listOfOrders: []}

        _.forEach(mapOfSegregatedProducts, (orderData, month) => {
            orderResult.listOfOrders.push(
                {
                    listOfProducts: orderData.listOfProducts
                }
            )
        })

        assert.graphQLSubset(
            {data: res.data.data.createOrder},
            orderResult
        )

        let listOfOrders = res.data.data.createOrder.listOfOrders
        listOfOrders.forEach((order) => {
            expect(order.total).to.be.equal(order.listOfProducts.length * 100)
        })
    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Order: Reject order for product amount over the allowed limit',
        async function rejectOrderWithProductsOverTheLimit() {
            var CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
            let {token} = await authData()
            CLIENT_AUTH_CONFIG.headers.authorization = `Bearer ${token}`

            let _mapOfOrderProducts = await productQuantityAndId(5)
            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: ORDER.mutations.createOrder,
                        variables: {
                            input: {
                                listOfProducts: _mapOfOrderProducts,
                                address: 'primary',
                                paypal: {
                                    idOrder: '123',
                                    idPayer: 'abc',
                                    idPayment: '123abc'
                                }
                            }
                        }
                    },
                    CLIENT_AUTH_CONFIG
                )
            } catch (e) {
                pp(e.response.data)
            }

            assert.graphQLSubset(
                {data: res.data.data.createOrder},
                {
                    __typename: 'OrderInvalid',
                    status: status.invalid,
                    message: status.messages.order.creation.invalid
                }
            )
        }
    )

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Order: Reject order creation for out of stock products',
        async function rejectOrderOutOfStock() {
            var CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
            let {token} = await authData()
            CLIENT_AUTH_CONFIG.headers.authorization = `Bearer ${token}`
            let _listOfProducts = _.cloneDeep(forDatabaseInsertion())
            let listOfOutOfStockProducts = []

            _listOfProducts.forEach((product) => {
                    product.stock = 0
                    listOfOutOfStockProducts.push(product)
                }
            )

            await ProductModel.create(listOfOutOfStockProducts)

            let _u = await UserModel.findOne({email: mapUserRegister.email})
            let _mapOfOrderProducts = (
                await productQuantityAndId(5)
            )
            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: ORDER.mutations.createOrder,
                        variables: {
                            input: {
                                listOfProducts: _mapOfOrderProducts,
                                address: 'primary',
                                paypal: {
                                    idOrder: '123',
                                    idPayer: 'abc',
                                    idPayment: '123abc'
                                }
                            }
                        }
                    },
                    CLIENT_AUTH_CONFIG
                )
            } catch (e) {
                pp(e.response.data)
            }

            assert.graphQLSubset(
                {data: res.data.data.createOrder},
                {
                    __typename: 'OrderInvalid',
                    status: status.invalid,
                    message: status.messages.order.creation.invalid
                }
            )
        }
    )
});


