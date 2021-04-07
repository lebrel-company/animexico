import React from 'react'
import ClientLayout from "../../layout/Client";
import DeliveryDirection from "../../components/client/deliveryDirection"
import CartProduct from "../../components/cartProduct";
import CartPayPanel from "../../components/cartPayPanel";


function cart(){
    return (
        <ClientLayout>
            <div className='flex flex-row w-full justify-center pt-20'>
                <div>
                    <DeliveryDirection/>
                </div>
                <div className='ml-2'>
                    <CartProduct/>
                    <CartProduct/>
                    <CartProduct/>                    
                </div>
                <div className='ml-2'>
                    <CartPayPanel/>
                </div>                
            </div>          
        </ClientLayout>           
    )
}

export default cart