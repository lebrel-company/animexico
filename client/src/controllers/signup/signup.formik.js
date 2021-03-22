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

    var _listOfValueNames = Object.keys(userFields)


    function createInitialValuesObject() {
        let result = {}
        _listOfValueNames.forEach(function (_key) {
            result[_key] = ''
        })
        return result
    }


    return useFormik({
            initialValues: createInitialValuesObject(),
            validationSchema: Yup.object(createValidationSchema()),
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
                            country: values.country,
                            zipcode: values.zipcode,
                            neighbourhood: values.neighbourhood,
                            street: values.street,
                            buildingNumber: values.buildingNumber,
                            apartmentNumber: values.apartmentNumber
                        }
                    }
                }
                try {
                    let {data} = await mutation({
                        variables: {
                            input: _input
                        }
                    });
                    contexts.authContext.setAuthState(data.signup)
                    setTimeout(() => {
                        route.hook.push(route.path);
                    }, 800);
                } catch (error) {
                    console.error(error)
                }
            },
        }
    );
}

function createValidationSchema() {
    var result = {}
    Object.keys(userFields).forEach(function (key) {
        result[key] = userFields[key].yup.type
        Object.keys(userFields[key].validations).forEach(
            function appendValidations(validation_type) {
                if (userFields[key].validations[validation_type].enabled === true) {
                    result[key][validation_type](
                        userFields[key].validations[validation_type].errorMessage
                    )
                }
            }
        )
    })


    return result
}

