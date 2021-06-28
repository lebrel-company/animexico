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
        user: {
            query: {
                success: 'Datos de usuario disponibles.',
                invalid: 'No fue posible encontrar tus datos.'
            }
        },
        cart: {
            update: {
                success: 'Carrito de compras creado.',
                invalid: 'No es posible modificar tu carrito en este momento.',
                error: 'Ocurrio un error al tratar de actualizar el carrito.'
            },
            creation: {
                success: 'Carrito de compras creado.',
                invalid: 'No es posible crear el carrito de compras en este momento.',
                error: 'Ocurrio un error al tratar de crear el carrito.'
            },
            addProduct: {
                success: 'Producto agregado.',
                invalid: 'No es posible agregar el producto.',
                error: 'Ocurrio un error al tratar de agregar al carrito.'
            },
            updateProduct: {
                success: 'Producto de compras actualizado.',
                invalid: 'No es posible actualizar el producto.',
                error: 'Ocurrio un error al tratar de actualizar un producto en el carrito.'
            },
            query: {
                success: 'Petición completada con éxito.',
                invalid: 'No fue posible encontrar tu carrito de compras.',
                error: 'Ocurrio un error al tratar de encontrar el carrito.'
            },
            delete: {
                exists: 'Carrito elimiado con éxito.',
                notExists: 'No tienes carritos por eliminar.',
                error: 'Ocurrio un error al tratar de borrar el carrito.'
            }
        }
    }
}


export default status
