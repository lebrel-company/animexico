// libraries:
import {gql, useQuery, readQuery} from '@apollo/client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from '../../layout/Client';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Carousel from '../../components/SliderMultipleFiles';
import SliderText from '../../components/SliderText';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {client} from '../../config/apollo';
import {aboutUs, sliderTexts} from '../../utils/texts/homepage.texts'
import Loading from '../../components/loading';

var pp = (el) => console.log(el)

//==============================================================================


var QUERY_ALL_AVAILABLE_PRODUCTS = gql`
    {
        queryAllAvailableProducts{
            id
            name
            description
            listOfImages
            price{
                amount
                currency
            }
        }
    }
`

function Homepage() {
    var {loading, error, data} = useQuery(QUERY_ALL_AVAILABLE_PRODUCTS)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        loading ? <Loading/> :
        <ClientLayout pattern={`bg-clouds`}>
            <div className={`py-10 container mx-auto w-full`}>
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
                    <Carousel listOfProducts={data.queryAllAvailableProducts}/>
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
                        <img className="h-1/3 w-1/3"
                             src="/tamashiiNationsQuality.png"/>
                    </div>
                    <div>
                        <div className="font-deco font-semibold text-2xl p-6">
                            {aboutUs.text}
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}


export default Homepage;