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


export var productFields = {
    name: {
        value: 'name',
        name: 'Nombre del producto',
        type: 'text'
    },
    price: {
        value: 'price',
        name: 'Precio del producto',
        type: 'number'
    },
    pieces: {
        value: 'pieces',
        name: 'Número de piezas',
        type: 'number'
    },
    stock: {
        value: 'stock',
        name: 'Piezas disponibles',
        type: 'number'
    },
    code: {
        value: 'code',
        name: 'Jancode',
        type: 'text'
    },
    block: {
        value: 'block',
        name: 'Bloquear venta',
        type: 'checkbox',
        label: 'Bloquear venta'
    },
    description: {
        value: 'description',
        placehoder: 'Descripción',
        type: 'text'
    }
}
