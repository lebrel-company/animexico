'use strict';
// libraries:
import React, {useState, useContext} from 'react'
import {useLazyQuery} from '@apollo/client';
import Link from 'next/link';
import {useRouter} from 'next/router';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from '../../context/AuthContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from '../../layout/Client';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import FieldError from '../messages/FieldError';
import ErrorModalDialog from '../modal/ErrorModalDialog'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {userFields} from '../../utils/fields/user'
import loginFormik from './login.formik'
import LOGIN from './login.query.gql'
import {mapOfRoutes} from '../../utils/routes';
import Loading from '../loading';
import {appendWarningMessage} from '../../utils/formUtils';

var pp = (el) => console.log(el)
//==============================================================================


export default function Login() {
    var authContext = useContext(AuthContext)
    var _router = useRouter();
    var [message, setMessage] = useState(null);
    var [activateMessage, setActivateMessage] = useState(false);
    var [query, {loading, data}] = useLazyQuery(LOGIN)

    var [graphql, states, contexts, router] = [
        {
            query: query,
            data: data
        },
        {
            message: {
                getter: message,
                setter: setMessage
            },
            activateMessage: {
                getter: activateMessage,
                setter: setActivateMessage
            }
        },
        {
            authContext: authContext
        },
        {
            hook: _router,
            path: mapOfRoutes.profile.route
        }
    ]

    let formik = loginFormik(graphql, states, contexts, router)

    return (
        loading ? <Loading/> :
            <ClientLayout pattern={`bg-temple`}>
                {/*{console.log(data)}*/}
                <div className="container m-auto md:flex justify-center">
                    <form className="form-dark m-auto"
                          onSubmit={formik.handleSubmit}>
                        <div className="
                            text-center py-5 text-white
                            text-2xl font-semibold"
                        >
                            Iniciar sesión
                        </div>
                        <div className="mb-4">
                            <input
                                id={userFields.email.value}
                                type={userFields.email.type}
                                placeholder={userFields.email.placeholder}
                                name={userFields.email.value}
                                value={formik.values[userFields.email.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                appendWarningMessage(
                                    formik, userFields.email.value
                                )
                            }
                        </div>
                        <div>
                            <input
                                id={userFields.password.value}
                                type={userFields.password.type}
                                placeholder={userFields.password.placeholder}
                                name={userFields.password.value}
                                value={formik.values[userFields.password.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                appendWarningMessage(
                                    formik, userFields.password.value
                                )
                            }
                        </div>
                        {
                            activateMessage &&
                            <div
                                className={
                                    data.login.status === 'success' ?
                                        'message-success' : 'message-error'
                                }
                            >{message}</div>
                        }
                        <div className="grid grid-cols-1 divide-y divide-white">
                            <div className="flex justify-center py-4">
                                <input
                                    type="submit"
                                    className="button-red text-2xl"
                                    value={mapOfRoutes.login.text}
                                />
                            </div>
                            <Link href={mapOfRoutes.signup.route}>
                                <a className="
                            flex justify-center py-2 px-5 mt-5
                            underline
                            inline-block text-white">
                                    {mapOfRoutes.signup.text}
                                </a>
                            </Link>
                        </div>
                        <Link href={mapOfRoutes.restorePassword.route}>
                            <a className="
                        text-pale text-xs text-simp
                        flex justify-center
                        ">
                                {mapOfRoutes.restorePassword.text}
                            </a>
                        </Link>
                    </form>
                    <div>
                    </div>
                </div>
            </ClientLayout>
    )
}

