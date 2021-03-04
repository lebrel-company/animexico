'use strict';
import React from 'react';
import { gql } from '@apollo/client';

export const signupMutationString = gql`
    mutation signup($input: SignupInput!){
        signup(input: $input){
            token
            user{
                firstName
                middleName
                lastName
                secondLastName
            }
        }
    }
`;

