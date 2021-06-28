'use strict';
// libraries:
import {useContext, useState, useEffect} from 'react';
import {DateTime, Duration} from 'luxon'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {CartContext} from '../../context/CartContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)
//=============================================================================


export default function CartTimeLeft() {
    let cartState = useContext(CartContext)


    function now() {
        return (
            <div className="m-4 px-4 py-2 rounded-md bg-red text-white text-lg">
                <span>Te quedan </span>
                <span className="font-bold text-xl border px-2 rounded"
                >{`${cartState.timer.format}`}</span>
                <span> para completar tu compra</span>
            </div>

        )

    }

    return (
        <div>
            {now()}
        </div>
    )

}