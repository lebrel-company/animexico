'use strict';
// libraries:
import {useContext, useState} from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from '../../context/AuthContext'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import ClientLayout from '../../layout/Client';
import AddressEditor from '../../components/client/addressEditor'
import Orders from '../../components/client/orders'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function Profile() {
    var [component, setComponent] = useState('address')
    var authContext = useContext(AuthContext)
    var _u = authContext.authState.userInfo
    console.log(_u)

    function componentSelection(componentTag) {
        let result = null
        switch (componentTag) {
            case 'orders':
                result = <Orders/>
                break;
            default:
                result = <AddressEditor/>
        }
        return result
    }

    function switchComponent(value) {
        return function soWhile(event) {
            event.preventDefault
            setComponent(value)
        }
    }

    return (
        <ClientLayout>
            <div className="container">
                <div
                    className="
                    font-deco h-1/5 text-4xl font-bold flex items-center
                    justify-center col-span-1
                    ">
                    <div
                        className="
                        w-2/5 h-24 rounded-lg flex
                        items-center text-dark">
                        {
                            `${_u.firstName} ` +
                            `${_u.middleName + ' ' ? _u.middleName : ''}` +
                            `${_u.lastName ? _u.lastName : ''} ` +
                            `${_u.secondLastName ? _u.secondLastName : ''}`}
                    </div>
                </div>
                <div className="py-26">
                    <div className="flex justify-center h-14">
                        <button
                            onClick={switchComponent('address')}
                            className="
                            bg-grayblue rounded-sm font-deco w-72 ml-2 shadow-lg
                            text-2xl">Direcciones
                        </button>
                        <button
                            onClick={switchComponent('orders')}
                            className="bg-grayblue rounded-sm font-deco
                            w-72 ml-2 shadow-lg text-2xl">
                            Historial de pedidos
                        </button>
                    </div>

                    {
                        componentSelection(component)
                    }

                </div>
            </div>
        </ClientLayout>
    )

}

 