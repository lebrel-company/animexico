'use strict';
// libraries:
import {useEffect, useState} from 'react'
import {useMutation} from '@apollo/client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import PAYMENT from '../../operations/createPayment.gql'

var pp = (el) => console.log(el)
//=============================================================================


export default function PaypalButton() {
    const [payment, setPayment] = useState(null)
    const [__createPayment] = useMutation(PAYMENT, {
        onCompleted: function (data) {
            setPayment(data.createPayment)
        }
    })

    useEffect(() => {
        paypal.Buttons({
            env: 'sandbox',
            createOrder: async function (data, actions) {
                let payment = await __createPayment()
                let token;
                for (let link of payment.data.createPayment.links) {
                    if (link.rel === 'approval_url') {
                        token = link.href.match(/EC-\w+/)[0]
                    }
                }
                return token
            },
            onApprove: function (data) {
                pp(data)


            }
        }).render('#paypal-button')
    }, [])

    return <div id="paypal-button"/>
}
