'use strict';
// libraries:
import {gql} from 'apollo-server'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

export var strCreateOrder = gql`
    mutation createOrder($input: OrderInput!){
        createOrder(input: $input){
            listOfProducts{
                id
            }
            address
            idUser
            status
            total
        }
    }
`.loc.source.body


// input OrderInput{
//     idUser: ID!,
//     listOfProducts: [OrderProductInput!]!
//     total: Float!
//     address: String!
//     status: OrderStatus!
// }
