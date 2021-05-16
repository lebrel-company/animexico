// libraries:
import {useRouter} from 'next/router'
import Link from 'next/link';
import {useEffect} from 'react';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from '../../layout/Client';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Footer from '../../components/Footer';
import Carousel from '../../components/SliderMultipleFiles';
import SliderText from '../../components/SliderText';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {sliderTexts, aboutUs} from '../../utils/texts/homepage.texts'

//==============================================================================


function Homepage() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <ClientLayout pattern={`bg-clouds`}>
            <div className={`py-10 container mx-auto`}>
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
                    <Carousel/>
                </div>
                <div className="flex justify-center items-center relative">
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
                        <img className="h-44 w-44"
                             src="/tamashiiNationsQuality.png"/>
                    </div>
                    <div>
                        <div
                            className="font-black text-4xl relative z-20"></div>
                        <pre className="font-deco font-semibold text-2xl p-6">
                            {aboutUs.text}
                        </pre>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}


export default Homepage;