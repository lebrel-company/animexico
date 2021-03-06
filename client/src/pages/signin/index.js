// libraries:
import React, {useState} from 'react'
import {useMutation} from '@apollo/client';
import Link from 'next/link';
import {useRouter} from 'next/router';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from "../../layout/Client";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import FieldError from "../../components/messages/FieldError";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {fields} from '../../utils/formsHelpers'
import {signinFormik} from '../../controllers/signin/signin.formik'
import {signinMutationString} from '../../controllers/signin/signin.mutation'
import buttons from '../../utils/buttons.text'
//==============================================================================


export default function Signin() {
    let _router = useRouter();
    let [message, setMessage] = useState(null);
    let [signinMutation] = useMutation(signinMutationString);
    let [mutation, states, router] = [
        signinMutation,
        {
            message: {
                getter: message,
                setter: setMessage
            }
        },
        {
            hook: _router,
            path: '/'
        }
    ]
    let formik = signinFormik(mutation, states, router)

    return (
        <ClientLayout label='signin'>
            <div className='
            min-h-screen
            container m-auto md:flex justify-center
            '>
                {message && showMessage()}
                <form className='form-dark m-auto' onSubmit={formik.handleSubmit}>
                    <h1 className="text-center py-5 text-white text-2xl font-semibold">Iniciar
                        Sesión</h1>
                    <div className="mb-4">
                        <input
                            className="bg-gray-500 rounded-sm w-full"
                            id={fields.email.id}
                            type="email"
                            placeholder={fields.email.placeholder}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {FieldError(formik, 'email')}
                    </div>
                    <div>
                        <input
                            className="bg-gray-500 rounded-sm w-full"
                            id="password"
                            type="password"
                            placeholder="Password Usuario"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {FieldError(formik, 'password')}
                    </div>
                    <div className="grid grid-cols-1 divide-y divide-white">
                        <div className="flex justify-center">
                            <input
                                type="submit"
                                className="
                                    bg-red-600 py-2 px-10
                                    rounded-sm shadow-md mt-5 p-2
                                    button-red
                                    uppercase hover:bg-red-500"
                                value={buttons.signin.text}
                            />
                        </div>
                        <Link href="/signup">
                            <a className="
                            flex justify-center py-2 px-5 mt-5
                            underline
                            inline-block text-white">
                                {buttons.createAccount.text}
                            </a>
                        </Link>
                    </div>
                    <Link href="/resetPassword">
                        <a className="
                        text-pale text-xs text-simp
                        flex justify-center
                        ">
                            {buttons.restorePassword.text}
                        </a>
                    </Link>
                </form>
                <div>
                </div>
            </div>
        </ClientLayout>
    )
}

