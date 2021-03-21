'use strict';
// libraries:
import React, {state, useState} from 'react';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Dropzone from '../../dropzone'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {generalButtons, productButtons} from "../../../utils/buttons.helpers";
//==============================================================================


export default function EditorProduct() {
    var [selectedFiles, setSelectedFiles] = useState([])
    const [editMode, setEditMode] = useState(false)

    function changeEditMode(enabled) {
        setEditMode(enabled)
    }
    return (
        <div>
            <div
                className="
                bg-dark font-simp
                border-dark shadow-lg rounded-md
                mx-4 md:m-auto p-2 border-4
                ">
                <form>
                    <div className="grid grid-cols-2 gap-4 w-full h-full pt-2">
                    </div>
                    <Dropzone
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                    />
                    {
                        toggleEditMode(changeEditMode, editMode)
                    }
                </form>
            </div>
        </div>

    )
}

function toggleEditMode(callback, enabled) {
    if (enabled) {
        return (
            <div className='flex justify-center items-stretch gap-3'>
                <div>
                    <button
                        className="button-red w-24 h-12">{productButtons.apply.text}</button>
                </div>
                <div>
                    <button onClick={
                        function (event) {
                            event.preventDefault()
                            callback(false)
                        }
                    }
                            className="button-red w-24 h-12">{productButtons.cancel.text}</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='flex justify-center'>
                <button onClick={
                    function (event) {
                        event.preventDefault()
                        callback(true)
                    }
                }
                        className="button-red w-24 h-12">{productButtons.edit.text}</button>
            </div>
        )
    }

}

