'use strict';
// libraries
import {v4 as uuidv4} from 'uuid'
import React, {useContext} from 'react';
import {useMutation} from '@apollo/client';
import {useRouter} from 'next/router'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// contexts
import {AuthContext} from '../../context/AuthContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts
import ClientLayout from '../../layout/Client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project
import {signupFormik} from '../../controllers/signup/signup.formik';
import signupMutationString from '../../controllers/signup/signup.mutation.gql';
import {userFields} from '../../utils/fields/user'
import {formTexts, spanishButtons} from '../../utils/texts/signup.texts';
import {listOfStates} from '../../utils/location/mexico';
//==============================================================================


export default function SignupForm(props) {
    var authContext = useContext(AuthContext)
    var _router = useRouter();
    var [signupMutation] = useMutation(signupMutationString);
    var [mutation, states, contexts, router] = [
        signupMutation,
        {},
        {authContext: authContext},
        {hook: _router, path: '/profile'},
    ]

    var formik = signupFormik(mutation, states, contexts, router);


    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
    return (
        <ClientLayout pattern={`bg-temple`}>
            <div className="
            md:flex justify-center w-screen
            ">
                <form className="form-dark my-auto container md:w-1/2"
                      onSubmit={formik.handleSubmit}>
                    <div className="text-pale text-5xl font-deco my-6">
                        {formTexts.header.text}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <input
                                id={userFields.firstName.value}
                                type={userFields.firstName.type}
                                placeholder={userFields.firstName.placeholder}
                                name={userFields.firstName.value}
                                value={formik.values[userFields.firstName.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.firstName.value)}
                        </div>
                        <div>
                            <input
                                id={userFields.middleName.value}
                                type={userFields.middleName.type}
                                placeholder={userFields.middleName.placeholder}
                                name={userFields.middleName.value}
                                value={formik.values[userFields.middleName.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.middleName.value)}

                        </div>
                        <div>
                            <input
                                id={userFields.lastName.value}
                                type={userFields.lastName.type}
                                placeholder={userFields.lastName.placeholder}
                                name={userFields.lastName.value}
                                value={formik.values[userFields.lastName.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.lastName.value)}
                        </div>
                        <div>
                            <input
                                id={userFields.secondLastName.value}
                                type={userFields.secondLastName.type}
                                placeholder={userFields.secondLastName.placeholder}
                                name={userFields.secondLastName.value}
                                value={formik.values[userFields.secondLastName.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.secondLastName.value)}
                        </div>
                        <div>
                            <input
                                id={userFields.birthday.value}
                                type={userFields.birthday.type}
                                placeholder={userFields.birthday.placeholder}
                                name={userFields.birthday.value}
                                value={formik.values[userFields.birthday.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.birthday.value)}
                        </div>
                        <div>
                            <input
                                id={userFields.cellphone.value}
                                type={userFields.cellphone.type}
                                placeholder={userFields.cellphone.placeholder}
                                name={userFields.cellphone.value}
                                value={formik.values[userFields.cellphone.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.cellphone.value)}
                        </div>
                    </div>
                    <div className="w-5/6 mx-auto">
                        <div
                            className="border-pale border-2 rounded-md p-2 m-2 border-opacity-50">
                            <div className="m-2">
                                <input
                                    id={userFields.email.value}
                                    type={userFields.email.type}
                                    placeholder={userFields.email.placeholder}
                                    name={userFields.email.value}
                                    value={formik.values[userFields.email.value]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {appendWarningMessage(formik, userFields.email.value)}
                            </div>
                            <div className="m-2">
                                <input
                                    id={userFields.emailConfirm.value}
                                    type={userFields.emailConfirm.type}
                                    placeholder={userFields.emailConfirm.placeholder}
                                    name={userFields.emailConfirm.value}
                                    value={formik.values[userFields.emailConfirm.value]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {appendWarningMessage(formik, userFields.emailConfirm.value)}
                            </div>
                        </div>
                        <div>
                            <div
                                className="border-pale border-2 rounded-md p-2 m-2 border-opacity-50">
                                <div className="m-2">
                                    <input
                                        id={userFields.password.value}
                                        type={userFields.password.type}
                                        placeholder={userFields.password.placeholder}
                                        name={userFields.password.value}
                                        value={formik.values[userFields.password.value]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {appendWarningMessage(formik, userFields.password.value)}
                                </div>
                                <div className="m-2">
                                    <input
                                        id={userFields.passwordConfirm.value}
                                        type={userFields.passwordConfirm.type}
                                        placeholder={userFields.passwordConfirm.placeholder}
                                        name={userFields.passwordConfirm.value}
                                        value={formik.values[userFields.passwordConfirm.value]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {appendWarningMessage(formik, userFields.passwordConfirm.value)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <input
                                placeholder="México"
                                disabled={true}
                            />
                        </div>
                        <div>
                            <select
                                id={userFields.address.state.value}
                                type={userFields.address.state.type}
                                placeholder={userFields.address.state.placeholder}
                                name={userFields.address.state.value}
                                value={formik.values[userFields.address.state.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {
                                    listOfStates.map(function (element) {
                                        return (
                                            <option value={element}>
                                                {element}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            {appendWarningMessage(formik, userFields.address.state.value)}
                        </div>
                        <div>
                            <input
                                id={userFields.address.city.value}
                                type={userFields.address.city.type}
                                placeholder={userFields.address.city.placeholder}
                                name={userFields.address.city.value}
                                value={formik.values[userFields.address.city.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.address.city.value)}
                        </div>
                        <div>
                            <input
                                id={userFields.address.neighbourhood.value}
                                type={userFields.address.neighbourhood.type}
                                placeholder={userFields.address.neighbourhood.placeholder}
                                name={userFields.address.neighbourhood.value}
                                value={formik.values[userFields.address.neighbourhood.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.address.neighbourhood.value)}
                        </div>
                        <div>

                            <input
                                id={userFields.address.street.value}
                                type={userFields.address.street.type}
                                placeholder={userFields.address.street.placeholder}
                                name={userFields.address.street.value}
                                value={formik.values[userFields.address.street.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                appendWarningMessage(
                                    formik,
                                    userFields.address.street.value)
                            }
                        </div>
                        <div>
                            <input
                                id={userFields.address.zipcode.value}
                                type={userFields.address.zipcode.type}
                                placeholder={userFields.address.zipcode.placeholder}
                                name={userFields.address.zipcode.value}
                                value={
                                    formik.values[
                                        userFields.address.zipcode.value
                                        ]
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.address.zipcode.value)}
                        </div>
                        <div>
                            <input
                                id={userFields.address.buildingNumber.value}
                                type={userFields.address.buildingNumber.type}
                                placeholder={userFields.address.buildingNumber.placeholder}
                                name={userFields.address.buildingNumber.value}
                                value={formik.values[userFields.address.buildingNumber.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.address.buildingNumber.value)}
                        </div>
                        <div>
                            <input
                                id={userFields.address.apartmentNumber.value}
                                type={userFields.address.apartmentNumber.type}
                                placeholder={userFields.address.apartmentNumber.placeholder}
                                name={userFields.address.apartmentNumber.value}
                                value={formik.values[userFields.address.apartmentNumber.value]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {appendWarningMessage(formik, userFields.address.apartmentNumber.value)}
                        </div>
                    </div>
                    <div className="flex mt-4 justify-center">
                        <button className="button-red text-3xl" type="submit">
                            {spanishButtons.submit.text}
                        </button>
                    </div>
                </form>
            </div>
        </ClientLayout>
    )
}

function appendWarningMessage(formik, value) {
    return (
        <div className="text-sm text-palered">
            {
                function () {
                    return (
                        formik.touched[value] && formik.errors[value] ? (
                            <div className="text-red-400">
                                {formik.errors[value]}
                            </div>
                        ) : null
                    )
                }()
            }
        </div>
    )
}
