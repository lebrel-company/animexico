'use strict';
// libraries:
import axios from 'axios'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import _ from 'lodash'
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
import {mapAdminRegister, mapUserRegister} from '../user_data';
import {authData} from '../auth';

chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
var cl = console.log
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

    // it('ME-AUTH: Reject create order',
    //     async () => {
    //         var userData;
    //         try {
    //             userData = await authData()
    //         } catch (e) {
    //             cl(e)
    //         }
    //         let config = _.cloneDeep(axiosConfig)
    //         config.headers.authorization = userData.token
    //
    //         var res;
    //         try {
    //             res = await axios.post(
    //                 hostname,
    //                 {
    //                     query: strCreateOrder,
    //                     variables: {input: listOfProducts[0]}
    //                 },
    //                 config
    //             )
    //         } catch (e) {
    //             assert.graphQLError(e.response.data)
    //         }
    //     }
    // )

    it('CL-AUTH: Create order',
        async () => {
            let config = _.cloneDeep(axiosConfig)
            config.headers.authorization = (await authData()).token
            let _u = await UserModel.findOne({email: mapUserRegister.email})
            let _p = await ProductModel.find()
            let listOfProductIds = _p.map((el) => {
                return el.id
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
                                listOfProductIds: listOfProductIds,
                                address: 'primary'
                            }
                        }
                    },
                    config
                )
            } catch (e) {
                cl(e.response.data)
            }
            cl(res.data)
            expect(1).to.equal(2)
        }
    )

});









