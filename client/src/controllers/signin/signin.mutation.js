import {gql} from '@apollo/client';


export const signinMutationString = gql`
    mutation signin($input: SigninInput!){
        signin(input: $input){
            token
        }
    }
`;

