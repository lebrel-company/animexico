'use strict';
// libraries:
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
        className: 'container',
    }

    return (
        <div className="flex justify-center">
            <Slider {...settings}>
                {
                    props.listOfTexts.map((element) => {
                        return (
                            <div className="text-white text-center font-deco">
                                    <span className="font-black text-9xl">
                                        {element.title}
                                    </span>
                                <span className="text-3xl">
                                        {element.text}
                                    </span>
                                {
                                    <div
                                        className="w-1/2 text-3xl m-auto
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



