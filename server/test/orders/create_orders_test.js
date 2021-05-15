'use strict';
// libraries:
import axios from 'axios'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {OrdersModel} from '../../src/types/order/order.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {strCreateOrder} from './create_orders_gql';
import {axiosConfig, hostname} from '../constants';
import {listOfProducts} from './create_orders_data';
import {authData} from '../auth';
//==============================================================================
chai.use(chaiGraphQL)
var assert = chai.assert


describe('Create order', function () {

    before('Create products', async () => {
        // let res = await authData('admin')
        // let config = _.cloneDeep(axiosConfig)
        // console.log(res)
        // config.headers.authorization = res.token

        await OrdersModel.insertMany(listOfProducts, function functionName(err) {
                if (err) {
                    console.log(err)
                }
            }
        )

    })


    it('NO-AUTH: Create order', async () => {
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
            console.warn('Response with errors')
        }

        console.log()

        assert.graphQLError(res.data)
    })

});