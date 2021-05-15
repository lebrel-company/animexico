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
import Footer from '../../components/Footer';
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
                result = (
                    <div className={`container mx-auto`}>
                        <Orders/>
                    </div>
                )
                break;
            default:
                result = (
                    <div className={`container mx-auto`}>
                        <AddressEditor/>
                    </div>
                )
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
            <div className={`w-full`}>
                <div className="h-full">
                    <div className="container mx-auto flex justify-center m-10">
                        <div className="text-4xl font-deco font-dark">
                            {
                                `Bienvenido Jair Anguiano Porras`
                            }
                        </div>
                    </div>
                    <div className="">
                        <div className="flex justify-center p-4">

                            <button
                                onClick={switchComponent('address')}
                                className="
                                bg-lightpale border-2 border-dark py-4 mx-1
                                rounded-md font-deco w-72 shadow-lg
                                text-2xl"
                            >
                                Direcciones
                            </button>


                            <button
                                onClick={switchComponent('orders')}
                                className="
                                bg-lightpale border-2 border-dark
                                rounded-md font-deco w-72 shadow-lg
                                text-2xl"
                            >
                                Historial de pedidos
                            </button>
                        </div>

                        {
                            componentSelection(component)
                        }

                    </div>
                </div>
                <div className="w-screen relative z-30 bottom-0 flex-none">
                    <Footer/>
                </div>

            </div>
        </ClientLayout>
    )

}

 