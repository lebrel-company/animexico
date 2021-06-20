'use strict';
// libraries:
import _ from 'lodash'
import {useState, createContext, useEffect, useContext} from 'react';
import produce from 'immer'
import {useQuery, useMutation, gql} from '@apollo/client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from './AuthContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import QUERY_CART from '../operations/myCart.gql'
import UPDATE_CART from '../operations/updateCart.gql'

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
    var cartField = 'cart'
    let authState = useContext(AuthContext)
    const [cart, setCart] = useState({})

    let {loading, error, data} = useQuery(
        QUERY_CART,
        {
            onCompleted: function _onCompleted(data) {
                if (data.queryCartWithToken.status === 'success') {
                    localStorage.setItem(
                        cartField,
                        JSON.stringify(data.queryCartWithToken.cart)
                    )
                    setCart(data.queryCartWithToken.cart)
                } else {
                    localStorage.removeItem(cartField)
                }
            }
        }
    )

    useEffect(() => {
        populateCart()
    }, [])

    function populateCart() {
        let _cart = localStorage.getItem(cartField)
        if (_cart !== null) {
            setCart(JSON.parse(_cart))
        }
    }


    let [updateCart] = useMutation(UPDATE_CART, {
        onCompleted: function updateContext(data) {
            pp(data)
        }
    })


    function deleteCart() {
        setCart({})
        localStorage.removeItem(cartField)
    }

    function cartExists() {
        let _cart = localStorage.getItem(cartField)
        if (!_cart) {
            return false
        }
        return true
    }

    function updateProduct(next) {
        return function inner(product) {
            let _cart = _.cloneDeep(cart)
            let newCart = produce(_cart, (draftCart) => {
                _.forEach(draftCart.listOfProducts, (p, i) => {
                    if (p.id.toString() === product.id.toString()) {
                        draftCart.listOfProducts[i] = product
                    }
                })
            })
            next(newCart)
        }
    }


    function addProduct(next) {
        return function inner(product) {
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
                result.message = status.messages.addProduct.notExists
                result.status = status.success
            } else {
                result.message = status.messages.addProduct.exists
                result.status = status.success
            }

            next(_cart)
            return result
        }
    }

    function removeProduct(next) {
        return function inner(product) {
            let result;
            let _cart = _.cloneDeep(cart)
            let newState = produce(_cart, (draftState) => {
                let _listOffilteredProducts = _.filter(
                    draftState.listOfProducts,
                    (p) => {
                        return p.id !== product.id
                    }
                )
                draftState.listOfProducts = _listOffilteredProducts
            })
            next(newState)
        }
    }

    async function __updateStateAndStorage(nextState) {
        setCart(nextState)

        let _input = {listOfProducts: []}

        nextState.listOfProducts.forEach((p) => {
            _input.listOfProducts.push({id: p.id, quantity: p.quantity})
        })

        let newCart = await updateCart({
            variables: {
                input: _input
            }
        })
        localStorage.removeItem(cartField)
        localStorage.setItem(cartField, JSON.stringify(nextState))
    }

    function hasProducts() {
        if (_.get(cart, ['listOfProducts'])) {
            return cart.listOfProducts.length > 0
        } else {
            return false
        }

    }

    function productsAmount() {
        if (hasProducts()) return cart.listOfProducts.length
        return 0
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

    function productInCart(idProduct) {
        if (!hasProducts()) return false

        let listOfMatchedProducts = cart.listOfProducts.filter((p) => {
            return idProduct.toString() === p.id.toString()
        })

        return listOfMatchedProducts.length > 0
    }

    return (
        <Provider value={{
            cart: cart,
            update: updateCart,
            deleteCart: deleteCart,
            exists: cartExists,
            total: total,
            populateCart: populateCart,
            product: {
                exists: hasProducts,
                inCart: productInCart,
                amount: productsAmount,
                remove: removeProduct(__updateStateAndStorage),
                add: addProduct(__updateStateAndStorage),
                update: updateProduct(__updateStateAndStorage)
            }
        }}>
            {
                props.children
            }
        </Provider>
    )
}