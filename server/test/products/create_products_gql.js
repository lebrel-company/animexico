'use strict';
// libraries:
import {gql} from 'apollo-server'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

export var strCreateProductMutation = gql`
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
            publish{
                date
                month
            }
            purchaseLimit
            listOfImages
            listOfTags
        }
    }
`.loc.source.body
