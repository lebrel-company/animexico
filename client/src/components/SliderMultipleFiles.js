'use strict';
// libraries:
import Slider from 'react-slick';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Card from '../components/Card'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function Carousel(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight: true,
        centerMode: true,
        className: '',
        easing: 'linear'
    }

    return (
        <div>
            <div
                className={`
                `}
            >
                <Slider {...settings}>

                    {
                        props.listOfProducts.map((el) => {
                            return (
                                <div key={el.id} className={`p-5`}>
                                    <Card product={el}/>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )


}