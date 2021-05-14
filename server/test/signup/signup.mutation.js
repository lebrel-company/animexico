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
                role
            }
        }
    }
`
export var strUserSignupMutation = signupGQL.loc.source.body

var adminSignupGQL = gql`
    mutation signup($input: AdminSignupInput!){
        adminSignup(input: $input){
            token
            userInfo{
                firstName
                middleName
                lastName
                secondLastName
                role
            }
        }
    }
`
export var strAdminSignupMutation = adminSignupGQL.loc.source.body
