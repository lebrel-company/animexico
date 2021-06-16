'use strict';
// libraries:
import {v4 as uuid} from 'uuid'
import Slider from 'react-slick';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

export default function SliderText(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: 'container mx-auto w-1/2'
    }

    return (
        <div>
            <Slider {...settings}>
                {
                    props.listOfTexts.map((element) => {
                        return (
                            <div
                                key={uuid()}
                                className="text-white text-center font-deco">
                                <div
                                    className="font-black text-2xl lg:text-6xl">
                                    {element.title}
                                </div>
                                <div className="text-lg md:text-2xl">
                                    {element.text}
                                </div>
                                {
                                    <div
                                        className="text-md lg:text-3xl
                                        ">
                                        {element.description}
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )

}



