import React from 'react'
import buttons from '../utils/buttons.text'

function Sidebar() {

    let listOfButtons = Object.keys(buttons.sidebar)

    return (
            <div className="flex flex-col justify-between bg-dark shadow-lg bg-gradient-to-t from-dark to-darkindigo text-gray h-full w-full py-12">
                <div className='px-6'>
                    <img src='/logo.png'
                        className='
                        w-full opacity-90 lg:block hidden
                        '
                    />
            </div>

            {
                listOfButtons.map(function createButtons(stringKey){
                    return (
                        <div className='w-full flex justify-center'>
                            <button className='flex-1 text-center text-2xl
                                            transition duration-500 ease-in-out
                                            transform hover:scale-110'>
                                {buttons.sidebar[stringKey].text}
                            </button>
                        </div>
                        
                    )
                })
                
            } 
             <div className="flex justify-center p-3 m-3">
                <button className='button-red h-12 w-40 text-2xl'>
                    {buttons.signoff.text}
                </button>
            </div>                
        </div>
    )
}

export default Sidebar
