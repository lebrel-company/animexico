import React from 'react'
import buttons from '../utils/buttons.text'

function Sidebar() {

    let listOfButtons = Object.keys(buttons.sidebar)

    return (
        <div className="flex flex-col justify-between bg-dark shadow-lg bg-gradient-to-t from-dark to-darkindigo text-gray h-full w-full py-12">

            {
                listOfButtons.map(function createButtons(stringKey){
                    return (
                        <div className='w-full flex justify-center'>
                            <button className='text-3xl'>
                                {buttons.sidebar[stringKey].text}
                            </button>
                        </div>
                    )
                })
            }                 
        </div>
    )
}

export default Sidebar
