'use strict';
// libraries:
import {useRouter} from 'next/router'
import {gql, useQuery} from '@apollo/client';
import AwesomeSlider from 'react-awesome-slider';
import {v4 as uuidv4} from 'uuid'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from "../../../layout/Client";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import fields from "../../../utils/productDetailsText"
import queryGetProductInfoString
    from '../../../controllers/product/product.details.query.gql';
//==============================================================================


export default function ProductDetails(props) {
    let router = useRouter()
    let {pid} = router.query

    const {loading, error, data} = useQuery(
        queryGetProductInfoString, {
            variables: {id: pid},
        }
    );

    return (
        loading ? <div>Loading...</div> :
            <ClientLayout>
                <img className='
                    fixed container my-auto bg-cover bg-center
                    z-0 opacity-5 hidden md:block transform scale-150
                ' src='/background/tamashii_vignettes_02.png'/>

                <div className='h-full flex justify-center items-center relative z-50'>
                    <div className='flex flex-row px-10 container h-5/6'>
                        <AwesomeSlider className='rounded border-4 border-dark'>
                            {
                                data.queryProduct.images.map(function (element) {
                                    return (
                                        <div key={uuidv4()}
                                             data-src={element}></div>
                                    )
                                })
                            }
                        </AwesomeSlider>
                        <div className='w-1/2 px-10'>
                            <div
                                className='flex items-center font-deco text-3xl font-black'>
                                {data.queryProduct.name}
                            </div>
                            <div
                                className='text-lg font-simp text-justify'>{data.queryProduct.description}</div>
                            <div
                                className='font-deco container grid grid-rows-2'>
                                <div
                                    className='
                                text-5xl flex items-end justify-center'>
                                    {`$${data.queryProduct.price.amount} ${data.queryProduct.price.currency}`}
                                </div>
                                <div
                                    className='
                                text-2xl flex justify-center'>
                                    {fields.shippingIncluded.text}
                                </div>
                            </div>

                            <div className='h-44 grid grid-rows-3'>
                                <div
                                    className='
                                    flex items-end justify-center
                                    text-3xl py-10'
                                >{fields.buyWith.text}
                                </div>
                                <div className='flex justify-center'>
                                    <img src='/PaypalLogo.png'
                                         className='h-10'
                                    />
                                </div>
                                <div className='flex justify-center'>
                                    <button
                                        className='button-red h-full w-60 flex justify-center items-center'>
                                        <img src='/shopping-cart.png'
                                             className='h-10 w-10'
                                        />
                                    </button>
                                </div>
                            </div>
                            <div
                                className='h-44 flex justify-center items-center font-deco text-2xl'>{fields.estimatedDeliveryCloses.text}</div>
                        </div>
                    </div>
                </div>
            </ClientLayout>

    )
}

