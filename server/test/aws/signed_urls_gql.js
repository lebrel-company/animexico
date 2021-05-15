'use strict';
// libraries:
import {gql} from 'apollo-server'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export var strSingleUrlMutationString = gql`
    query signedAwsUrl{
        signedAwsUrl{
            key
            url
        }
    }
`.loc.source.body

export var listOfSignedUrlMutation = gql`
    query listOfSignedAwsUrls($input: Int!){
        listOfSignedAwsUrls(input: $input){
            key
            url
        }
    }
`.loc.source.body

