'use strict';
// libraries:
import {authData} from '../auth';

const axios = require('axios')
const assert = require('assert')
const mongoose = require('mongoose')
import {gql} from 'apollo-server'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../../src/types/product/product.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {axiosConfig, hostname} from '../constants';
//==============================================================================

var strCreateProductMutation = gql`
    mutation createProduct($input: ProductInput!){
        createProduct(input: $input){
            name
            price{
                amount
                currency
            }
            description
            code
            stock
            available
            publishDate
            listOfImages
            listOfTags
        }
    }
`.loc.source.body

var listOfProducts = [
    {
        name: 'Goku',
        price: {
            amount: 7000,
            currency: 'MXN'
        },
        description: 'Dragon Ball Z figuart',
        code: '137498374218901',
        stock: 200,
        available: true,
        publishDate: '2021-04-13',
        listOfImages: [
            'https://omochanoruumu.com/wp-content/uploads/2018/01/gh0.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71YRJ1CizSL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/91Y8WRGOsEL._AC_SL1500_.jpg'
        ],
        listOfTags: ['april']
    }
]

describe('Create product', () => {

    before(async()=>{
        await ProductModel.collection.drop()
    })

    it('ADMIN: Create one product', async () => {
        let userData = await authData('admin')
        let config = _.cloneDeep(axiosConfig)
        config.headers.authorization = userData.token
        let res = await axios.post(
            hostname,
            {
                query: strCreateProductMutation,
                variables: {
                    input: listOfProducts[0]

                }
            },
            config
        )
        let _product_source = _.cloneDeep(listOfProducts[0])
        _product_source.publishDate = (
            new Date('2021-04-13').getTime()
        ).toString()
        assert.deepStrictEqual(_product_source, res.data.data.createProduct)
    })
})



