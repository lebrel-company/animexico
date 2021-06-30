'use strict';
// libraries:
import {useContext, useState} from 'react';
import {v4 as uuid} from 'uuid'
import produce from 'immer'
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
//==============================================================================


const TEXTS = {
    subtotal: 'Subtotal',
    pieces: 'Piezas'
}


export default function CartProduct(props) {
    let cartState = useContext(CartContext)
    let [productData, setProductData] = useState(props.product)
    let [atCheckout, setAtCheckout] = useState(props?.atCheckout || false)
    let {price, name, thumbnail} = props.product

    function removeFromCart(e) {
        e.preventDefault()
        cartState.product.remove(productData)
    }


    function __updateQuantity(e) {
        // e.preventDefault()
        // e.stopPropagation()
        pp(e)
        let newProduct = produce(productData, (p) => {
            p.quantity = parseInt(e.target.value)
        })
        cartState.product.updateProductQuantity(newProduct, newProduct.quantity)
        setProductData(newProduct)
    }

    function subtotal() {
        return new Intl.NumberFormat(
            'es-MX',
            {style: 'currency', currency: 'MXN'}
        ).format(price.amount * productData.quantity)
    }

    function QuantityPicker({limit}) {
        let listOfNumbers = []
        for (let n = 0; n < limit; n++) {
            listOfNumbers.push(n + 1)
        }

        return (
            <>
                <select onChange={__updateQuantity}
                        disabled={!cartState.timer.validCart.getter}
                        value={productData.quantity}
                >
                    {
                        listOfNumbers.map((i) => {
                            return (
                                <option value={i} key={uuid()}>{i}</option>
                            )
                        })
                    }
                </select>
            </>
        )
    }


    return (
        <div className="cart-card-product">
            <div className="card-background bg-cross"/>
            <div className="p-2 relative z-20">
                <div className="
            flex justify-between font-deco text-lg font-black items-center
            ">
                    <div className="text-dark">
                        {name}
                    </div>
                    <button
                        onClick={removeFromCart}
                        className="bg-red text-white rounded px-2">X
                    </button>
                </div>
                <div className="flex font-simp flex items-center">
                    <div className="w-1/3">
                        <img className="thumbnail"
                             src={thumbnail}/>
                    </div>
                    <div className="mx-8 grid grid-cols-2 gap-2">
                        <div>{TEXTS.pieces}</div>
                        <div>{TEXTS.subtotal}</div>
                        <div>
                            {
                                atCheckout ? <div>{productData.quantity}</div>
                                    : <QuantityPicker
                                        limit={productData.purchaseLimit}/>
                            }
                        </div>
                        <div
                            className="
                            text-xl flex justify-center items-center
                            ">
                            {subtotal()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

