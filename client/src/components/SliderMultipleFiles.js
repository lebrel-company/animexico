import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Card from '../components/Card'

const photos = [
    {
        name: 'Photo 1',
        url: 'https://cdn.shopify.com/s/files/1/0065/2535/4073/products/SOC-GX-93-SB-Arcadia-TV-Ver.-03_1200x.jpg'
    },
    {
        name: 'Photo 2',
        url: 'https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000012161_Gxr51siy_01_900x.jpg'
    },
    {
        name: 'Photo 3',
        url: 'https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000013312_LclgAvZO_03.jpg'
    },
    {
        name: 'Photo 4',
        url: 'https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000013366_e7UQ33wD_07_1200x.jpg'
    },
    {
        name: 'Photo 5',
        url: 'https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000013333_rsqWpdMA_03.jpg'
    },    
]

export default function Carousel(props){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        className: 'container m-auto font-deco'
    }

    return(
        <div>
            <Slider {...settings}>
               
                {
                    photos.map((element) => {
                        return(<div className='p-2'><Card image={element.url}/></div>)
                        })
                }
                               
            </Slider>
        </div>
    )
    
    
}