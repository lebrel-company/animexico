'use strict';
// libraries:
import * as Yup from 'yup';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import { spanishInputPlaceholders } from "../texts/signup.texts";
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
};

var _spanish_placeholders = {
    firstName: 'Nombre',
    middleName: 'Segundo nombre',
    lastName: 'Apellido paterno',
    secondLastName: 'Apellido materno',
    email: 'Correo electrónico',
    emailConfirm: 'Confirmación correo electrónico',
    password: 'Contraseña',
    passwordConfirm: 'Confirmación de contraseña',
    cellphone: 'Celular',
    birthday: 'Fecha de nacimiento',
    country: 'País',
    city: 'Ciudad',
    state: 'Estado',
    neighbourhood: 'Colonia',
    street: 'Calle o avenida',
    zipcode: 'Código postal',
    buildingNumber: 'Número exterior',
    apartmentNumber: 'Número interior'
};

var text = spanishInputPlaceholders;

export var userFields = {
    firstName: {
        type: 'text',
        value: values.firstName,
        placeholder: _spanish_placeholders.firstName
    },
    middleName: {
        type: 'text',
        value: values.middleName,
        placeholder: _spanish_placeholders.middleName
    },
    lastName: {
        type: 'text',
        value: values.lastName,
        placeholder: _spanish_placeholders.lastName
    },
    secondLastName: {
        type: 'text',
        value: values.secondLastName,
        placeholder: _spanish_placeholders.secondLastName
    },
    email: {
        type: 'email',
        value: values.email,
        placeholder: _spanish_placeholders.email
    },
    emailConfirm: {
        type: 'email',
        value: values.emailConfirm,
        placeholder: _spanish_placeholders.emailConfirm
    },
    password: {
        type: 'password',
        value: values.password,
        placeholder: _spanish_placeholders.password
    },
    passwordConfirm: {
        type: 'password',
        value: values.passwordConfirm,
        placeholder: _spanish_placeholders.passwordConfirm
    },
    birthday: {
        type: 'date',
        value: values.birthday,
        placeholder: _spanish_placeholders.birthday
    },
    cellphone: {
        type: 'text',
        value: values.cellphone,
        placeholder: _spanish_placeholders.cellphone
    },
    address: {
        city: {
            type: 'text',
            value: values.city,
            placeholder: _spanish_placeholders.city
        },
        state: {
            type: 'text',
            value: values.state,
            placeholder: _spanish_placeholders.state
        },
        country: {
            type: 'text',
            value: values.country,
            placeholder: _spanish_placeholders.country
        },
        zipcode: {
            type: 'number',
            value: values.zipcode,
            placeholder: _spanish_placeholders.zipcode
        },
        neighbourhood: {
            type: 'text',
            value: values.neighbourhood,
            placeholder: _spanish_placeholders.neighbourhood
        },
        street: {
            type: 'text',
            value: values.street,
            placeholder: _spanish_placeholders.street
        },
        buildingNumber: {
            type: 'text',
            value: values.buildingNumber,
            placeholder: _spanish_placeholders.buildingNumber
        },
        apartmentNumber: {
            type: 'text',
            value: values.apartmentNumber,
            placeholder: _spanish_placeholders.apartmentNumber
        }
    }
};

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
    ];

    let _listOfUserFields = Object.keys(userFields);

    _listOfUserFields.forEach(function (field) {
        userFields[field].validations === undefined ? userFields[field].validations = {} : null;
        if (_listOfRequiredFields.includes(field)) {
            let fieldName = userFields[field].name;
            userFields[field].validations.required = {
                enabled: true,
                errorMessage: get_message('errors', 'required')(fieldName)
            };
        } else {
            userFields[field].validations.required = {enabled: false};
        }
    });
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
        values.apartmentNumber
    ];
    let _listOfNumberFields = [values.zipcode];
    let _listOfDateFields = [values.birthday];

    let _listOfUserFields = Object.keys(userFields);

    _listOfUserFields.forEach(function (field) {
        userFields[field].yup === undefined ? userFields[field].yup = {} : null;
        if (_listOfStringFields.includes(field)) {
            userFields[field].yup.type = Yup.string();
        }

        if (_listOfNumberFields.includes(field)) {
            userFields[field].yup.type = Yup.number();
        }

        if (_listOfDateFields.includes(field)) {
            userFields[field].yup.type = Yup.date();
        }
    });
}

//==============================================================================

function get_message(type, validation_name, language = 'spanish') {
    var _spanishMessages = {
        errors: {
            required: (field) => `${ field } es requerido`,
            email: `Formato de email invalido`
        }
    };

    if (language === 'spanish') {
        return _spanishMessages[type][validation_name];
    } else {
        throw Error('We currently only support spanish language.');
    }
}


