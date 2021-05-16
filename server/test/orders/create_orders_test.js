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
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {strCreateOrder} from './create_orders_gql';
import {axiosConfig, hostname} from '../constants';
import {listOfProducts} from '../product_data';
import {mapAdminRegister} from '../user_data';
import {authData} from '../auth';
import {strCreateProductMutation} from '../products/create_products_gql';
import order from '../../../client/src/components/client/order';
//==============================================================================
chai.use(chaiGraphQL)
var assert = chai.assert
var cl = console.log


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

    it('ME-AUTH: Reject create order',
        async () => {
            var userData;
            try {
                userData = await authData()
            } catch (e) {
                cl(e)
            }
            let config = _.cloneDeep(axiosConfig)
            config.headers.authorization = userData.token

            var res;
            try {
                res = await axios.post(
                    hostname,
                    {
                        query: strCreateOrder,
                        variables: {input: listOfProducts[0]}
                    },
                    config
                )
            } catch (e) {
                assert.graphQLError(e.response.data)
            }
        }
    )

    it('AD-AUTH: Create order',
        async () => {
            let config = _.cloneDeep(axiosConfig)
            config.headers.authorization = (await authData('admin')).token
            let _u = await UserModel.findOne({email: mapAdminRegister.email})
            let _p = await ProductModel.find()
            let listOfProductIds = _p.map((el) => {
                return el.id
            })

            try {

                let res = await axios.post(
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
        }
    )

});









