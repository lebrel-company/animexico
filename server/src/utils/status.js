var status = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    invalid: 'invalid',
    active: 'active',
    inactive: 'inactive',
    deleted: 'deleted',
    updated: 'updated',
    order: {
        pending: 'pending',
        packaged: 'packaged',
        inTransit: 'in_transit',
        delivered: 'delivered',
        cancelled: 'cancelled'
    },
    messages: {
        order: {
            creation: {
                success: 'Orden procesada con éxito.',
                invalid: 'Por el momento no ha sido posible realizar tu orden.'
            }
        },
        auth: {
            login: {
                success: 'Ingreso autorizado.',
                invalid: 'No fue posible ingresar con ese correo o contraseña.'
            }
        },
        user:{
            query: {
                success: 'Datos de usuario disponibles.',
                invalid: 'No fue posible encontrar tus datos.'
            }
        },
        cart: {
            update: {
                success: 'Carrito de compras creado.',
                invalid: 'No es posible modificar tu carrito en este momento.'
            },
            creation: {
                success: 'Carrito de compras creado.',
                invalid: 'No es posible crear el carrito de compras en este momento.'
            },
            query: {
                success: 'Petición completada con éxito.',
                invalid: 'No fue posible encontrar tu carrito de compras.'
            },
            delete: {
                exists: 'Carrito elimiado con éxito.',
                notExists: 'No tienes carritos por eliminar.'
            }
        }
    }
}


export default status
