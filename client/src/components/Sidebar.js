'use strict';
// libraries:
import React from 'react'
import {v4 as uuidv4} from 'uuid'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {generalButtons} from '../utils/buttons/general'
import {sidebarButtons} from '../utils/buttons/sidebar'
import Reports from "./admin/reports";
import Products from "./admin/products";

//==============================================================================

export default function Sidebar(props) {
    let listOfButtons = Object.keys(sidebarButtons)


    function selectComponent(component){
        return function inner () {
            props.states.component.setter(component)
        }
    }

    return (
        <div
            className="admin-sidebar">
            <div className=''>
                <img src='/logo.png'
                     className='px-4 opacity-30'/>
            </div>
            <div className='flex justify-between flex-col h-full my-auto p-10'>
                <div className='flex flex-row items-center'>
                    <div> > </div>
                    <button
                        onClick={selectComponent('home')}
                        className='button-menu'>
                        {sidebarButtons.home.text}
                    </button>
                </div>
                <div className='flex flex-row items-center'>
                    <div> > </div>
                    <button
                        onClick={selectComponent('products')}
                        className='button-menu'>
                        {sidebarButtons.products.text}
                    </button>
                </div>
                <div className='flex flex-row items-center'>
                    <div> > </div>
                    <button
                        onClick={selectComponent('contactAndPrivacy')}
                        className='button-menu'>
                        {sidebarButtons.contactAndPrivacy.text}
                    </button>
                </div>
                <div className='flex flex-row items-center'>
                    <div> > </div>
                    <button
                        onClick={selectComponent('sales')}
                        className='button-menu'>
                        {sidebarButtons.sales.text}
                    </button>
                </div>
                <div className='flex flex-row items-center'>
                    <div> > </div>
                    <button
                        onClick={selectComponent('reports')}
                        className='button-menu'>
                        {sidebarButtons.reports.text}
                    </button>
                </div>
                <div className='flex flex-row items-center'>
                    <button
                        className='button-red text-xl w-full'>
                        {sidebarButtons.logout.text}
                    </button>
                </div>
            </div>
        </div>
    )
}
