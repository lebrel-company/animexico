'use strict';
// libraries:
import _ from 'lodash'
import {useState, createContext, useEffect, useContext} from 'react';
import produce from 'immer'
import {useQuery, useMutation, gql} from '@apollo/client'
import {DateTime, Duration} from 'luxon'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from './AuthContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import QUERY_CART from '../operations/queryCart.gql'
import CREATE_CART from '../operations/createCart.gql'
import DELETE_CART from '../operations/deleteCart.gql'
import ADD_PRODUCT_TO_CART from '../operations/addProductToCart.gql'
import REMOVE_PRODUCT_FROM_CART from '../operations/removeProductFromCart.gql'
import UPDATE_PRODUCT_QUANTITY from '../operations/updateProductQuantity.gql'

var pp = (el) => console.log(el)
//==============================================================================


export const CartContext = createContext();
const Provider = CartContext.Provider


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

var CART_FIELD = 'cart'

export function CartProvider(props) {
    let authState = useContext(AuthContext)
    const [cart, setCart] = useState(null)
    const [address, setAddress] = useState('primary')
    const [timeLeft, setTimeLeft] = useState(20)
    const [validCart, setValidCart] = useState(true)

    let [__createCart] = useMutation(CREATE_CART, {
        onCompleted: onCompletedCartResolver
    })
    let [deleteCart] = useMutation(DELETE_CART)

    let {loading, error, data, refetch} = useQuery(
        QUERY_CART,
        {
            onCompleted: onCompletedCartResolver
        }
    )

    let [__addProductToCart] = useMutation(ADD_PRODUCT_TO_CART, {
        onCompleted: onCompletedCartResolver
    })

    let [__removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART, {
        onCompleted: onCompletedCartResolver
    })

    let [__updateProductQuantity] = useMutation(UPDATE_PRODUCT_QUANTITY, {
        onCompleted: onCompletedCartResolver
    })

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    function onCompletedCartResolver(data) {
        let _key = _.keys(data)[0]
        let __data = data[_key]
        if (
            __data.status === 'success' &&
            typeof localStorage !== undefined
        ) {
            localStorage.setItem(
                CART_FIELD, JSON.stringify(__data.cart)
            )
            setCart(__data.cart)
            setTimeLeft(
                millisToSeconds(__data.cart.timeout.end - DateTime.now().ts)
            )
            localStorage.removeItem(CART_FIELD)
            localStorage.setItem(CART_FIELD, JSON.stringify(__data.cart))
        } else {
            localStorage.removeItem(CART_FIELD)
        }
    }

    function millisToSeconds(millis) {
        return (Math.floor(millis * 0.001))
    }

    function __formatTime(millis) {
        let timer = Duration.fromMillis(millis)
        if (millis < 1) {
            return '0:00'
        } else {
            return timer.toFormat('m:ss')
        }
    }


    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    function populateCart() {
        let _cart = localStorage.getItem(CART_FIELD)

        if (_cart !== null) {
            setCart(JSON.parse(_cart))
        }
    }


    async function __deleteCart() {
        if (typeof localStorage !== 'undefined') {
            setCart(null)
            localStorage.removeItem(CART_FIELD)
        }

        try {
            let result = await deleteCart()
            return result
        } catch (_e) {
            pp(_e)
        }

    }


    function cartExists() {
        if (cart === null) {
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


    function addProduct(product) {
        if (cart === null) {
            __createCart({
                variables: {
                    input: {
                        idProduct: product.id,
                        quantity: 1
                    }
                }
            })
        } else {
            let inCart = false
            cart.listOfProducts.forEach((p) => {
                if (p.id === product.id) {
                    inCart = true
                }
            })

            if (inCart) {
                pp('Already in cart')
            } else {
                __addProductToCart({
                    variables: {
                        input: {
                            idProduct: product.id
                        }
                    }
                })
            }

        }
    }

    function removeProduct(product) {
        __removeProductFromCart({
            variables: {
                input: {
                    idProduct: product.id
                }
            }
        })
    }

    async function __updateStateAndStorage(nextState) {

        if (nextState.listOfProducts.length === 0) {
            return await __deleteCart()

        }

        setCart(nextState)

        let _input = {listOfProducts: []}

        nextState.listOfProducts.forEach((p) => {
            _input.listOfProducts.push({id: p.id, quantity: p.quantity})
        })

        let newCart = await __createCart({
            variables: {
                input: _input
            },
            update: function (cache, mutationResult) {
                let __data = mutationResult.data

                let existingCart = cache.readQuery({query: QUERY_CART})

                let listOfNewProducts = __data.createCart.cart.listOfProducts

                let updatedCart = produce(existingCart, (draft) => {
                    if (draft.queryCart?.cart?.listOfProducts) {
                        draft.queryCart.cart.listOfProducts = listOfNewProducts
                    }
                })
                cache.writeQuery({
                    query: QUERY_CART,
                    data: {
                        queryCart: updatedCart.queryCart
                    }
                })

            }
        })
        localStorage.removeItem(CART_FIELD)
        localStorage.setItem(CART_FIELD, JSON.stringify(nextState))
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

    function updateProductQuantity(product, quantity) {
        __updateProductQuantity({
            variables: {
                input: {
                    idProduct: product.id,
                    quantity: parseInt(quantity)
                }
            }
        })
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
            cartField: CART_FIELD,
            setCartState: setCart,
            deleteCart: __deleteCart,
            exists: cartExists,
            total: total,
            timer: {
                timeLeft: timeLeft,
                format: __formatTime,
                validCart: {
                    getter: validCart,
                    setter: setValidCart
                }
            },
            address: {
                setter: setAddress,
                getter: address
            },
            product: {
                exists: hasProducts,
                inCart: productInCart,
                amount: productsAmount,
                updateProductQuantity: updateProductQuantity,
                remove: removeProduct,
                add: addProduct
            }
        }}>
            {
                props.children
            }
        </Provider>
    )
}