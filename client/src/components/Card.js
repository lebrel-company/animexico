'use strict';
// libraries:
import Slider from 'react-slick';
import {v4 as uuidv4} from 'uuid';
import {useRouter} from 'next/router'
import {useContext} from 'react';
import {useState} from 'react';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from '../context/AuthContext';
import {CartContext} from '../context/CartContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)
//==============================================================================

var TEXTS = {
    addToCart: 'Agregar'
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

    function addToCart(auth = false) {
        return function inner(event) {
            event.preventDefault()
            if (auth === false) {
                router.push('/login')
            } else {
                cartState.addProduct(productData)
            }
        }
    }

    return (
        <div>
            <div className="card-product"
                 onDoubleClick={goToProductDetails(_p.id)}>
                <div className={`bg-cross absolute z-20 w-full h-full`}/>
                <div className={`relative z-30`}>
                    <div className={`p-4 flex justify-center`}>
                        <div className={`w-full h-full`}>
                            {
                                <img
                                    className={`card-image`}
                                    src={_p.listOfImages[0]}
                                />
                            }
                        </div>
                    </div>
                    <div className="flex flex-row mx-4 my-2 font-bold">
                        <div className="flex-1">
                            <div className="text-lg">{_p.name}</div>
                            <p className="">
                                {`\$${_p.price.amount} ${_p.price.currency}`}
                            </p>
                        </div>
                        {
                            authState.isAuthenticated() ?
                                <button onClick={addToCart(true)}
                                        className="button-add"
                                >
                                    {TEXTS.addToCart}
                                </button> :
                                <button onClick={addToCart(false)}
                                        className="button-locked">
                                    ingresar
                                </button>
                        }
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
            <div
                className={`
                `}
            >
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
        </div>
    )
}

