'use strict';
// libraries:
import {useContext} from 'react';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from '../../context/AuthContext'
import {CartContext} from '../../context/CartContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from '../../layout/Client';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import CartProduct from './cartProduct';
import CartPayment from './cartPayment';
import Error401 from '../errors/401';

var pp = (el) => console.log(el)
//=============================================================================


const TEXTS = {
    title: 'Se realizará un cobro por los siguientes productos:',
    noCart: 'Agrega productos a tu carrito.'
}


export default function CheckoutComponent() {
    const authState = useContext(AuthContext)
    const cartState = useContext(CartContext)

    if (!cartState.exists()) {
        return (
            <ClientLayout>
                <div className=" font-deco font-black text-dark
                    container m-auto text-center text-2xl
                    ">
                    {TEXTS.noCart}
                </div>
            </ClientLayout>
        )
    }

    return (
        <ClientLayout>
            <div className="
            container justify-center items-center m-auto max-w-3xl
            ">
                <div
                    className="
                    text-2xl font-deco shadow-xl
                    bg-pale p-4 bg-opacity-70 rounded text-center my-8
                    ">
                    {TEXTS.title}
                </div>
                <div className="grid md:grid-cols-2">
                    <div>
                        {
                            cartState.cart?.listOfProducts &&
                            cartState.cart.listOfProducts.map(function (p) {
                                return (
                                    <div key={p.id} className="m-2">
                                        <CartProduct
                                            product={p}
                                            atCheckout={true}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex items-center justify-center m-2">
                        <CartPayment checkout={true}/>
                    </div>
                </div>
            </div>
            }
        </ClientLayout>
    )
}