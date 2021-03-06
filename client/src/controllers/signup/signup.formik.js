import {fields} from "../../utils/formsHelpers";
import {useFormik} from "formik";
import * as Yup from "yup";
import {spanishValidationHelpers} from '../../utils/validationHelpers'

export function signupFormik(mutation, route) {
    return useFormik({
            initialValues: {
                firstName: '',
                middleName: '',
                lastName: '',
                secondLastName: '',
                email: '',
                password: '',
                birthday: '',
                cellphone: '',
                address: {
                    city: '',
                    state: '',
                    country: '',
                    zipcode: '',
                    neighbourhood: '',
                    street: '',
                    buildingNumber: '',
                    apartmentNumber: '',
                }
            },
            validationSchema: Yup.object({
                firstName: Yup.string()
                    .required(
                        spanishValidationHelpers
                            .messages
                            .errors
                            .formatRequiredField(fields.firstName.placeholder)
                    ),
                lastName: Yup.string()
                    .required(
                        spanishValidationHelpers
                            .messages
                            .errors
                            .formatRequiredField(fields.lastName.placeholder)
                    ),
                secondLastName: Yup.string()
                    .required(
                        spanishValidationHelpers
                            .messages
                            .errors
                            .formatRequiredField(fields.secondLastName.placeholder)
                    ),
                email: Yup.string()
                    .required(
                        spanishValidationHelpers
                            .messages
                            .errors
                            .formatRequiredField(fields.email.placeholder)
                    )
                    .email('El correo no es válido'),
                password: Yup.string()
                    .required(
                        spanishValidationHelpers
                            .messages
                            .errors
                            .formatRequiredField(fields.password.placeholder)
                    ),
                passwordConfirmation: Yup.string()
                    .required(
                        spanishValidationHelpers
                            .messages
                            .errors
                            .formatRequiredField(fields.passwordConfirmation.placeholder)
                    ),
                birthday: Yup.string()
                    .required(
                        spanishValidationHelpers
                            .messages
                            .errors
                            .formatRequiredField(fields.birthday.placeholder)
                    ),
                cellphone:
                    Yup.string()
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(fields.cellphone.placeholder)
                        ),
                address: Yup.object({
                    country: Yup.string()
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(fields.address.country.placeholder)
                        ),
                    city: Yup.string()
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(fields.address.city.placeholder)
                        ),
                    state: Yup.string()
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(fields.address.state.placeholder)
                        ),
                    zipcode: Yup.number()
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(fields.address.zipcode.placeholder)
                        ),
                    neighbourhood: Yup.string()
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(fields.address.neighbourhood.placeholder)
                        ),
                    street: Yup.string()
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(fields.address.street.placeholder)
                        ),
                    buildingNumber: Yup.string()
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(fields.address.buildingNumber.placeholder)
                        ),
                    apartmentNumber: Yup.string()
                        .required(
                            spanishValidationHelpers
                                .messages
                                .errors
                                .formatRequiredField(fields.address.apartmentNumber.placeholder)
                        ),
                })
            }),
            onSubmit: async function submitForm(values) {
                let _input = {
                    firstName: values.firstName,
                    middleName: values.middleName,
                    lastName: values.lastName,
                    secondLastName: values.secondLastName,
                    email: values.email,
                    password: values.password,
                    birthday: values.birthday,
                    cellphone: values.cellphone,
                    role: 'MEMBER',
                    mapOfAddresses: {
                        primary: {
                            city: values.address.city,
                            state: values.address.state,
                            country: values.address.country,
                            zipcode: values.address.zipcode,
                            neighbourhood: values.address.neighbourhood,
                            street: values.address.street,
                            buildingNumber: values.address.buildingNumber,
                            apartmentNumber: values.address.apartmentNumber
                        }
                    }
                }
                try {
                    let {data} = await mutation({
                        variables: {
                            input: _input
                        }
                    });
                    route.hook.push(route.path)
                } catch (error) {
                    console.log(error)
                }
            },
        }
    );
}
