import React from 'react'

function product(){
    return (
        <div className='flex flex-row'>
            <div>
                <div className='bg-dark h-24 w-24'></div>
            </div>
            <div className='ml-3 font-deco'>Nombre del producto</div>
            <div className='ml-14 font-deco'>
                Descripción
            </div>
            <div className='ml-36 font-deco flex items-center'>
                $ 7,500 MXN
            </div>
        </div>
        

    )
}

export default product