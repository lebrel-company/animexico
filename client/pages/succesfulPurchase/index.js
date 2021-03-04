import React from 'react'
import Layout from '../../components/Layout';

function succsfulPurchase() {
    return (
        <div>
            <Layout/>
            <div className="p-28 m-28 h-full divide-y-2 divide-red-500 shadow-lg">
                <div className="text-center text-9xl text-gray-600 pb-10">
                    Compra Exitosa!
                </div>
                <div className="pt-10 text-center text-3xl text-gray-600">
                    Verifica tu compra en tu correo de usuario
                </div>
            </div>            
        </div>
    )
}

export default succsfulPurchase
