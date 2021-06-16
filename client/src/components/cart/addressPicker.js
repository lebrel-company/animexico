'use strict';
// libraries:
import React from 'react';
import {useState} from 'react';
import {v4 as uuid} from 'uuid';
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

const mapOfAddresses = {
    primary: {
        city: 'Guadalajara',
        state: 'Jalisco',
        zipcode: '44600',
        neighbourhood: 'Ladrón de Guevara',
        street: 'Av. Mexico',
        buildingNumber: '2286',
        apartmentNumber: '1'
    },
    secondary: {
        city: 'Queretaro',
        state: 'Queretaro',
        zipcode: '76165',
        neighbourhood: 'Las Margaritas',
        street: 'primavera',
        buildingNumber: '87',
        apartmentNumber: 'D 15'
    }
}

const mapAddressFields = {
    city: 'Ciudad',
    state: 'Estado',
    zipcode: 'Código postal',
    neighbourhood: 'Colonia',
    street: 'Calle',
    buildingNumber: 'Número exterior',
    apartmentNumber: 'Número interior'
}


export default function AddressPicker() {
    var [address, setAddress] = useState('primary')


    let colors = {
        white: 'font-deco border-pale border-b-2 text-lg shadow-lg text-pale',
        blue: 'font-deco border-lightblue border-b-2 text-lg shadow-lg text-ligthblue'
    }

    function selectAddress(address) {
        return function switchAddressData(event) {
            event.preventDefault()
            if (address === 'primary') {
                setAddress('secondary')
            } else {
                setAddress('primary')
            }
        }
    }

    function mapAddress(address) {
        let keys = Object.keys(address)

        let result = keys.map(function(k) {
            return (
                <div key={uuid()}>
                    <div className="text-pale py-2 text-sm">
                        {mapAddressFields[k]}:
                        <span className="font-bold pl-4">
                            {address[k]}
                        </span>
                    </div>
                </div>
            )
        })
        return result
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
            <div className="grid grid-cols-2 gap-4 pt-5">
                <button
                    onClick={selectAddress('primary')}
                    className={colors.white}>Principal
                </button>
                <button
                    onClick={selectAddress('secondary')}
                    className={colors.white}>Secundaria
                </button>
            </div>
            <div className="py-5">
                {
                    mapAddress(mapOfAddresses[address])
                }
            </div>
        </div>
    )
}
