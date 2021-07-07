'use strict';
// libraries:
import Link from 'next/link'
import {useContext, useState} from 'react';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {CartContext} from '../../context/CartContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import PaypalButton from './paypalButton';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {mapOfRoutes} from '../../utils/routes';

var pp = (el) => console.log(el)

//=============================================================================

const TEXTS = {
    paypalPayment: 'Pagar con Paypal',
    continue: 'Ir al checkout',
    delivery: 'Envío Incluido'
}

/*
Business:
sb-0hosx6676198@business.example.com
Uhe}oR/7

Personal:
sb-5zvnc6666941@personal.example.com
vG=-Isj3
*/

export default function CartPayment(props) {
    const route = props.route ? props.route : mapOfRoutes.checkout.route
    const checkout = props.checkout ? props.checkout : false
    const cartState = useContext(CartContext)

    return (
        <div
            className="
            bg-dark rounded-md text-pale font-simp p-8 w-full
            flex flex-col justify-center text-center
            ">
            <div className="text-xl">Total:</div>
            <div className="divide-y divide-pale">
                <div className="text-2xl">
                    {
                        new Intl.NumberFormat(
                            'es-MX',
                            {style: 'currency', currency: 'MXN'}
                        ).format(cartState.total()) + ' MXN'
                    }
                </div>
                <div className="text-lg">{TEXTS.delivery}</div>
            </div>
            {
                !checkout &&
                <div className="bg-pale bg-opacity-80 flex justify-center p-5">
                    <img src="/PaypalLogo.png" className="h-10"/>
                </div>
            }
            <div className="pt-8">
                {
                    checkout ? <PaypalButton/> :
                        <Link href={route}>
                            <a className="button-blue text-xl p-2">
                                {TEXTS.continue}
                            </a>
                        </Link>
                }
            </div>
        </div>
    )
}
