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
                <div className="flex flex-row container m-auto items-center
                font-simp
                ">

                    <div className="w-2/3 h-full">
                        <ImageScroll listOfImages={_p.listOfImages}/>
                    </div>

                    <div className="w-full px-10 flex flex-col justify-center">
                        <div
                            className="flex items-center font-deco text-2xl
                                font-black
                                ">
                            {_p.name}
                        </div>
                        <div
                            className="text-md font-simp text-justify">
                            {_p.description}
                        </div>
                        <div
                            className="font-deco">
                            <div
                                className="text-lg font-black items-end
                                ">
                                {`$${_p.price.amount} ${_p.price.currency}`}
                            </div>
                            <div
                                className="text-md">
                                {fields.shippingIncluded.text}
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div
                                className="flex flex-col text-xl py-10
                                items-center
                                ">{fields.buyWith.text}
                                <div className="w-32">
                                    <img src="/PaypalLogo.png"/>
                                </div>
                            </div>
                            <div className="w-full flex justify-center">
                                <button
                                    className="button-red h-full w-1/2 flex
                                    flex justify-center
                                    ">
                                    <img src="/shopping-cart.png"
                                         className="h-8 w-8"
                                    />
                                </button>
                            </div>
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
            <Slider {...settings}>
                {
                    listOfImages.map(function (_img) {
                            return (
                                <div className="showcase">
                                    <img
                                        key={uuidv4()} src={_img} alt=""
                                    />
                                </div>
                            )
                        }
                    )
                }
            </Slider>
        </div>
    )
}

