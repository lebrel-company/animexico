// libraries:
import React, {useState, useContext} from 'react'
import {useMutation} from '@apollo/client';
import Link from 'next/link';
import {useRouter} from 'next/router';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from "../../context/AuthContext";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from "../../layout/Client";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import FieldError from "../../components/messages/FieldError";
import ErrorModalDialog from '../../components/modal/ErrorModalDialog'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {userFields} from '../../utils/fields/user'
import {signinFormik} from '../../controllers/signin/signin.formik'
import signinMutationString from '../../controllers/signin/signin.mutation.gql'
import {generalButtons} from '../../utils/buttons/general'
import {authButtons} from '../../utils/buttons/auth'
//==============================================================================


export default function Signin() {
    var authContext = useContext(AuthContext)
    var _router = useRouter();
    var [message, setMessage] = useState(null);
    var [activateError, setActivateError] = useState(false);
    var [signinMutation] = useMutation(signinMutationString);
    var [mutation, states, contexts, router] = [
        signinMutation,
        {
            message: {
                getter: message,
                setter: setMessage
            },
            activateError: {
                getter: activateError,
                setter: setActivateError
            }
        },
        {
            authContext: authContext
        },
        {
            hook: _router,
            path: '/account'
        }
    ]

    let formik = signinFormik(mutation, states, contexts, router)

    return (
        <ClientLayout>
            <div className='
            container m-auto md:flex justify-center
            '>
                {
                    (() => {
                        if (activateError) {
                            return (
                                <ErrorModalDialog message={message}
                                                  activate={true}/>
                            )
                        } else {
                            return null
                        }
                    })()
                }
                <form className='form-dark m-auto'
                      onSubmit={formik.handleSubmit}>
                    <div className="
                    text-center py-5
                    text-white text-2xl
                    font-semibold">
                        Iniciar sesión
                    </div>
                    <div className="mb-4">
                        <input
                            id={userFields.email.value}
                            type="email"
                            placeholder={userFields.email.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {FieldError(formik, 'email')}
                    </div>
                    <div>
                        <input
                            id={userFields.password.value}
                            type={userFields.password.type}
                            placeholder={userFields.password.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {FieldError(formik, 'password')}
                    </div>
                    {activateError &&
                    <div className='message-error'>{message}</div>}
                    <div className="grid grid-cols-1 divide-y divide-white">
                        <div className="flex justify-center py-4">
                            <input
                                type="submit"
                                className="button-red text-2xl"
                                value={authButtons.signin.text}
                            />
                        </div>
                        <Link href="/signup">
                            <a className="
                            flex justify-center py-2 px-5 mt-5
                            underline
                            inline-block text-white">
                                {authButtons.createAccount.text}
                            </a>
                        </Link>
                    </div>
                    <Link href="/resetPassword">
                        <a className="
                        text-pale text-xs text-simp
                        flex justify-center
                        ">
                            {authButtons.restorePassword.text}
                        </a>
                    </Link>
                </form>
                <div>
                </div>
            </div>
        </ClientLayout>
    )
}

