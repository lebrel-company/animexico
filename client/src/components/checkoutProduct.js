import React from 'react'

function checkoutProduct() {
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
                    <div className='flex items-center font-deco'>
                        <button  className='h-8 w-8 shadow-md mr-5 text-black text-xl font-bold'> + </button>
                        <div className='text-3xl text-dark'>5</div>
                        <button className='h-8 w-8 shadow-md ml-5 text-black text-2xl font-bold'> - </button>
                    </div>
                    <div className='text-2xl pt-2'>
                        Precio
                    </div>
                    <div className='flex justify-end'>
                        <button className='h-8 w-8 shadow-md bg-dark text-pale text-2xl'>
                            X
                        </button>
                    </div>                   
                </div>           
            </div>
                
        </div>
    )
}

export default checkoutProduct