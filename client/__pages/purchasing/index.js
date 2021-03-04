import Link from 'next/link';
import Layout from '../../components/Layout';

function shoppingCar() {
    return (
        <div>
            <Layout/>
            <div className="container mx-auto mt-20  grid grid-cols-5 gap-4">
                <div className="row-span-1 col-span-1 bg-gray-300 h-80">
                    1
                </div>
                <div className="col-span-3 bg-gray-300  grid-rows-2 divide-y-4 ">
                    <div className="text-center  grid grid-cols-3 gap-4 ">
                        <div className="col-span-1 bg-white mt-10 h-24">
                            
                        </div>
                        <div className="col-span-1 bg-white mt-10 h-24">
                           
                        </div>
                        <div className="col-span-1 bg-white mt-10 h-24">
                            
                        </div>

                        <div className="col-span-1 bg-white mt-10 h-24">
                            
                        </div>
                        <div className="col-span-1 bg-white mt-10 h-24">
                            
                        </div>
                        <div className="col-span-1 bg-white mt-10 h-24">
                            
                        </div>
                    </div>                
                </div>
                <div className="row-span-1 col-span-1 rounded-md border-gray-500 border-2">
                    <div className="text-center pt-5 text-2xl text-gray-500">
                        Total
                    </div>
                    <div className="divide-y divide-gray-500">
                        <div className="text-center pt-5 text-2xl font-semibold">
                            $ 11,500
                        </div>
                        <div className="text-center pt-3 text-base font-normal text-gray-500">
                            Envio incluido
                        </div>
                        
                    </div>
                    <div className="text-center pt-10 text-lg font-bold text-blue-600">
                        <div className="bg-gray-200">
                                PayPal
                        </div>
                    </div>
                    <Link href="/shoppingCar">
                        <div className="flex justify-center">
                                <button 
                                    className="bg-red-600 py-2 px-10 rounded-md shadow-md mt-5 p-2 font-bold text-white uppercase hover:bg-red-500"
                                    type="submit" 
                                    id="submit-button">Proceder al pago
                                </button>
                        </div>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}


export default shoppingCar
