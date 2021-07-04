'use strict';
// libraries:
import {useContext, useState, useEffect} from 'react';
import {DateTime} from 'luxon'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {CartContext} from '../context/CartContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)

//=============================================================================

export function useCartTimer() {
    const cartState = useContext(CartContext)
    const [timeLeft, setTimeLeft] = useState('0:00')

    useEffect(() => {
        let idInterval = null;
        if (
            cartState.cart !== null &&
            cartState.cart.timeout.end > DateTime.local().ts
        ) {
            idInterval = setInterval(function () {
                let newTime = cartState.cart.timeout.end - DateTime.local().ts
                setTimeLeft((prevState) => {
                    return cartState.timer.format(newTime)
                })

            }, 1000)

        }
        return () => {
            if (idInterval !== null) {
                clearInterval(idInterval)
            }
        }
    }, [])

    return timeLeft
}
