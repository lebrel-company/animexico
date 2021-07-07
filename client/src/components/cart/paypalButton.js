'use strict';
// libraries:
import {useContext, useEffect, useState} from 'react'
import {useMutation, gql} from '@apollo/client'
import {useRouter} from 'next/router'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import PAYMENT from '../../operations/createPayment.gql'
import {CartContext} from '../../context/CartContext';
import {mapOfRoutes} from '../../utils/routes';

var pp = (el) => console.log(el)
//=============================================================================

const CREATE_ORDER = gql`
    mutation createOrder($input: OrderInput!){
        createOrder(input: $input){
            __typename
            ... on OrderAccepted{
                status
                listOfOrders{
                    idUser
                    month
                    address
                    orderStatus
                    total
                    listOfProducts{
                        name
                    }
                }
            }
            ... on OrderInvalid{
                status
                message
                listOfErrors
            }
        }
    }
`


export default function PaypalButton() {
    const cartState = useContext(CartContext)
    const router = useRouter()
    const [payment, setPayment] = useState(null)
    const [_cart, setCart] = useState(null)
    const [__createPayment] = useMutation(PAYMENT, {
        onCompleted: function (data) {
            setPayment(data.createPayment)
        }
    })

    const [__createOrder] = useMutation(CREATE_ORDER)

    useEffect(() => {
        paypal.Buttons({
            env: 'sandbox',
            style: {
                size: 'responsive',
                label: 'pay',
                tagline: false,
                layout: 'horizontal'
            },
            createOrder: async function (data, actions) {
                pp(cartState.cart)
                if (cartState.cart !== null) {
                    let payment = await __createPayment()
                    let token;
                    for (let link of payment.data.createPayment.links) {
                        if (link.rel === 'approval_url') {
                            token = link.href.match(/EC-\w+/)[0]
                        }
                    }
                    return token
                }
            },
            onApprove: async function (data) {

                let remapListOfProducts = cartState.cart.listOfProducts.map(
                    (p) => {
                        return {id: p.id, quantity: p.quantity}
                    }
                )
                console.clear()
                let orderVariables = {
                    listOfProducts: remapListOfProducts,
                    address: cartState.address.getter,
                    paypal: {
                        idOrder: data.orderID,
                        idPayer: data.payerID,
                        idPayment: data.paymentID
                    }
                }
                let result = await __createOrder(
                    {
                        variables: {
                            input: orderVariables
                        }
                    }
                )
                cartState.deleteCart().then((data) => {
                    router.push(mapOfRoutes.checkoutSuccess.route)
                })
            }
        }).render('#paypal-button')
    }, [])

    return <div id="paypal-button"/>
}
