'use strict';
// libraries:
import util from 'util'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import _ from 'lodash'
import axios from 'axios'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../../src/types/product/product.model';
import {UserModel} from '../../src/types/user/user.model';
import {OrdersModel} from '../../src/types/order/order.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {strCreateOrder} from './create_orders_gql';
import {axiosConfig, hostname} from '../constants';
import {listOfProducts} from '../product_data';
import {mapUserRegister} from '../user_data';
import {authData} from '../auth';

var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}
chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
//==============================================================================


var CLIENT_AUTH_CONFIG;

async function createMapOfProducts(quantity, filter = {}) {
    let _p = await ProductModel.find(filter)

    let result = _p.map((el) => {
        return {
            id: el.id,
            quantity: quantity
        }
    })
    return result
}

describe('ORDER CREATION', function () {
    var _listOfProducts;
    var _user;
    before(async () => {
        await ProductModel.collection.drop()
        CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
        CLIENT_AUTH_CONFIG.headers.authorization = (await authData()).token
    })

    beforeEach(async () => {
        try {
            await OrdersModel.collection.drop()
        } catch (e) {
        }
    })
    after(async () => {
        try {
            await ProductModel.collection.drop()
            await OrdersModel.collection.drop()
            await UserModel.collection.drop()
        } catch (e) {
            //
        }
    })

    it('NO-AUTH: Reject create order',
        async () => {
            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: strCreateOrder,
                        variables: {
                            input: listOfProducts[0]
                        }
                    }
                )
            } catch (e) {
                assert.graphQLError(e.response.data)
            }
        }
    )

    it('CL-AUTH: Create order',
        async function userAuthenticatedOrderCreation() {
            _listOfProducts = await ProductModel.create(listOfProducts)
            let _u = await UserModel.findOne({email: mapUserRegister.email})
            let _p = await ProductModel.find()

            let _mapOfOrderProducts = await createMapOfProducts(1)

            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: strCreateOrder,
                        variables: {
                            input: {
                                idUser: _u._id,
                                listOfProducts: _mapOfOrderProducts,
                                address: 'primary'
                            }
                        }
                    },
                    CLIENT_AUTH_CONFIG
                )
            } catch (e) {
                pp(e)
            }

            assert.graphQL(
                {data: res.data.data.createOrder},
                {
                    __typename: 'OrderAccepted',
                    status: 'success',
                    listOfOrders: [
                        {
                            idUser: _u.id,
                            address: 'primary',
                            orderStatus: 'PENDING',
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
                            orderStatus: 'PENDING',
                            total: 73030,
                            listOfProducts: [
                                {
                                    name: 'Guts'
                                }
                            ]
                        }
                    ]
                }
            )
        }
    )

    it('CL-AUTH: Reject order creation for product amount over the allowed limit',
        async function rejectOrderWithProductsOverTheLimit() {
            let _u = await UserModel.findOne({email: mapUserRegister.email})
            let _mapOfOrderProducts = await createMapOfProducts(5)
            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: strCreateOrder,
                        variables: {
                            input: {
                                idUser: _u._id,
                                listOfProducts: _mapOfOrderProducts,
                                address: 'primary'
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
                    status: 'invalid',
                    message: 'Lo sentimos, hubo un error al procesar tu orden',
                    listOfErrors: [
                        'El limite de compra de Goku es de 3',
                        'El limite de compra de Guts es de 1'
                    ]
                }
            )
        }
    )

    it('CL-AUTH: Reject order creation for out of stock products',
        async function rejectOrderOutOfStock() {
            await ProductModel.collection.drop()
            let listOfOutOfStockProducts = []
            listOfProducts.forEach((product) => {
                    product.stock = 0
                    listOfOutOfStockProducts.push(product)
                }
            )
            await ProductModel.create(listOfOutOfStockProducts)

            let _u = await UserModel.findOne({email: mapUserRegister.email})
            let _mapOfOrderProducts = await createMapOfProducts(5)
            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: strCreateOrder,
                        variables: {
                            input: {
                                idUser: _u._id,
                                listOfProducts: _mapOfOrderProducts,
                                address: 'primary'
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
                    status: 'invalid',
                    message: 'Lo sentimos, hubo un error al procesar tu orden',
                    listOfErrors: [
                        'Quedan 0 piezas de Goku',
                        'Quedan 0 piezas de Guts'
                    ]
                }
            )
        }
    )
});


