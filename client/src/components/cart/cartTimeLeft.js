'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {CartContext} from '../../context/CartContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {useCartTimer} from '../../hooks/useCartTimer';

var pp = (el) => console.log(el)
//=============================================================================


export default function CartTimeLeft() {
    const timeLeft = useCartTimer()

    return (
        <div>
            <div className="m-4 px-4 py-2 rounded-md bg-red text-white text-lg">
                <span>Te quedan </span>
                <span className="font-bold text-xl border px-2 rounded"
                >{`${timeLeft}`}</span>
                <span> para completar tu compra</span>
            </div>
        </div>
    )

}

