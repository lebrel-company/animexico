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
            __typename
            ... on OrderAccepted{
                status
                listOfOrders{
                    idUser
                    address
                    orderStatus
                    total
                    listOfProducts{
                        name
                    }
                }
            }
            ... on OrderInvalid{
                status
                message
                listOfErrors
            }
        }
    }
`.loc.source.body


