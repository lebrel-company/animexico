import React, {useState} from 'react'
import {useMutation} from '@apollo/client';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {fields} from '../../utils/formsHelpers'
import {signinFormik} from '../../controllers/signin/signin.formik'
import {signinMutationString} from '../../controllers/signin/signin.mutation'
import ClientLayout from "../../layout/Client";
//==============================================================================


export default function Signin() {
    let _router = useRouter();
    let [message, setMessage] = useState(null);
    let [signinMutation] = useMutation(signinMutationString);
    let {mutation, states, router} = [
        signinMutation,
        {
            message: {
                state: message,
                setter: setMessage
            }
        },
        {
            hook: _router, path: '/'
        }
    ]
    let formik = signinFormik(mutation, states, router)

    return (
        <ClientLayout>
            <div className='container m-auto md:flex justify-center'>
                {message && showMessage()}
                <form className='form-dark' onSubmit={formik.handleSubmit}>
                    <h1 className="text-center py-5 text-white text-2xl font-semibold">Iniciar
                        Sesión</h1>
                    <div className="mb-4">
                        <input
                            className="bg-gray-500 rounded-sm w-full"
                            id={fields.email.id}
                            type="email"
                            placeholder={fields.password.placeholder}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
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
                    </div>

                    <div>
                        <Link href="/resetPassword">
                            <a className="flex justify-end inline-block text-xs">Restaurar
                                Contraseña</a>
                        </Link>
                    </div>


                    {formik.touched.password && formik.errors.password ? (
                        <div
                            className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.password}</p>
                        </div>
                    ) : null}

                    <div className="grid grid-cols-1 divide-y divide-white">
                        <div className="flex justify-center">
                            <input
                                type="submit"
                                className="
                                    bg-red-600 py-2 px-10
                                    rounded-sm shadow-md mt-5 p-2
                                    button-red
                                    uppercase hover:bg-red-500"
                                value="Login"

                            />
                        </div>
                        <Link href="/signup">
                            <a className="flex justify-center py-2 px-5 mt-5 inline-block text-white">Crear
                                Cuenta</a>
                        </Link>
                    </div>
                </form>
            </div>
        </ClientLayout>
    )
}

