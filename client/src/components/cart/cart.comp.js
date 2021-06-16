'use strict';
// libraries:
import {useContext, useState} from 'react';
import {useQuery, gql} from '@apollo/client'
import Link from 'next/link'
import {v4 as uuid} from 'uuid'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from '../../context/AuthContext';
import {CartContext} from '../../context/CartContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from '../../layout/Client';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Error401 from '../errors/401';
import AddressPicker from './addressPicker'
import CartProduct from './cartProduct';
import Loading from '../loading';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import QUERY_CART from './queryCart.gql'

var pp = (el) => console.log(el)
//==============================================================================


var texts = {
    deleteButton: 'eliminar carrito'
}

export default function CartComponent() {
    let authState = useContext(AuthContext)
    let cartState = useContext(CartContext)
    let {loading, error, data} = useQuery(
        QUERY_CART,
        {
            onCompleted: function _onCompleted(data) {
                if (!cartState.cartExists()) {
                    let cartResult = data.queryCartWithToken
                    cartState.updateCart(cartResult.cart)
                }
            }
        }
    )


    function deleteCart(event) {
        event.preventDefault()
        pp('Deleting cart')
    }

    if (!cartState.hasProducts()) {
        return (
            <ClientLayout>
                <div
                    className="
                    text-dark font-deco text-xl shadow-lg
                    mx-auto container text-center font-bold
                    bg-pale bg-opacity-80
                ">
                    No hay productos en tu carrito.
                </div>
            </ClientLayout>
        )

    }

    return (
        <ClientLayout>
            <div className="container mx-auto flex justify-center">
                {
                    !authState.isAuthenticated() ? <Error401/>
                        : loading ? <Loading/>
                        : error ?
                            <div className="text-2xl font-bold font-deco">
                                Oops... something went wrong please try again in
                                a few minutes or contact support for help.
                            </div>
                            : !cartState.cartExists() ?
                                <div className="text-2xl font-bold font-deco">
                                    No tienes ningun producto en tu carrito.
                                </div>
                                : <div className="
                            grid lg:grid-cols-3 gap-4 items-center py-5
                            ">
                                    <div>
                                        <AddressPicker/>
                                    </div>
                                    <div>
                                        {mapProducts(cartState.cart.listOfProducts)}
                                        <div
                                            className="w-full flex justify-center my-5">
                                            <button
                                                onClick={deleteCart}
                                                className="button-underline">
                                                {texts.deleteButton}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <ContinueToPayment
                                            total={cartState.total()}/>
                                    </div>
                                </div>
                }
            </div>
        </ClientLayout>
    )
}

function mapProducts(listOfProducts) {
    let result = listOfProducts.map((p) => {
        return (
            <div className="m-2" key={p.id}>
                <CartProduct product={p}/>
            </div>
        )
    })
    return result
}

function ContinueToPayment({total}) {
    return (
        <div
            className="
            bg-dark rounded-md text-pale font-simp p-8
            flex flex-col justify-center text-center
            ">
            <div className="text-5xl">Total</div>
            <div className="divide-y divide-pale">
                <div className="text-3xl">
                    {`$${total} MXN`}
                </div>
                <div className="text-lg">Envio Incluido</div>
            </div>
            <div className="bg-pale bg-opacity-80 flex justify-center p-5">
                <img src="/PaypalLogo.png"
                     className="h-10"
                />
            </div>
            <div className="pt-8">
                <Link href="/checkout">
                    <a className={`button-blue text-3xl p-2`}>Continuar</a>
                </Link>
            </div>
        </div>
    )
}

