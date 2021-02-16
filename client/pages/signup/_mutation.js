'use strict';
import React from 'react';
import { gql } from '@apollo/client';

var createNewUserMutation = gql`
    mutation createNewUser($input: UserInput){
        createNewUser(input: $input){
            id
            name
            lastname
            middleName
            secondLastname
            email
            birthday
            cellphone
            address{
                city
                state
                country
                zipcode
                suburb
                street
                buildingNumber
                apartmentNumber
            }
        }
    }
`;

export {createNewUserMutation}