// libraries
import {v4 as uuidv4} from 'uuid'
import React, {useState, useContext} from 'react';
import {useMutation} from "@apollo/client";
import {useRouter} from 'next/router'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// contexts
import {AuthContext} from "../../context/AuthContext";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts
import ClientLayout from '../../layout/Client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components
import FieldError from '../../components/messages/FieldError'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project
import {signupFormik} from '../../controllers/signup/signup.formik';
import signupMutationString from '../../controllers/signup/signup.mutation.gql';
import {userFields} from '../../utils/fields/user'
import {authButtons} from "../../utils/buttons/auth";
import {formTexts, spanishButtons} from "../../utils/texts/signup.texts";
//==============================================================================


export default function SignupForm(props) {
    var authContext = useContext(AuthContext)
    var _router = useRouter();
    var [signupMutation] = useMutation(signupMutationString);
    var [mutation, states, contexts, router] = [
        signupMutation,
        {},
        {authContext: authContext},
        {hook: _router, path: '/account'}
    ]

    var formik = signupFormik(mutation, states, contexts, router);

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
    return (
        <ClientLayout>
            <div className='
            md:flex justify-center
            '>
                <form className='form-dark my-auto'
                      onSubmit={formik.handleSubmit}>
                    <div className='text-pale text-5xl font-deco my-6'>
                        {formTexts.header.text}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            id={userFields.firstName.value}
                            type={userFields.firstName.type}
                            placeholder={userFields.firstName.name}
                            name={userFields.firstName.value}
                            value={formik[userFields.firstName.value]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {appendWarningMessage(formik, userFields.firstName.id)}
                        <input
                            id={userFields.middleName.value}
                            type={userFields.middleName.type}
                            placeholder={userFields.middleName.name}
                            name={userFields.middleName.value}
                            value={formik[userFields.middleName.value]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {appendWarningMessage(formik, userFields.middleName.id)}
                        <input
                            id={userFields.lastName.value}
                            type={userFields.lastName.type}
                            placeholder={userFields.lastName.name}
                            name={userFields.lastName.value}
                            value={formik[userFields.lastName.value]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {appendWarningMessage(formik, userFields.lastName.id)}
                        <input
                            id={userFields.secondLastName.value}
                            type={userFields.secondLastName.type}
                            placeholder={userFields.secondLastName.name}
                            name={userFields.secondLastName.value}
                            value={formik[userFields.secondLastName.value]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className='w-5/6 mx-auto'>
                        <div
                            className='border-pale border-2 rounded-md p-2 m-2 border-opacity-50'>
                            <div className='m-2'>
                                <input
                                    id={userFields.email.value}
                                    type={userFields.email.type}
                                    placeholder={userFields.email.name}
                                    name={userFields.email.value}
                                    value={formik[userFields.email.value]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className='m-2'>
                                <input
                                    id={userFields.emailConfirm.value}
                                    type={userFields.emailConfirm.type}
                                    placeholder={userFields.emailConfirm.name}
                                    name={userFields.emailConfirm.value}
                                    value={formik[userFields.emailConfirm.value]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                        </div>
                        <div>
                            <div
                                className='border-pale border-2 rounded-md p-2 m-2 border-opacity-50'>
                                <div className='m-2'>
                                    <input
                                        id={userFields.password.value}
                                        type={userFields.password.type}
                                        placeholder={userFields.password.name}
                                        name={userFields.password.value}
                                        value={formik[userFields.password.value]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className='m-2'>
                                    <input
                                        id={userFields.passwordConfirm.value}
                                        type={userFields.passwordConfirm.type}
                                        placeholder={userFields.passwordConfirm.name}
                                        name={userFields.passwordConfirm.value}
                                        value={formik[userFields.passwordConfirm.value]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            id={userFields.country.value}
                            type={userFields.country.type}
                            placeholder={userFields.country.name}
                            name={userFields.country.value}
                            value={formik[userFields.country.value]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <input
                            id={userFields.state.value}
                            type={userFields.state.type}
                            placeholder={userFields.middleName.name}
                            name={userFields.state.value}
                            value={formik[userFields.state.value]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <input
                            id={userFields.city.value}
                            type={userFields.city.type}
                            placeholder={userFields.city.name}
                            name={userFields.city.value}
                            value={formik[userFields.city.value]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <input
                            id={userFields.neighbourhood.value}
                            type={userFields.neighbourhood.type}
                            placeholder={userFields.neighbourhood.name}
                            name={userFields.neighbourhood.value}
                            value={formik[userFields.neighbourhood.value]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <input
                            id={userFields.street.value}
                            type={userFields.street.type}
                            placeholder={userFields.street.name}
                            name={userFields.street.value}
                            value={formik[userFields.buildingNumber.value]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <input
                            id={userFields.zipcode.value}
                            type={userFields.zipcode.type}
                            placeholder={userFields.zipcode.name}
                            name={userFields.zipcode.value}
                            value={formik[userFields.zipcode.value]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="flex mt-4 justify-center">
                        <button className='button-red text-3xl' type="submit">
                            {spanishButtons.submit.text}
                        </button>
                    </div>
                </form>
            </div>
            }
        </ClientLayout>
    )
}

