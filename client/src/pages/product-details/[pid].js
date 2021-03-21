import React from 'react'
import {useRouter} from 'next/router'
import ClientLayout from "../../layout/Client";
import fields from "../../utils/productDetailsText"
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { gql, useQuery } from '@apollo/client';

//Project
import queryGetProductInfoString from '../../controllers/productDetails/productDetails.query.gql';





function ProductDetails() {
    let router = useRouter()
    let {pid} = router.query

    const { loading, error, data } = useQuery(queryGetProductInfoString, {
        variables: { id: pid },
      });

      {/*if (loading) return <p>Loading ...</p>;
      return <h1>{data.queryProduct.price.amount}</h1>*/}
    return (
            
           <ClientLayout>
                <img className='
                    fixed bg-cover bg-center w-full
                    z-0 opacity-5 hidden md:block
                ' src='/background/tamashii_vignettes_02.png'/>

                <div className='h-screen mx-auto py-10 z-20'>
                    <div className='grid grid-cols-7 gap-4'>
                        
                        <div className='col-span-4 border-2'>
                            <AwesomeSlider className='h-full'>
                                <div data-src={data.queryProduct.images[0]}></div>
                                <div data-src={data.queryProduct.images[1]}></div>
                                <div data-src={data.queryProduct.images[2]}></div>
                                <div data-src={data.queryProduct.images[3]}></div>
                                <div data-src={data.queryProduct.images[4]}></div>
                            </AwesomeSlider>
                        </div>
                        <div className='col-span-3'>
                            <div className='h-44 flex items-center font-deco text-5xl font-black'>{data.queryProduct.name}</div>
                            <div className=' h-44  font-deco container grid grid-rows-2'>
                                <div className='text-5xl flex items-end justify-center'>${data.queryProduct.price.amount} {data.queryProduct.price.currency}</div>
                                <div className='text-2xl flex justify-center'>{fields.shippingIncluded.text}</div>
                            </div>
                            <div className='h-44 grid grid-rows-3'>
                                <div className='flex items-end justify-center text-3xl py-10'>{fields.buyWith.text}</div>
                                <div className='flex justify-center'>
                                    <img src='/PaypalLogo.png'
                                        className='h-10'                                        
                                        />
                                </div>
                                <div className='flex justify-center'>
                                    <button className='button-red h-full w-60 flex justify-center items-center'>
                                        <img src='/shopping-cart.png'
                                            className='h-10 w-10'
                                        />

                                    </button>
                                </div>
                            </div>
                            <div className='h-44 flex justify-center items-center font-deco text-2xl'>{fields.estimatedDeliveryCloses.text}</div>
                        </div>
                    </div>       
                </div>
           </ClientLayout>
       
    )
}

export default ProductDetails
