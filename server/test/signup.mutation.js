'use strict';
// libraries:
import {gql} from 'apollo-server'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


var signupGQL = gql`
    mutation signup($input: SignupInput!){
        signup(input: $input){
            token
            userInfo{
                firstName
                middleName
                lastName
                secondLastName
            }
        }
    }
`

export var signupMutationString = signupGQL.loc.source.body
