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
import {sidebarButtons, generalButtons} from '../utils/buttons.helpers'

//==============================================================================

export default function Sidebar() {

    let listOfButtons = Object.keys(sidebarButtons)

    return (
        <div
            className="admin-sidebar">
            <div className='px-6'>
                <img src='/logo.png'
                     className='opacity-90 lg:block hidden'
                />
            </div>

            {
                listOfButtons.map(function createButtons(stringKey) {
                        return (
                            <div key={uuidv4()}
                                 className='flex justify-center'>
                                <button
                                    className={sidebarButtons[stringKey].style}
                                >
                                    {sidebarButtons[stringKey].text}
                                </button>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}
