'use strict';
// libraries:
import {useFormik} from 'formik';
import * as Yup from 'yup';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import LOGIN from './login.query.gql'
import {userFields} from '../../utils/fields/user';

var pp = (el) => console.log(el)

//==============================================================================


export default function loginFormik(graphql, states, contexts, route) {

    function requiredMessage(field_name) {
        return `${field_name} es requerido`
    }

    return useFormik(
        {
            initialValues:
                {
                    email: '',
                    password: ''
                },

            validationSchema: Yup.object({
                email: Yup.string()
                    .required(requiredMessage(userFields.email.placeholder)),
                password: Yup.string()
                    .required(requiredMessage(userFields.password.placeholder))
            }),

            onSubmit:
                async function submit_data(values) {

                    const {email, password} = values;

                    try {
                        pp(states)

                        await graphql.query({
                            variables: {
                                input: {email, password}
                            }
                        });

                        if (graphql.data.login.status === 'invalid') {
                            states.activateMessage.setter(true)
                            states.message.setter(graphql.data.login.message)
                        }

                        if (graphql.data.login.status === 'success') {
                            states.activateMessage.setter(true)
                            states.message.setter(graphql.data.login.message)
                            contexts.authContext.setAuthState(
                                graphql.data.login.authInfo
                            )
                            setTimeout(() => {
                                route.hook.push(route.path);
                            }, 2000);
                        }


                    } catch (error) {
                        states.activateMessage.setter(true)
                        states.message.setter(error.message)
                    }
                }
        }
    );
}