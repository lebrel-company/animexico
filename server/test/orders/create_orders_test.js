'use strict';
// libraries:
import axios from 'axios'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../../src/types/product/product.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {strCreateOrder} from './create_orders_gql';
import {axiosConfig, hostname} from '../constants';
import {listOfProducts} from './create_orders_data';
import {authData} from '../auth';
import {strCreateProductMutation} from '../products/create_products_gql';
//==============================================================================
chai.use(chaiGraphQL)
var assert = chai.assert


describe('Create order', function () {

    before(async () => {
        await ProductModel.collection.drop()
        await ProductModel.insertMany(listOfProducts, function functionName(err) {
                if (err) {
                    console.log(err.message)
                }
            }
        )
    })


    it('NO-AUTH: Create order', async () => {
            assert.strictEqual(1, 0)
            // var res;
            // try {
            //     res = await axios.post(
            //         hostname,
            //         {
            //             query: strCreateOrder,
            //             variables: {
            //                 input: listOfProducts[0]
            //             }
            //         }
            //     )
            // } catch (e) {
            //     console.warn('Response with errors')
            // }
            //
            // console.log()
            //
            // assert.graphQLError(res.data)
        }
    )

});