'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================



export var user = {
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
    passwordConfirmation: {
        placeholder: 'Confirmación de contraseña',
        id: 'passwordConfirmation'
    },
    birthday: {
        placeholder: 'Fecha de Nacimiento',
        id: 'birthday'
    },
    cellphone: {
        placeholder: 'Número de Celular',
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

export var productFields = {
    name: {
        id: 'name',
        placeholder: 'Nombre del producto',
        type: 'text'
    },
    price: {
        id: 'price',
        placeholder: 'Precio del producto',
        type: 'number'
    },
    pieces: {
        id: 'pieces',
        placeholder: 'Número de piezas',
        type: 'number'
    },
    stock: {
        id: 'stock',
        placeholder: 'Piezas disponibles',
        type: 'number'
    },
    code: {
        id: 'code',
        placeholder: 'Jancode',
        type: 'text'
    },
    block: {
        id: 'block',
        placeholder: 'Bloquear venta',
        type: 'checkbox'
    },
    description: {
        id: 'description',
        placehoder: 'Descripción',
        type: 'text'
    }
}
