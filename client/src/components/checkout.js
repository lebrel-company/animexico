import React from 'react'

function cartProduct() {
    return (
        <div className='w-full flex-row pt-4 shadow-md'>
            <div className='bg-white h-52 flex items-center rounded-md'>
                <div className='h-44 w-36 bg-dark ml-4 rounded-md'>

                </div>
                <div className='font-deco mx-8'>
                    <div className='text-3xl pt-2'>
                        Nombre del producto
                    </div>
                    <div className='text-2xl pt-2'>
                        Cantidad de piezas
                    </div>
                    <div className='text-2xl pt-2'>
                        Precio
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default cartProduct
