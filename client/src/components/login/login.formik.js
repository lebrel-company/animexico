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
import {userFields} from '../../utils/fields/user';

var pp = (el) => console.log(el)
//==============================================================================


export default function loginFormik(loginQuery) {

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
                function submit_data(values) {
                    const {email, password} = values;
                    loginQuery({
                        variables: {
                            input: {email, password}
                        }
                    })
                }
        }
    )
}
