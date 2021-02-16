'use strict';

var fields = {
    name: {
        placeholder: 'Nombre',
        id: 'name',
    },
    middleName: {
        placeholder: 'Segundo Nombre',
        id: 'middleName',
    },
    lastname: {
        placeholder: 'Apellido Paterno',
        id: 'lastname'
    },
    secondLastname: {
        placeholder: 'Apellido Materno',
        id: 'secondLastname'
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
        placeholder: 'Number Celular',
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
        suburb: {
            id: 'address.suburb',
            placeholder: "Colonia"
        },
        street: {
            id: 'address.street',
            placeholder: 'Nombre de la Calle o Avenida'
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
        value: 'Enviar'
    }
}

var validationsTexts = {
    requiredField: 'Este campo es necesario'

}

export {fields, validationsTexts}