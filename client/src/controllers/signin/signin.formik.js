// libraries:
import {useFormik} from 'formik';
import * as Yup from 'yup';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {fields} from '../../utils/formsHelpers'
import {spanishValidationHelpers} from '../../utils/validationHelpers'

//==============================================================================


export function signinFormik(mutation, states, route) {
    console.log(route)
    return useFormik(
        {
            initialValues:
                {
                    email: '',
                    password: ''
                },

            //-   -   -   -   -   -   -   -   -   -   -   -   -   -   -

            validationSchema:
                Yup.object({
                    email: Yup.string()
                        .email('Email no es valido')
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(
                                    fields.email.placeholder
                                )
                        ),
                    password: Yup.string()
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(
                                    fields.password.placeholder
                                )
                        ),
                }),

            //-   -   -   -   -   -   -   -   -   -   -   -   -   -   -

            onSubmit:
                async function submit_data(values) {
                    const {email, password} = values;

                    try {
                        const {data} = await mutation({
                            variables: {
                                input: {
                                    email,
                                    password
                                }
                            }
                        });

                        signinMessage('Autenticando...')

                        //save token in the storage
                        const {token} = data.signin;
                        localStorage.setItem('token', token);

                        //routing to index
                        setTimeout(() => {
                            signinMessage(null);
                            route.hook.push(route.path);
                        }, 500);


                    } catch (error) {
                        signinMessage(
                            error.message.replace('GraphQl error: ', '')
                        )
                        //console.log(error)

                        setTimeout(() => {
                            states.message.setter(null)
                        }, 3000);
                    }
                }
        }
    );
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --

function signinMessage(message) {
    return (
        <div
            className="
            bg-white py-2 px-3 w-full my-3
            max-w-sm text-center mx-auto">
            <p>{message}</p>
        </div>
    )
}
