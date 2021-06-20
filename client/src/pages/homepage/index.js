'use strict';
// libraries:
import {gql, useQuery, readQuery} from '@apollo/client'
import {useContext, useEffect} from 'react';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from '../../context/AuthContext';
import {CartContext} from '../../context/CartContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from '../../layout/Client';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Carousel from '../../components/SliderMultipleFiles';
import SliderText from '../../components/SliderText';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import QUERY_ALL_AVAILABLE_PRODUCTS
    from '../../operations/queryProducts.gql'
import {aboutUs, sliderTexts} from '../../utils/texts/homepage.texts'
import Loading from '../../components/loading';

var pp = (el) => console.log(el)
//==============================================================================


export default function Homepage() {
    var authState = useContext(AuthContext)
    var cartState = useContext(CartContext)
    var {loading, error, data} = useQuery(QUERY_ALL_AVAILABLE_PRODUCTS)

    pp(`Data: ` + data)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }


    return (
        <ClientLayout pattern={`bg-clouds`}>
            <div
                className={`
                    container mx-auto w-full 
                `}>

                {
                    loading && <Loading/>
                }

                {
                    data?.queryAllAvailableProducts &&
                    <div>
                        <div>
                            <div>
                                <div>
                                    <button
                                        className="button-blue top-44 h-16 w-64
                                text-2xl z-10 ml-20 absolute
                                ">Proximos Productos
                                    </button>
                                    <img
                                        className="z-0 bg-cover rounded-md w-full relative"
                                        src="/banner-test.png"/>
                                </div>
                            </div>
                        </div>
                        <div className="my-12">
                            <Carousel
                                listOfProducts={data.queryAllAvailableProducts}/>
                        </div>
                        <div
                            className="flex justify-center items-center relative">
                            <div className="z-30 absolute">
                                <SliderText listOfTexts={sliderTexts}/>
                            </div>
                            <div>
                                <video autoPlay muted loop
                                       className="myVideo w-full rounded-md"
                                >
                                    <source
                                        src="/tamashiBackgroundVideo.mp4"
                                        type="video/mp4"
                                        className="z-0 relative"/>
                                </video>
                            </div>
                        </div>
                        <div
                            className="text-dark text-center font-deco p-20 relative z-10">
                            <div
                                className="container m-auto flex justify-center p-6">
                                <img className="h-1/3 w-1/3"
                                     src="/tamashiiNationsQuality.png"/>
                            </div>
                            <div>
                                <div
                                    className="font-deco font-semibold text-lg lg:text-xl lg:p-6">
                                    {aboutUs.text}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </ClientLayout>
    )
}

