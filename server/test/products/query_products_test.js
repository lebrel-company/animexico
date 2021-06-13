'use strict';
// libraries:
import util from 'util'
import chai from 'chai'
import axios from 'axios'
import {axiosConfig, hostname} from '../constants';
import chaiGraphQL from 'chai-graphql'
import {ProductModel} from '../../src/types/product/product.model';
import {listOfProducts} from '../../seed/product_data';
import {strQueryAllActiveProducts} from './products_gql';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:

// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}
chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
//==============================================================================


describe('PRODUCTS.QUERIES', function functionName() {

    before(async function _before() {
        try {
            await ProductModel.collection.drop()
            await ProductModel.create(listOfProducts)
        } catch (_e) {
            console.log(e)
            // Handle error here
        }
    })

    it('NO-AUTH: Query all available products',
        async function _queryAll() {
            var result;
            try {
                result = await axios.post(
                    hostname,
                    {
                        query: strQueryAllActiveProducts
                    },
                    axiosConfig
                )

            } catch (_e) {
                console.log(_e)
            }
            assert.graphQLSubset(
                result.data.data,
                [
                    {
                        name: 'Goku'
                    },
                    {
                        name: 'Guts'
                    },
                    {
                        name: 'Kenshin Himura'
                    }
                ]
            )
        }
    )

})