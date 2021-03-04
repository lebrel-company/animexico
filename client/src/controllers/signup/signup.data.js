'use strict';

var fields = {
    firstName: {
        placeholder: 'Nombre',
        id: 'firstName',
    },
    middleName: {
        placeholder: 'Segundo Nombre',
        id: 'middleName',
    },
    lastName: {
        placeholder: 'Apellido Paterno',
        id: 'lastName'
    },
    secondLastName: {
        placeholder: 'Apellido Materno',
        id: 'secondLastName'
    },
    email: {
        placeholder: 'Correo electrónico',
        id: 'email'
    },
    password: {
        placeholder: 'Contraseña',
        id: 'password'
    },
    birthday: {
        placeholder: 'Fecha de Nacimiento',
        id: 'birthday'
    },
    cellphone: {
        placeholder: 'Numero de Celular',
        id: 'cellphone'
    },
    address: {
        city: {
            id: 'address.city',
            placeholder: 'Ciudad'
        },
        state: {
            id: 'address.state',
            placeholder: 'Estado'
        },
        country: {
            id: 'address.country',
            placeholder: 'País'
        },
        zipcode: {
            id: 'address.zipcode',
            placeholder: 'Código Postal'
        },
        neighbourhood: {
            id: 'address.neighbourhood',
            placeholder: "Colonia"
        },
        street: {
            id: 'address.street',
            placeholder: 'Calle o Avenida'
        },
        buildingNumber: {
            id: 'address.buildingNumber',
            placeholder: 'Número Exterior'
        },
        apartmentNumber: {
            id: 'address.apartmentNumber',
            placeholder: 'Número Interior'
        }
    },
    submit: {
        id: 'submit-button',
        value: 'Crear cuenta'
    }
}

var validationsTexts = {
    requiredField: (value)=>`${value} invalido`
}

export {fields, validationsTexts}