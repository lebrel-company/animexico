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

export var authHeaderKeys = [
    'signin', 'signup'
]

export var authButtons = {
    restorePassword: {
        href: null,
        text: 'Restaurar contraseña'
    },
    createAccount: {
        id: 'submit-button',
        href: null,
        text: 'Crear cuenta'
    },
    signin: {
        href: '/signin',
        text: 'ingresar',
        style: 'button-pale-outline'
    },
    signup: {
        href: '/signup',
        text: 'registrarme',
    }
}