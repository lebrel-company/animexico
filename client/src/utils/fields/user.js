'use strict';
// libraries:
import * as Yup from 'yup'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {spanishInputPlaceholders} from "../texts/signup.texts";
//==============================================================================


var values = {
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    secondLastName: 'secondLastName',
    email: 'email',
    emailConfirm: 'emailConfirm',
    password: 'password',
    passwordConfirm: 'passwordConfirm',
    cellphone: 'cellphone',
    birthday: 'birthday',
    country: 'country',
    city: 'city',
    state: 'state',
    neighbourhood: 'neighbourhood',
    street: 'street',
    zipcode: 'zipcode',
    buildingNumber: 'buildingNumber',
    apartmentNumber: 'apartmentNumber'
}


var text = spanishInputPlaceholders

export var userFields = {
    firstName: {
        type: 'text',
        name: text.firstName,
        value: values.firstName,
    },
    middleName: {
        type: 'text',
        name: text.middleName,
        value: values.middleName,
    },
    lastName: {
        type: 'text',
        name: text.lastName,
        value: values.lastName
    },
    secondLastName: {
        type: 'text',
        name: text.secondLastName,
        value: values.secondLastName
    },
    email: {
        type: 'email',
        name: text.email,
        value: values.email
    },
    emailConfirm: {
        type: 'email',
        name: text.emailConfirm,
        value: values.emailConfirm
    },
    password: {
        type: 'password',
        name: text.password,
        value: values.password
    },
    passwordConfirm: {
        type: 'password',
        name: text.passwordConfirm,
        value: values.passwordConfirm
    },
    birthday: {
        type: 'date',
        name: text.birthday,
        value: values.birthday
    },
    cellphone: {
        type: 'text',
        name: text.cellphone,
        value: values.cellphone
    },
    city: {
        type: 'text',
        name: text.city,
        value: values.city
    },
    state: {
        type: 'text',
        name: text.state,
        value: values.state
    },
    country: {
        type: 'text',
        name: text.country,
        value: values.country
    },
    zipcode: {
        type: 'number',
        name: text.zipcode,
        value: values.zipcode
    },
    neighbourhood: {
        type: 'text',
        name: text.neighbourhood,
        value: values.neighbourhood
    },
    street: {
        type: 'text',
        name: text.street,
        value: values.street
    },
    buildingNumber: {
        type: 'text',
        name: text.buildingNumber,
        value: values.buildingNumber
    },
    apartmentNumber: {
        type: 'text',
        name: text.apartmentNumber,
        value: values.apartmentNumber
    },
}

//==============================================================================
// Inject required fields:
{
    let _listOfRequiredFields = [
        values.firstName,
        values.lastName,
        values.password,
        values.passwordConfirm,
        values.email,
        values.emailConfirm,
        values.birthday,
        values.country,
        values.city,
        values.state,
        values.neighbourhood,
        values.street,
        values.buildingNumber,
        values.zipcode,
        values.cellphone
    ]

    let _listOfUserFields = Object.keys(userFields)

    _listOfUserFields.forEach(function (field) {
        userFields[field].validations === undefined ? userFields[field].validations = {} : null
        if (_listOfRequiredFields.includes(field)) {
            let fieldName = userFields[field].name
            userFields[field].validations.required = {
                enabled: true,
                errorMessage: get_message('errors', 'required')(fieldName)
            }
        } else {
            userFields[field].validations.required = {enabled: false}
        }
    })
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --
// Inject Yup data type:
{
    let _listOfStringFields = [
        values.firstName,
        values.middleName,
        values.lastName,
        values.secondLastName,
        values.email,
        values.emailConfirm,
        values.password,
        values.passwordConfirm,
        values.country,
        values.city,
        values.state,
        values.neighbourhood,
        values.street,
        values.buildingNumber,
        values.cellphone,
        values.apartmentNumber,
    ]
    let _listOfNumberFields = [values.zipcode]
    let _listOfDateFields = [values.birthday]

    let _listOfUserFields = Object.keys(userFields)

    _listOfUserFields.forEach(function (field) {
        userFields[field].yup === undefined ? userFields[field].yup = {} : null
        if (_listOfStringFields.includes(field)) {
            userFields[field].yup.type = Yup.string()
        }

        if (_listOfNumberFields.includes(field)) {
            userFields[field].yup.type = Yup.number()
        }

        if (_listOfDateFields.includes(field)) {
            userFields[field].yup.type = Yup.date()
        }
    })
}

//==============================================================================

function get_message(type, validation_name, language = 'spanish') {
    var _spanishMessages = {
        errors: {
            required: (field) => `${field} es requerido`,
            email: `Formato de email invalido`
        }
    }

    if (language === 'spanish') {
        return _spanishMessages[type][validation_name]
    } else {
        throw Error('We currently only support spanish language.')
    }
}


