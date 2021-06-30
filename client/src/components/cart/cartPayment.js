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
    continue: 'Ir al checkout'
}

export default function CartPayment(props) {
    const route = props.route ? props.route : mapOfRoutes.checkout.route
    const checkout = props.checkout ? props.checkout : false
    const cartState = useContext(CartContext)

    return (
        <div
            className="
            bg-dark rounded-md text-pale font-simp p-8
            flex flex-col justify-center text-center
            ">
            <div className="text-5xl">Total:</div>
            <div className="divide-y divide-pale">
                <div className="text-3xl">
                    {
                        new Intl.NumberFormat(
                            'es-MX',
                            {style: 'currency', currency: 'MXN'}
                        ).format(cartState.total())
                    }
                </div>
                <div className="text-lg">Envio Incluido</div>
            </div>
            <div className="bg-pale bg-opacity-80 flex justify-center p-5">
                <img src="/PaypalLogo.png"
                     className="h-10"
                />
            </div>
            <div className="pt-8">
                {
                    checkout ? <PaypalButton/> :
                        <Link href={route}>
                            <a className="button-blue text-xl p-2">{TEXTS.continue}</a>
                        </Link>
                }
            </div>
        </div>
    )
}
