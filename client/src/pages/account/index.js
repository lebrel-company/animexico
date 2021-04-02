'use strict';
// libraries:
import {useContext, useState} from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from "../../context/AuthContext"
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import ClientLayout from "../../layout/Client";
import Address from "../../components/client/address"

// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function Account() {
    var authContext = useContext(AuthContext)
    

    console.log(authContext)
    return(
        <ClientLayout>
            <div className='container grid grid-cols-2 gap-4'>
                <div className='font-deco h-1/5 text-4xl font-bold flex items-center col-span-1'>
                    Juan Perez
                </div>
                <div className='py-16'>
                    <div>
                        <Address/>
                    </div>
                </div>
            </div>
            
        </ClientLayout>
    )

}

