'use strict';
// libraries:
import util from 'util'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import {DateTime} from 'luxon'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should
import helpers from '../../src/types/order/order.helpers'

var pp = (el) => console.log(util.inspect(el, false, 5, true))
//==============================================================================


describe('UNIT.ORDERS: Helpers', function ordersUtilitiesTest() {

        it('Unit.Order: Segregate list of orders by publish month',
            async function segretateProducts() {
                let january = DateTime.fromISO('2021-01-01').ts
                let april = DateTime.fromISO('2021-04-01').ts
                let data = [
                    {name: 'Product one', publish: {timestamp: january}},
                    {name: 'Product two', publish: {timestamp: april}},
                    {name: 'Product three', publish: {timestamp: january}},
                    {name: 'Product four', publish: {timestamp: january}}
                ]
                let result = helpers.segregateProductsByMonth(data)


                expect(result).to.deep.equal({
                    January: [
                        {name: 'Product one', publish: {timestamp: january}},
                        {name: 'Product three', publish: {timestamp: january}},
                        {name: 'Product four', publish: {timestamp: january}}
                    ],
                    April: [
                        {name: 'Product two', publish: {timestamp: april}}
                    ]
                })
            }
        )


        it('Unit.Order: Filter order list of products', () => {
                let data = {
                    price: {
                        amount: 10,
                        currency: 'MXN'
                    },
                    listOfTags: [],
                    listOfImages: [
                        'https://omochanoruumu.com/wp-content/uploads/2018/01/gh0.jpg',
                        'https://images-na.ssl-images-amazon.com/images/I/71YRJ1CizSL._AC_SL1500_.jpg',
                        'https://images-na.ssl-images-amazon.com/images/I/91Y8WRGOsEL._AC_SL1500_.jpg'
                    ],
                    _id: '60a350e95df59b3b543f1299',
                    quantity: 3,
                    name: 'Goku',
                    description: 'Dragon Ball Z figuart',
                    sku: '123456',
                    stock: 200,
                    available: true,
                    publish: [Object],
                    purchaseLimit: 3,
                    subtotal: 30,
                    createdAt: '2021-05-18T05:30:17.425Z',
                    updatedAt: '2021-05-18T05:30:17.425Z',
                    __v: 0
                }

                let result = helpers.remapProductFields(data)

                expect(result).to.deep.equal(
                    {
                        id: '60a350e95df59b3b543f1299',
                        price: {
                            amount: 10,
                            currency: 'MXN'
                        },
                        thumbnail: 'https://omochanoruumu.com/wp-content/uploads/2018/01/gh0.jpg',
                        name: 'Goku',
                        sku: '123456',
                        quantity: 3,
                        subtotal: 30
                    }
                )
            }
        )


        it('Unit.Order: Map quantity to list of products', () => {
            let input = [
                {id: '1234567', quantity: 1},
                {id: '7654321', quantity: 2}
            ]
            let listOfProducts = [
                {id: '1234567', name: 'Goku'},
                {id: '7654321', name: 'Kenshin'}
            ]

            let result = (
                helpers.mapInputQuantityWithProductList(input, listOfProducts)
            )

            expect(result).to.deep.equal(
                [
                    {id: '1234567', name: 'Goku', quantity: 1},
                    {id: '7654321', name: 'Kenshin', quantity: 2}
                ]
            )
        })

        it('Unit.Order: Calculate total from a list of products', () => {
            let data = [{subtotal: 1200}, {subtotal: 4390}]
            let result = helpers.calculateTotalFromListOfProducts(data)
            expect(result).to.be.equal(5590)
        })

        it('Unit.Order: Get name id and amount from li', function calculate() {
            let data = [{subtotal: 1200}, {subtotal: 4390}]
            let result = helpers.calculateTotalFromListOfProducts(data)
            expect(result).to.be.equal(5590)
        })

        it('Unit.Order: Extract flattened list of products from list of orders',
            () => {
                let source = [
                    {
                        id: 1234,
                        listOfProducts: ['a', 'b']
                    },
                    {
                        id: 1234,
                        listOfProducts: ['c', 'd']
                    }
                ]

                let result = helpers.listOfProductsFromListOfOrders(source)
                expect(result).to.be.deep.equal(['a', 'b', 'c', 'd'])

            }
        )

    }
)





