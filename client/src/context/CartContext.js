'use strict';
// libraries:
import _ from 'lodash'
import {useState, createContext, useEffect} from 'react';
import produce from 'immer'
import {useMutation, gql} from '@apollo/client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)
//==============================================================================


export const CartContext = createContext();
const Provider = CartContext.Provider

// const DELETE_CART =


var status = {
    success: 'success',
    invalid: 'invalid',
    failed: 'failed',
    messages: {
        addProduct: {
            notExists: 'Producto agregado correctamente.',
            exists: 'El producto ya esta en el carrito.'
        }
    }
}

export function CartProvider(props) {
    let initialState = {
        id: null,
        idUser: null,
        total: null,
        timeout: (1000 * 60000),
        listOfProducts: []
    }

    const [cart, setCart] = useState(initialState)

    useEffect(function () {
        let _cart = JSON.parse(localStorage.getItem('cart'))
        if (_cart) {
            setCart(_cart)
        }
    }, [])

    function deleteCart() {
        setCart(initialState)
        localStorage.removeItem('cart')
    }

    function cartExists() {
        let _cart = localStorage.getItem('cart')
        if (!_cart) {
            return false
        }
        return true
    }

    function updateCart(newCart) {
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    function updateProduct(product) {
        let _cart = _.cloneDeep(cart)
        let newCart = produce(_cart, (draftCart) => {
            _.forEach(draftCart.listOfProducts, (p, i) => {
                if (p.id.toString() === product.id.toString()) {
                    draftCart.listOfProducts[i] = product
                }
            })
        })

        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }


    function addProduct(product) {
        let result = {
            status: null,
            message: null
        }
        let _cart = _.cloneDeep(cart)
        let productInCart = false
        _cart.listOfProducts.forEach((p) => {
            if (p.id.toString() === product.id.toString()) {
                productInCart = true
            }
        })

        if (!productInCart) {
            _cart.listOfProducts.push({
                id: product.id,
                name: product.name,
                thumbnail: product.listOfImages[0],
                price: product.price,
                quantity: 1,
                purchaseLimit: product.purchaseLimit
            })
            setCart(_cart)
            localStorage.removeItem('cart')
            localStorage.setItem('cart', JSON.stringify(_cart))
            result.message = status.messages.addProduct.notExists
            result.status = status.success
        } else {
            result.message = status.messages.addProduct.exists
            result.status = status.success
        }
        return result
    }

    function removeProduct(product) {
        let result;
        let _cart = _.cloneDeep(cart)
        let nextState = produce(_cart, (draftState) => {

            let _listOffilteredProducts = _.filter(
                draftState.listOfProducts,
                (p) => {
                    return p.id !== product.id
                }
            )
            draftState.listOfProducts = _listOffilteredProducts
        })

        setCart(nextState)
        localStorage.removeItem('cart')
        localStorage.setItem('cart', JSON.stringify(nextState))
    }

    function hasProducts() {
        return cart.listOfProducts.length > 0
    }


    function total() {
        if (!hasProducts()) {
            return 0
        }
        let {listOfProducts} = cart
        let listOfSubtotals = listOfProducts.map((p) => {
            return p.quantity * p.price.amount
        })
        return listOfSubtotals.reduce((a, c) => {
            return a + c
        })
    }

    return (
        <Provider value={{
            cart: cart,
            updateCart: updateCart,
            deleteCart: deleteCart,
            cartExists: cartExists,
            total: total,
            addProduct: addProduct,
            removeProduct: removeProduct,
            hasProducts: hasProducts,
            updateProduct: updateProduct
        }}>
            {
                props.children
            }
        </Provider>
    )
}