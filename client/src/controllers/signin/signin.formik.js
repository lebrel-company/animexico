// libraries:
import {useFormik} from 'formik';
import * as Yup from 'yup';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import ErrorModalDialog from "../../components/modal/ErrorModalDialog";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {userFields} from '../../utils/fields/user'

//==============================================================================


export function signinFormik(mutation, states, contexts, route) {
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
                    email: Yup.string(),
                    password: Yup.string(),
                }),

            //-   -   -   -   -   -   -   -   -   -   -   -   -   -   -

            onSubmit:
                async function submit_data(values) {
                    states.activateError.setter(false)
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
                        contexts.authContext.setAuthState(data.signin)

                        setTimeout(() => {
                            route.hook.push(route.path);
                        }, 800);

                    } catch (error) {
                        states.activateError.setter(true)
                        states.message.setter(error.message)
                    }
                }
        }
    );
}