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


export default function CartProduct({product}) {
    let cartState = useContext(CartContext)
    let [productData, setProductData] = useState(product)
    let {price, name, thumbnail} = product

    function removeFromCart(e) {
        e.preventDefault()
        cartState.removeProduct(productData)
    }


    function __updateQuantity(e) {
        e.preventDefault()
        let newProduct = produce(productData, (p) => {
            p.quantity = e.target.value
        })
        setProductData(newProduct)
        cartState.updateProduct(newProduct)
    }

    function QuantityPicker({limit}) {
        let listOfNumbers = []
        for (let n = 0; n < limit; n++) {
            listOfNumbers.push(n + 1)
        }

        return (
            <div className="text-md">
                <select onChange={__updateQuantity}
                        value={productData.quantity}>
                    {
                        listOfNumbers.map((i) => {
                            return (
                                <option value={i} key={uuid()}>{i}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }


    return (
        <div className="cart-card-product relative border">
            <div className="
            flex justify-between font-deco text-lg font-black items-center
            ">
                <div className="text-dark">
                    {name}
                </div>
                <button
                    onClick={removeFromCart}
                    className="
                    bg-red text-white rounded px-2
                    ">X
                </button>
            </div>
            <div className="flex font-simp">
                <div className="w-1/3">
                    <img className="rounded border border-dark"
                         src={thumbnail}/>
                </div>
                <div className="mx-8">
                    <QuantityPicker limit={productData.purchaseLimit}/>
                    <div className="text-lg">
                        {`$${price.amount * productData.quantity} ${price.currency}`}
                    </div>
                </div>
            </div>
        </div>
    )
}

