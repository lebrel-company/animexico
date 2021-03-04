import React from 'react'
import Layout from '../../components/Layout';

function shoppingCar() {
    return (
        <div>
            <Layout/>
            
                <div className="container mx-auto mt-20  grid grid-cols-6 gap-4">
                    <div className="row-span-1 col-span-2 shadow-lg rounded-lg  border-gray-500 border-2">
                        <div className="text-center text-3xl p-5">
                            Detalles del contacto
                        </div>
                        <div className="p-4 m-2 grid grid-cols-2 gap-4">
                            <div className="border border-gray-500">
                                    nombre
                            </div>
                            <div className="border border-gray-500">
                                    segundo nombre
                            </div>
                            <div className="border border-gray-500">
                                    Apellido Paterno
                            </div>
                            <div className="border border-gray-500">
                                    Apellido Materno
                            </div>
                            <div className="border border-gray-500">
                                    Fecha de nacimiento
                            </div>
                            <div className="border border-gray-500">
                                    Celular
                            </div>
                            <div className="border border-gray-500">
                                    México
                            </div>
                            <div className="border border-gray-500">
                                    Ciudad
                            </div>
                            <div className="border border-gray-500">
                                    Estado
                            </div>
                            <div className="border border-gray-500">
                                    Código Postal
                            </div>
                            <div className="border border-gray-500">
                                    Calle
                            </div>
                            <div className="border border-gray-500">
                                    Colonia
                            </div>
                            <div className="border border-gray-500">
                                    Número Exterior
                            </div>
                            <div className="border border-gray-500">
                                    Número Interior
                            </div>
                        </div>
                    </div>
                    <div className="row-span-1 col-span-2 bg-gray-300 border-gray-500 border-2">
                        

                    </div>
                    <div className="row-span-1 col-span-2 ">
                        <div className="divide-y divide-gray-500">
                            <div className="rounded-lg mt-5 p-20  m-20 shadow-lg">
                                <div className="text-center text-2xl font-semibold">
                                    Total a pagar
                                </div>
                                <div className="divide-y divide-gray-500">
                                    <div className="text-center text-4xl pt-16 pb-2">
                                        $11,200.00
                                    </div>
                                    <div className="text-center text-xl pt-2">
                                        Envio incluido
                                    </div>
                                </div>                            
                            </div>
                            
                            
                            <div>
                                <div className="text-center text-2xl text-gray-500">
                                    Realizar pago con
                                </div>
                                <div className="flex justify-center">
                                    <button 
                                        className="bg-red-600 py-5 px-32 rounded-lg text-3xl shadow-md mt-5 p-2 text-white uppercase hover:bg-red-500"
                                        type="submit" id="button">Pagar
                                    </button>
                                </div>                            
                            </div>
                        </div>                        
                    </div>
            </div>           
            
        </div>
    )
}

export default shoppingCar
