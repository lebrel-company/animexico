import React from 'react'

function cartPayPanel() {
    return (
            <div className='pt-4 shadow-md'>
                <div className='bg-dark rounded-md'>
                    <div className='text-pale flex justify-center mx-20 font-deco text-4xl pt-10'>
                        Total
                    </div>
                    <div className='divide-y divide-pale'>
                        <div className='text-pale flex justify-center mx-20 font-deco text-4xl p-5'>
                            $12,000 MXN
                        </div>
                        <div className='text-pale flex justify-center mx-20 font-deco text-xl py-5'>
                            Envio Incluido
                        </div>
                    </div>
                    <div className='flex justify-center bg-pale bg-opacity-80 py-5'>
                        <img src='/PaypalLogo.png'
                                className='h-10'
                        />
                    </div>
                    <div className='flex justify-center py-10'>
                        <button
                            className='button-red text-4xl h-12 w-60 flex justify-center items-center'>
                            Pagar
                        </button>
                    </div>                
                </div>
            </div>
            
        
    )
}

export default cartPayPanel
