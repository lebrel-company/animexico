'use strict';
// libraries:
import Slider from 'react-slick';
import {v4 as uuidv4} from 'uuid';
import {useRouter} from 'next/router'
import {useContext} from 'react';
import {useState} from 'react';
import Image from 'next/image'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from '../context/AuthContext';
import {CartContext} from '../context/CartContext';
import {mapOfRoutes} from '../utils/routes';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)
//==============================================================================

var TEXTS = {
    addToCart: 'Comprar',
    goToCart: 'En carrito'
}


export default function Card(props) {
    let authState = useContext(AuthContext)
    let cartState = useContext(CartContext)
    let [productData, setProductData] = useState(props.product)
    let _p = props.product
    let _scr = props.scrollableInnerImages || false
    let router = useRouter()


    function goToProductDetails(idProduct) {
        return function inner(e) {
            e.preventDefault()
            let _path = `/product/details/${idProduct}`
            router.push(_path)
        }
    }

    function cardButton() {
        let inCart = cartState.product.inCart(productData.id)

        if (inCart) {
            return (
                <button
                    className="button-cart"
                    onClick={(e) => {
                        e.preventDefault()
                        router.push(mapOfRoutes.cart.route)
                    }}>
                    {TEXTS.goToCart}
                </button>
            )
        }

        if (authState.isAuthenticated()) {
            return (
                <button onClick={(e) => {
                    e.preventDefault()
                    cartState.product.add(productData)
                }}
                        className="button-add">
                    {TEXTS.addToCart}
                </button>
            )
        }

        return (
            <button onClick={(e) => {
                e.preventDefault()
                router.push(mapOfRoutes.login.route)
            }}
                    className="button-locked">
                ingresar
            </button>
        )
    }

    return (
        <div>
            <div className="card-product"
                 onDoubleClick={goToProductDetails(_p.id)}>
                <div className={`bg-cross absolute z-20 w-full h-full`}/>
                <div className="
                relative z-30 h-full flex flex-col justify-between p-4
                ">
                    <div className="">
                        {
                            <img
                                className={`card-image`}
                                src={_p.listOfImages[0]}
                            />
                        }
                    </div>
                    <div className="flex flex-col font-deco">
                        <div className="text-md">{_p.name}</div>
                        <div>
                            <div className="flex flex-row justify-between">
                                <div className="font-bold">
                                    {`\$${_p.price.amount} ${_p.price.currency}`}
                                </div>
                                <div>{cardButton()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ImageScroll(props) {
    var listOfImages = props.listOfImages
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        className: 'h-full w-full',
        easing: 'linear',
        arrows: true
    }

    return (
        <div>
            <Slider {...settings}>
                {
                    listOfImages.map(
                        (_img) => {
                            return (
                                <img
                                    key={uuidv4()}
                                    className={`
                                        md:w-72 h-72 block m-auto rounded-md 
                                        object-contain 
                                    `}
                                    src={_img}
                                    alt=""
                                />
                            )
                        }
                    )
                }
            </Slider>
        </div>
    )
}

