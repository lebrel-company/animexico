'use strict';
// libraries:
import {useState} from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import EditorProduct from './editor.product'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function Editor(props) {

    return (
        <div>
            <div>
                <button>

                </button>
            </div>
            <div
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <EditorProduct/>
                <EditorProduct/>
                <EditorProduct/>
                <EditorProduct/>
                <EditorProduct/>
                <EditorProduct/>
                <EditorProduct/>
            </div>
        </div>
    )
}

