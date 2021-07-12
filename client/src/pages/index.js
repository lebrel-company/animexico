'use strict';
// libraries:
import {useQuery} from '@apollo/client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from '../layout/Client';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Carousel from '../components/SliderMultipleFiles';
import SliderText from '../components/SliderText';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import QUERY_PRODUCTS from '../operations/queryProducts.gql'
import {aboutUs, sliderTexts} from '../utils/texts/homepage.texts'
import {useCartTimer} from '../hooks/useCartTimer';

var pp = (el) => console.log(el)
//==============================================================================


export default function Homepage() {
    const {loading, error, data} = useQuery(QUERY_PRODUCTS)


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }


    return (
        <ClientLayout pattern={`bg-clouds`}>
            <div className={`container mx-auto w-full h-full`}>

                {
                    <div>
                        <div className="flex items-center relative">
                            <img
                                className="z-0 bg-fill rounded z-0"
                                src="/banner-test.png">
                            </img>
                            <div className="absolute">
                                <button
                                    className="button-blue m-8
                                ">Proximos Productos
                                </button>
                            </div>
                        </div>
                        <div className="my-12">
                            {

                                data?.queryProducts &&
                                <Carousel
                                    listOfProducts={data.queryProducts}/>
                            }
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

