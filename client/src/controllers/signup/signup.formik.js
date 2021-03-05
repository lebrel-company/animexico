import {validationsTexts, fields} from "./signup.data";
import { useFormik } from "formik";
import * as Yup from "yup";

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
                    .required(validationsTexts.requiredField(fields.firstName.placeholder)),
                lastName: Yup.string()
                    .required(validationsTexts.requiredField(fields.lastName.placeholder)),
                secondLastName: Yup.string()
                    .required(validationsTexts.requiredField(fields.secondLastName.placeholder)),
                email: Yup.string()
                    .email('El correo no es válido')
                    .required(validationsTexts.requiredField(fields.email.placeholder)),
                password: Yup.string()
                    .required(validationsTexts.requiredField(fields.password.placeholder)),
                passwordConfirmation: Yup.string()
                    .required(validationsTexts.requiredField(fields.passwordConfirmation.placeholder)),
                birthday: Yup.string()
                    .required(validationsTexts.requiredField(fields.birthday.placeholder)),
                cellphone:
                    Yup.string()
                        .required(validationsTexts.requiredField(fields.cellphone.placeholder)),
                address: Yup.object({
                    country: Yup.string()
                        .required(validationsTexts.requiredField(fields.address.country.placeholder)),
                    city: Yup.string()
                        .required(validationsTexts.requiredField(fields.address.city.placeholder)),
                    state: Yup.string()
                        .required(validationsTexts.requiredField(fields.address.state.placeholder)),
                    zipcode: Yup.number()
                        .required(validationsTexts.requiredField(fields.address.zipcode.placeholder)),
                    neighbourhood: Yup.string()
                        .required(validationsTexts.requiredField(fields.address.neighbourhood.placeholder)),
                    street: Yup.string()
                        .required(validationsTexts.requiredField(fields.address.street.placeholder)),
                    buildingNumber: Yup.string()
                        .required(validationsTexts.requiredField(fields.address.buildingNumber.placeholder)),
                    apartmentNumber: Yup.string()
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
