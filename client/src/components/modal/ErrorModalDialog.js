'use strict';
// libraries:
import {useState} from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function ErrorModalDialog(props) {
    let [active, setActive] = useState(props.active)
    if (active) {
        return (
            <div>
                <div className='w-screen z-50 h-screen bg-dark fixed opacity-30'>
                    <button className=''
                            onClick={() => {
                                setActive(false)
                            }}>
                        close
                    </button>
                </div>
            </div>
        )
    } else {
        return null
    }
}