'use strict';
// libraries:
import React, {useContext} from 'react';
import {useState} from 'react';
import {v4 as uuid} from 'uuid';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {CartContext} from '../../context/CartContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {useMe} from '../../hooks/me.hook';

var pp = (el) => console.log(el)
//==============================================================================


const MAP_ADDRESS_FIELDS = {
    country: 'País',
    city: 'Ciudad',
    state: 'Estado',
    zipcode: 'Código postal',
    neighbourhood: 'Colonia',
    street: 'Calle',
    buildingNumber: 'Número exterior',
    apartmentNumber: 'Número interior'
}


export default function AddressPicker() {
    const cartState = useContext(CartContext)
    var {me, loading} = useMe()

    let colors = {
        white: 'font-deco border-pale border-b-2 text-xl shadow-lg text-pale',
        blue: 'font-deco border-lightblue border-b-2 text-lg shadow-lg text-ligthblue'
    }

    function selectAddress(address) {
        return function (event) {
            event.preventDefault()
            cartState.address.setter(address)
        }
    }

    function mapAddress() {
        if (loading) return <div className="text-pale">Cargando
            direcciones...</div>

        if (me) {
            let myAddress = me.mapOfAddresses[cartState.address.getter]
            let keys = _.remove(Object.keys(myAddress), (_k) => {
                return _k !== '__typename'
            })


            let result = keys.map(function (k) {
                return (
                    <div key={uuid()}>
                        <div className="text-pale py-2 text-sm">
                            {MAP_ADDRESS_FIELDS[k]}:
                            <span className="font-bold pl-4">
                                {myAddress[k]}
                            </span>
                        </div>
                    </div>
                )
            })
            return result
        }
    }

    function createAddressButtons() {
        let _primary = _.get(me, ['mapOfAddresses', 'primary'])
        let _secondary = _.get(me, ['mapOfAddresses', 'secondary'])

        return (
            <div className="flex mx-auto">
                {
                    _primary && <button
                        onClick={selectAddress('primary')}
                        className={colors.white}>Principal
                    </button>
                }
                {
                    _secondary && <button
                        onClick={selectAddress('secondary')}
                        className={colors.white}>Secundaria
                    </button>
                }
            </div>
        )
    }

    return (
        <div className="
        bg-dark flex flex-col justify-center
        w-full p-6 rounded-md
        ">
            <div
                className="
                w-full text-pale text-opacity-80 font-deco
                text-lg text-center
                ">
                Seleciona tu dirección de entrega
            </div>
            {
                createAddressButtons()
            }
            <div className="py-5">
                {
                    mapAddress()
                }
            </div>
        </div>
    )
}
