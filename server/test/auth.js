'use strict';
// libraries:
import axios from 'axios'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {axiosConfig, hostname} from './constants';
import {signupMutationString} from './signup.mutation';
import {values} from './user_data';
//==============================================================================

export async function authenticateAsUser() {
    let result = await axios.post(
        hostname,
        {
            query: signupMutationString,
            variables: {input: values}
        },
        axiosConfig
    )
    return result.data.data.signup
}
