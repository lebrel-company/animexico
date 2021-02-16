import React from 'react';
import {fields, validationsTexts} from './_texts'
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMutation} from "@apollo/client";
import {createNewUserMutation} from "./_mutation";

function SignupForm(props) {
    const [createNewUser] = useMutation(createNewUserMutation)
    const formik = useFormik({
        initialValues: {
            name: '',
            middleName: '',
            lastname: '',
            secondLastname: '',
            email: '',
            password: '',
            birthday: '',
            cellphone: '',
            address: {
                city: '',
                state: '',
                country: '',
                zipcode: '',
                suburb: '',
                street: '',
                buildingNumber: '',
                apartmentNumber: '',
            }
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required(),
            lastname: Yup.string()
                .required(validationsTexts.requiredField),
            secondLastname: Yup.string()
                .required(validationsTexts.requiredField),
            email: Yup.string()
                .email('El correo no es valido')
                .required(validationsTexts.requiredField),
            password: Yup.string()
                .required(validationsTexts.requiredField),
            birthday: Yup.string()
                .required(validationsTexts.requiredField),
            cellphone:
                Yup.string()
                    .required(validationsTexts.requiredField),
            address: Yup.object({
                country: Yup.string().required(validationsTexts.requiredField),
                city: Yup.string().required(validationsTexts.requiredField),
                state: Yup.string().required(validationsTexts.requiredField),
                zipcode: Yup.number().required(validationsTexts.requiredField),
                suburb: Yup.string().required(validationsTexts.requiredField),
                street: Yup.string().required(validationsTexts.requiredField),
                buildingNumber: Yup.string().required(validationsTexts.requiredField),
                apartmentNumber: Yup.string()
            })
        }),
        onSubmit: async function submitForm(values) {
            let _input = {
                name: values.name,
                middleName: values.middleName,
                lastname: values.lastname,
                secondLastname: values.secondLastname,
                email: values.email,
                password: values.password,
                birthday: values.birthday,
                cellphone: values.cellphone,
                address: {
                    city: values.address.city,
                    state: values.address.state,
                    country: values.address.country,
                    zipcode: values.address.zipcode,
                    suburb: values.address.suburb,
                    street: values.address.street,
                    buildingNumber: values.address.buildingNumber,
                    apartmentNumber: values.address.apartmentNumber
                }
            }

            try {
                let {data} = await createNewUser({
                    variables: {
                        input:_input
                    }
                });
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    id={fields.name.id}
                    name={fields.name.id}
                    type="text"
                    placeholder={fields.name.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
            </div>
            {formik.touched.name && formik.errors.name ? (
                <div>
                    <p>{formik.errors.name}</p>
                </div>
            ) : null}

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
            </div>

            <div>
                <input
                    id={fields.lastname.id}
                    name={fields.lastname.id}
                    type="text"
                    placeholder={fields.lastname.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                />
            </div>

            {formik.touched.lastName && formik.errors.lastname ? (
                <div>
                    <p>{formik.errors.lastname}</p>
                </div>
            ) : null}

            <div>
                <input
                    id={fields.secondLastname.id}
                    name={fields.secondLastname.id}
                    type="text"
                    placeholder={fields.secondLastname.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.secondLastname}
                />
            </div>
            {formik.touched.secondLastname && formik.errors.secondLastname ? (
                <div>
                    <p>{formik.errors.secondLastname}</p>
                </div>
            ) : null}

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
            </div>
            {formik.touched.email && formik.errors.email ? (
                <div>
                    <p>{formik.errors.email}</p>
                </div>
            ) : null}

            <div>
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
            </div>

            {formik.touched.password && formik.errors.password ? (
                <div>
                    <p>{formik.errors.password}</p>
                </div>
            ) : null}

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
            </div>
            {formik.touched.birthday && formik.errors.birthday ? (
                <div>
                    <p>{formik.errors.birthday}</p>
                </div>
            ) : null}
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
            </div>
            {formik.touched.cellphone && formik.errors.cellphone ? (
                <div>
                    <p>{formik.errors.cellphone}</p>
                </div>
            ) : null}
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
            </div>
            {formik.touched.city && formik.errors.city ? (
                <div>
                    <p>{formik.errors.city}</p>
                </div>
            ) : null}
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
            </div>
            <div>
                <input
                    id={fields.address.suburb.id}
                    name={fields.address.suburb.id}
                    type="text"
                    placeholder={fields.address.suburb.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address.suburb}
                />
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
            </div>
            <button type="submit" id={fields.submit.id}>{fields.submit.value}</button>
        </form>
    );
};

export default SignupForm;