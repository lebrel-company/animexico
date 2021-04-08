import React from 'react'
import ClientLayout from "../../layout/Client";
import CheckoutProduct from "../../components/checkoutProduct";
import CheckoutInfo from "../../components/checkoutInfo";


function cart(){
    return (
        <ClientLayout>
            
            <div className='flex flex-row w-full justify-center pt-20'>
                <div>                    
                    <CheckoutProduct/>
                    <CheckoutProduct/>
                    <CheckoutProduct/>
                    <CheckoutProduct/>
                    <CheckoutProduct/>
                </div>
                <div className='ml-4'>
                    <CheckoutInfo/>
                </div>                
            </div>        
                
        </ClientLayout>
    )
}

export default cart
