'use strict';
// libraries:
import {useRouter} from 'next/router'
import {gql, useQuery} from '@apollo/client';
import {v4 as uuidv4} from 'uuid'
import Slider from 'react-slick';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from '../../../layout/Client';
import Loading from '../../../components/loading';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import fields from '../../../utils/productDetailsText'

var pp = (el) => {
    console.log(el)
}
// import queryGetProductInfoString
//     from '../../../controllers/product/product.details.login.query.gql';
//==============================================================================


var QUERY_PRODUCT_BY_ID = gql`
    query queryProductById($input: ID!){
        queryProductById(input: $input){
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


export default function ProductDetails(props) {
    let router = useRouter()
    let {pid} = router.query
    pp(pid)
    var {loading, error, data} = useQuery(QUERY_PRODUCT_BY_ID, {
        variables: {
            input: pid
        }
    })

    if (loading) return <Loading/>;
    if (error) return <div>`Error: ${error.message}`</div>

    let _p = data.queryProductById


    return (

        loading ? <div>loading...</div> :
            <ClientLayout>
                <div
                    className="h-full w-full flex justify-center items-center relative z-50">
                    <div className="flex flex-row container h-full p-20">

                        <div className={`w-full h-2/3`}>
                            <ImageScroll listOfImages={_p.listOfImages}/>
                        </div>

                        <div className="w-full px-10">
                            <div
                                className="flex items-center font-deco text-3xl font-black">
                                {_p.name}
                            </div>
                            <div
                                className="text-lg font-simp text-justify">{_p.description}</div>
                            <div
                                className="font-deco container grid grid-rows-2">
                                <div
                                    className="
                                text-5xl flex items-end justify-center">
                                    {`$${_p.price.amount} ${_p.price.currency}`}
                                </div>
                                <div
                                    className="
                                text-2xl flex justify-center">
                                    {fields.shippingIncluded.text}
                                </div>
                            </div>

                            <div className="h-44 grid grid-rows-3">
                                <div
                                    className="
                                    flex items-end justify-center
                                    text-3xl py-10"
                                >{fields.buyWith.text}
                                </div>
                                <div className="flex justify-center">
                                    <img src="/PaypalLogo.png"
                                         className="h-10"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        className="button-red h-full w-60 flex justify-center items-center">
                                        <img src="/shopping-cart.png"
                                             className="h-10 w-10"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div
                                className="h-44 flex justify-center items-center font-deco text-2xl">{fields.estimatedDeliveryCloses.text}</div>
                        </div>
                    </div>
                </div>
            </ClientLayout>

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
                                    <div className={`h-full`}>

                                        <img
                                            key={uuidv4()}
                                            className={`
                                        block m-auto rounded-md 
                                        object-contain 
                                    `}
                                            src={_img}
                                            alt=""
                                        />
                                    </div>
                                )
                            }
                        )
                    }
                </Slider>
            </div>
        </div>
    )
}

