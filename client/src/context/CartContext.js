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
import CREATE_CART from '../operations/updateCart.gql'
import DELETE_CART from '../operations/deleteCart.gql'

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

export function CartProvider(props) {
    var cartField = 'cart'
    let authState = useContext(AuthContext)
    const [cart, setCart] = useState({})
    const [address, setAddress] = useState('primary')
    const [timeLeft, setTimeLeft] = useState(20)
    const [activateTimer, setActivateTimer] = useState(false)
    const [formatTime, setFormatTime] = useState('')
    const [validCart, setValidCart] = useState(true)

    let [__createCart] = useMutation(CREATE_CART, {
        onCompleted: function (data) {
            onCompletedCartResolver(data)
        }
    })
    let [deleteCart] = useMutation(DELETE_CART)

    let {loading, error, data, refetch} = useQuery(
        QUERY_CART,
        {
            onCompleted: function _onCompleted(data) {
                onCompletedCartResolver(data)
            }
        }
    )

    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    function onCompletedCartResolver(data) {
        let __data = data.queryCart ? data.queryCart : data.createCart

        if (__data.status === 'success') {
            localStorage.setItem(
                cartField, JSON.stringify(__data.cart)
            )
            setCart(__data.cart)
            setTimeLeft(
                millisToSeconds(__data.cart.timeout.end - DateTime.now().ts)
            )
        } else {
            localStorage.removeItem(cartField)
        }
        setActivateTimer(true)
    }

    function millisToSeconds(millis) {
        return (Math.floor(millis * 0.001))
    }

    useEffect(
        async function triggerTimer() {
            if (activateTimer === true) {
                let _timeLeft;
                const _id = setInterval(async function () {
                    setTimeLeft(
                        function (prevState) {
                            let newState = prevState - 1
                            _timeLeft = newState
                            return prevState - 1
                        }
                    )
                    setFormatTime(__formatTime(_timeLeft))
                    if (_timeLeft <= 0) {
                        clearInterval(_id)
                        await __deleteCart()
                    }

                }, 1000)
            }
        }, [activateTimer])

    function __formatTime(seconds) {
        let timer = Duration.fromMillis(seconds * 1000)
        if (seconds < 1) {
            return '00:00'
        } else {
            return timer.toFormat('m:ss')
        }
    }


    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    function populateCart() {
        let _cart = localStorage.getItem(cartField)

        if (_cart !== null) {
            setCart(JSON.parse(_cart))
        }
    }


    async function __deleteCart() {
        if (typeof localStorage !== 'undefined') {
            setCart({})
            localStorage.removeItem(cartField)
        }

        try {
            let result = await deleteCart()
            return result
        } catch (_e) {
            pp(_e)
        }

    }


    function cartExists() {
        if (typeof localStorage !== 'undefined') {
            let _cart = localStorage.getItem(cartField)
            if (!_cart) {
                return false
            }
            return true
        }
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

            if (_.has(_cart, 'listOfProducts')) {
                _cart.listOfProducts.forEach((p) => {
                    if (p.id.toString() === product.id.toString()) {
                        productInCart = true
                    }
                })
            } else {
                _cart.listOfProducts = []
                _cart.idUser = authState.authState.userInfo.id
            }

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

                let existingCart = cache.readQuery({
                    query: QUERY_CART
                })

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
            cartField: cartField,
            setCartState: setCart,
            deleteCart: __deleteCart,
            exists: cartExists,
            total: total,
            timer: {
                timeLeft: timeLeft,
                format: formatTime,
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