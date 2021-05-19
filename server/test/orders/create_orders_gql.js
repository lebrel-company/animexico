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
            idUser
            address
            status
            total
            listOfProducts{
                name
            }
        }
    }
`.loc.source.body


