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


describe('ORDER CREATION', function () {
    var _listOfProducts;
    var _user;
    before(async () => {
        await ProductModel.collection.drop()
        _listOfProducts = await ProductModel.create(listOfProducts)
    })

    beforeEach(async () => {
        try {
            await UserModel.collection.drop()
            await OrdersModel.collection.drop()
        } catch (e) {
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
        async () => {
            let config = _.cloneDeep(axiosConfig)
            config.headers.authorization = (await authData()).token
            let _u = await UserModel.findOne({email: mapUserRegister.email})
            let _p = await ProductModel.find()
            let mapOfOrderProducts = _p.map((el) => {
                return {
                    id: el.id,
                    quantity: 1
                }
            })
            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: strCreateOrder,
                        variables: {
                            input: {
                                idUser: _u._id,
                                listOfProducts: mapOfOrderProducts,
                                address: 'primary'
                            }
                        }
                    },
                    config
                )
            } catch (e) {
                pp(e.response.data)
            }

            let result = {
                data: res.data.data.createOrder
            }

            assert.graphQL(
                result,
                [
                    {
                        idUser: _u.id,
                        address: 'primary',
                        status: 'PENDING',
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
                        status: 'PENDING',
                        total: 73030,
                        listOfProducts: [
                            {
                                name: 'Guts'
                            }
                        ]
                    }
                ]
            )
        }
    )
});









