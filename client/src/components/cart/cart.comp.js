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
import CartPayment from './cartPayment';
import CartTimeLeft from './cartTimeLeft';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import QUERY_CART from '../../operations/queryCart.gql'

var pp = (el) => console.log(el)
//==============================================================================


var texts = {
    deleteButton: 'eliminar carrito'
}

export default function CartComponent() {
    let authState = useContext(AuthContext)
    let cartState = useContext(CartContext)

    function deleteCart(event) {
        event.preventDefault()
        cartState.deleteCart()
    }

    return (
        <ClientLayout>

            <div className="
            container m-auto h-full flex flex-col items-center justify-center my-4
            ">
                {
                    cartState.exists() ?
                        <div className="my-2">
                            <CartTimeLeft/>
                        </div> : null
                }

                {
                    !authState.isAuthenticated() ? <Error401/>
                        : !cartState.exists() ? <NoProducts/>
                        : <div
                            className="
                            grid md:grid-cols-2 md:gap-4 items-center h-full
                            max-w-4xl
                            ">
                            <div className="md:h-5/6 flex flex-col">
                                <div
                                    className="md:overflow-y-scroll h-full">
                                    {
                                        cartState?.cart?.listOfProducts &&
                                        mapProducts(cartState.cart.listOfProducts)
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="my-4">
                                    <AddressPicker/>
                                </div>
                                <CartPayment total={cartState.total()}/>
                            </div>
                        </div>
                }
                {

                    cartState.exists() ? <div
                        className="w-full flex justify-center">
                        <button
                            onClick={deleteCart}
                            className="button-red my-4">
                            {texts.deleteButton}
                        </button>
                    </div> : null
                }
            </div>
        </ClientLayout>
    )
}

function NoProducts() {
    return (
        <div
            className="
            text-xl font-bold font-deco bg-pale bg-opacity-70 w-full
            text-center py-2 rounded-md shadow-xl
            ">
            No tienes ningun producto en tu carrito.
        </div>
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


