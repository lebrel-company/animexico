'use strict';
// libraries:
import {useFormik} from "formik";
import * as Yup from "yup";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {userFields} from "../../utils/fields/user";

//==============================================================================


export function signupFormik(mutation, states, contexts, route) {
    function requiredMessage(field_name) {
        return `${field_name} es requerido`
    }

    return useFormik({
            initialValues: {
                firstName: '',
                middleName: '',
                lastName: '',
                secondLastName: '',
                birthday: '',
                cellphone: '',
                email: '',
                emailConfirm: '',
                password: '',
                passwordConfirm: '',
                state: '',
                city: '',
                neighbourhood: '',
                street: '',
                zipcode: '',
                buildingNumber: '',
                apartmentNumber: ''
            },
            validationSchema: Yup.object({
                firstName:
                    Yup.string()
                        .required(requiredMessage(userFields.firstName.placeholder)),
                lastName:
                    Yup.string()
                        .required(requiredMessage(userFields.lastName.placeholder)),
                secondLastName:
                    Yup.string()
                        .required(requiredMessage(userFields.secondLastName.placeholder)),
                email:
                    Yup.string()
                        .required(requiredMessage(userFields.email.placeholder))
                        .email('El correo no es válido'),
                emailConfirm:
                    Yup.string()
                        .required(requiredMessage(userFields.emailConfirm.placeholder))
                        .email('El correo no es válido'),
                password:
                    Yup.string()
                        .required(requiredMessage(userFields.password.placeholder)),
                passwordConfirm:
                    Yup.string()
                        .required(requiredMessage(userFields.passwordConfirm.placeholder)),
                birthday:
                    Yup.string()
                        .required(requiredMessage(userFields.birthday.placeholder)),
                cellphone:
                    Yup.string()
                        .required(requiredMessage(userFields.cellphone.placeholder)),
                city:
                    Yup.string()
                        .required(requiredMessage(userFields.address.city.placeholder)),
                state:
                    Yup.string()
                        .required(requiredMessage(userFields.address.state.placeholder)),
                zipcode:
                    Yup.number()
                        .required(requiredMessage(userFields.address.zipcode.placeholder)),
                neighbourhood:
                    Yup.string()
                        .required(requiredMessage(userFields.address.neighbourhood.placeholder)),
                street:
                    Yup.string()
                        .required(requiredMessage(userFields.address.street.placeholder)),
                buildingNumber:
                    Yup.string()
                        .required(requiredMessage(userFields.address.buildingNumber.placeholder)),
                apartmentNumber:
                    Yup.string()
                        .required(requiredMessage(userFields.address.apartmentNumber.placeholder))
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
                    mapOfAddresses: {
                        primary: {
                            city: values.city,
                            state: values.state,
                            country: 'México',
                            zipcode: values.zipcode,
                            neighbourhood: values.neighbourhood,
                            street: values.street,
                            buildingNumber: values.buildingNumber,
                            apartmentNumber: values.apartmentNumber
                        }
                    }
                };
                try {
                    let {data} = await mutation({
                        variables: {
                            input: _input
                        }
                    });
                    contexts.authContext.setAuthState(data.signup);
                    setTimeout(() => {
                        route.hook.push(route.path);
                    }, 800);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    );
}

