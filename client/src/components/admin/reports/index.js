'use strict';
// libraries:
import {useState} from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import AdministratorLayout from "../../../layout/Admin";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Creator from './creator'
import Editor from './editor'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function Products(props) {
    var [editMode, setEditMode] = useState(true)
    var [buttonText, setButtonText] = useState('')

    function toggleMode(event) {
        setEditMode(!editMode)
    }

    return (
        <div>
            <div className='relative z-20'>
                <div className='flex justify-end'>
                    <div>
                        <button
                            onClick={toggleMode}
                            className='button-blue text-3xl p-4'>
                            {
                                editMode ? 'crear producto' : 'editar producto'
                            }
                        </button>
                    </div>
                </div>
                {
                    editMode ? <Editor/> : <Creator/>
                }
            </div>
        </div>
    )
}
