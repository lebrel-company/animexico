'use strict';
// libraries:
import {useEffect} from 'react'
import {useMutation} from '@apollo/client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)

//=============================================================================


export default function PaypalButton() {

    useEffect(() => {
        paypal.Button.render({
            env: 'sandbox',
            payment: function (data, actions) {
                return actions.request.post('/my-api/create-payment/')
                    .then(function (res) {
                        return res.id;
                    });
            },
            onAuthorize: function (data, actions) {
                return actions.request.post('/my-api/execute-payment/', {
                    paymentID: data.paymentID,
                    payerID: data.payerID
                })
                    .then(function (res) {
                        pp('Confirmed')
                        pp(res)
                    });
            }
        }, '#paypal-button')
    }, [])

    return <div id="paypal-button"/>
}