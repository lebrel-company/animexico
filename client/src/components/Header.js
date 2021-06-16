'use strict';
// libraries:
import Link from 'next/link';
import {v4 as uuidv4} from 'uuid';
import {useContext} from 'react';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from '../context/AuthContext';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {mapOfRoutes} from '../utils/routes'
import {generalButtons} from '../utils/buttons/general';

var pp = (el) => console.log(el)
//==============================================================================


export default function Header() {
    var authState = useContext(AuthContext);
    var listOfMenuLinks = ['homepage', 'store', 'faqs'];

    if (authState.isAuthenticated()) listOfMenuLinks.push('profile');
    return (
        <div
            className="bg-black-gradient">
            <div className="container mx-auto md:p-2">
                <div
                    className="
                    flex justify-center items-center md:flex-row
                    flex-wrap p-4
                    ">
                    <img src="/logo.png"
                         className="w-1/4 opacity-90 lg:block hidden"/>
                    {
                        createRoutes(mapOfRoutes, listOfMenuLinks)
                    }
                    <div>
                        {
                            createAuthButtons(authState)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function createAuthButtons(authState) {

    function logout(e) {
        e.preventDefault()
        authState.logout()
    }

    if (authState.isAuthenticated()) {
        return (
            <div className="flex flex-row items-center h-full w-full">
                <div className="h-full m-1">
                    <Link href={generalButtons.cart.href}>
                        <button className="button-red">
                            {generalButtons.cart.text}
                        </button>
                    </Link>
                </div>
                <div className="h-full m-1">
                    <button onClick={logout}>
                        <a
                            className="button-pale-outline">
                            logout
                        </a>
                    </button>
                </div>
            </div>
        )
    }
    return (
        <>
            <Link
                href={
                    authState.isAuthenticated() ?
                        mapOfRoutes.account.route :
                        mapOfRoutes.signup.route
                }>
                <a className={` button-signup m-1 button-pale-outline`}>
                    {
                        mapOfRoutes.signup.text
                    }
                </a>
            </Link>
            <Link
                href={
                    authState.isAuthenticated() ?
                        mapOfRoutes.account.route :
                        mapOfRoutes.login.route
                }>
                <a className={`button-login m-1 button-pale-outline`}>
                    {
                        mapOfRoutes.login.text
                    }
                </a>
            </Link>
        </>
    )
}


function createRoutes(mapOfRoutes, listOfKeys) {
    return listOfKeys.map(function createLinks(value, index) {
            return (
                <div
                    key={index}
                    className={` 
                    flex-1 text-center
                    transition duration-500 ease-in-out
                    transform hover:scale-110
                    `}
                >
                    <Link href={mapOfRoutes[value]['route']}
                    >
                        <a className={` 
                        ${value}
                        text-xl font-deco text-pale
                        border-2
                        px-4
                        py-2
                        rounded-md
                        transform
                        transition
                        ease-in-out
                        duration-200
                        border-transparent
                        hover:border-pale
                        hover:border-opacity-10
                        hover:shadow-md
                        `}
                        >
                            {mapOfRoutes[value]['text']}
                        </a>
                    </Link>
                </div>
            );
        }
    );
}

//==============================================================================
// Variables:

