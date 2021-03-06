import React from 'react';
import {useMutation} from "@apollo/client";
import {signupMutationString} from '../../controllers/signup/signup.mutation';
import {signupFormik} from '../../controllers/signup/signup.formik';
import {fields} from '../../utils/formsHelpers'
import {useRouter} from 'next/router'
import ClientLayout from '../../layout/Client'


function SignupForm(props) {
    const [signup] = useMutation(signupMutationString);
    const formik = signupFormik(signup, {hook: useRouter, path: '/'});
    return (
        <ClientLayout>
            <div className='container m-auto md:flex justify-center'>
                <form className='form-dark' onSubmit={formik.handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <input
                                id={fields.firstName.id}
                                name={fields.firstName.id}
                                type="text"
                                placeholder={fields.firstName.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                            />
                            {appendWarningMessage(formik, fields.firstName.id)}
                        </div>
                        <div>
                            <input
                                id={fields.middleName.id}
                                name={fields.middleName.id}
                                type="text"
                                placeholder={fields.middleName.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.middleName}
                            />
                            {appendWarningMessage(formik, fields.middleName.id)}
                        </div>
                        <div>
                            <input
                                id={fields.lastName.id}
                                name={fields.lastName.id}
                                type="text"
                                placeholder={fields.lastName.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                            />
                            {appendWarningMessage(formik, fields.lastName.id)}
                        </div>
                        <div>
                            <input
                                id={fields.secondLastName.id}
                                name={fields.secondLastName.id}
                                type="text"
                                placeholder={fields.secondLastName.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.secondLastName}
                            />
                            {appendWarningMessage(formik, fields.secondLastName.id)}
                        </div>
                        <div>
                            <input
                                id={fields.birthday.id}
                                name={fields.birthday.id}
                                type="date"
                                placeholder={fields.birthday.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.birthday}
                            />
                            {appendWarningMessage(formik, fields.birthday.id)}
                        </div>
                        <div>
                            <input
                                id={fields.cellphone.id}
                                name={fields.cellphone.id}
                                type="text"
                                placeholder={fields.cellphone.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cellphone}
                            />
                            {appendWarningMessage(formik, fields.cellphone.id)}
                        </div>
                    </div>

                    <div>
                        <input
                            id={fields.email.id}
                            name={fields.email.id}
                            type="email"
                            placeholder={fields.email.placeholder}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {appendWarningMessage(formik, fields.email.id)}
                    </div>

                    <div className='
                        my-4 border-2
                        border-pale rounded-lg
                        p-4
                        border-opacity-20'>
                        <input
                            id={fields.password.id}
                            name={fields.password.id}
                            type="password"
                            placeholder={fields.password.placeholder}
                            autoComplete='on'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {appendWarningMessage(formik, fields.password.id)}
                        <input
                            id={fields.passwordConfirmation.id}
                            name={fields.passwordConfirmation.id}
                            type="password"
                            placeholder={fields.passwordConfirmation.placeholder}
                            autoComplete='on'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirmation}
                        />
                        {appendWarningMessage(formik, fields.passwordConfirmation.id)}
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                        <div>
                            <input
                                id={fields.address.city.id}
                                name={fields.address.city.id}
                                type="text"
                                placeholder={fields.address.city.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.city}
                            />
                            {appendWarningMessage(formik, fields.address.city.id)}
                        </div>
                        <div>
                            <input
                                id={fields.address.state.id}
                                name={fields.address.state.id}
                                type="text"
                                placeholder={fields.address.state.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.state}
                            />
                            {appendWarningMessage(formik, fields.address.state.id)}
                        </div>
                        <div>
                            <input
                                id={fields.address.country.id}
                                name={fields.address.country.id}
                                type="text"
                                placeholder={fields.address.country.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.country}
                            />
                            {appendWarningMessage(formik, fields.address.country.id)}
                        </div>
                        <div>
                            <input
                                id={fields.address.zipcode.id}
                                name={fields.address.zipcode.id}
                                type="number"
                                placeholder={fields.address.zipcode.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.zipcode}
                            />
                            {appendWarningMessage(formik, fields.address.zipcode.id)}
                        </div>
                        <div>
                            <input
                                id={fields.address.neighbourhood.id}
                                name={fields.address.neighbourhood.id}
                                type="text"
                                placeholder={fields.address.neighbourhood.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.neighbourhood}
                            />
                            {appendWarningMessage(formik, fields.address.neighbourhood.id)}
                        </div>
                        <div>
                            <input
                                id={fields.address.street.id}
                                name={fields.address.street.id}
                                type="text"
                                placeholder={fields.address.street.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.street}
                            />
                            {appendWarningMessage(formik, fields.address.street.id)}
                        </div>
                        <div>
                            <input
                                id={fields.address.buildingNumber.id}
                                name={fields.address.buildingNumber.id}
                                type="text"
                                placeholder={fields.address.buildingNumber.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.buildingNumber}
                            />
                            {appendWarningMessage(formik, fields.address.buildingNumber.id)}
                        </div>
                        <div>
                            <input
                                id={fields.address.apartmentNumber.id}
                                name={fields.address.apartmentNumber.id}
                                type="text"
                                placeholder={fields.address.apartmentNumber.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.apartmentNumber}
                            />
                            {appendWarningMessage(formik, fields.address.apartmentNumber.id)}
                        </div>
                    </div>
                    <div className="flex mt-4 justify-center">
                        <button
                            className='button-red p-2 text-2xl'
                            type="submit"
                            id={fields.submit.id}>{fields.submit.value}
                        </button>
                    </div>
                </form>
            </div>
        </ClientLayout>
    )
}

function appendWarningMessage(formik, value) {
    if (value.includes('address')) {
        let _value = value.split('.')[1]
        if (!('address' in (formik.touched))) {
            return null
        }
        if (!('address' in (formik.errors))) {
            return null
        }


        return (
            <div className='text-sm'>
                {
                    function () {
                        if (!(_value in formik.touched.address)) {
                            return null
                        }
                        return (
                            formik.touched.address[_value] &&
                            formik.errors.address[_value] ? (
                                <div className='text-palered'>
                                    {formik.errors.address[_value]}
                                </div>
                            ) : null
                        )
                    }()
                }
            </div>
        )
    } else {
        return (
            <div className='text-sm'>
                {
                    function () {
                        return (
                            formik.touched[value] && formik.errors[value] ? (
                                <div className='text-palered'>
                                    {formik.errors[value]}
                                </div>
                            ) : null
                        )
                    }()
                }
            </div>
        )
    }
}


export default SignupForm;