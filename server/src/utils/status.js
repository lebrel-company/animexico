var status = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    invalid: 'invalid',
    active: 'active',
    inactive: 'inactive',
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
                success: 'Orden procesada con éxito',
                invalid: 'Por el momento no ha sido posible realizar tu orden'
            }
        },
        auth: {
            login: {
                success: 'Ingreso autorizado',
                invalid: 'No fue posible ingresar con ese correo o contraseña'
            }
        },
        cart: {
            creation: {
                success: 'Carrito de compras creado',
                invalid: 'No es posible crear el carrito de compras en este momento'
            }
        }
    }
}


export default status
