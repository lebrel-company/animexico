'use strict';
// libraries:
import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {generalButtons} from '../utils/buttons.helpers'
//==============================================================================


export default function Dropzone(props) {
    var _states = {
        selectedFiles: {
            getter: props.selectedFiles,
            setter: props.setSelectedFiles
        },
        // errorMessage: {
        //     getter: errorMessage,
        //     setter: setErrorMessage
        // }
    }

    return (
        <div>
            <div className='border-2 border-pale text-pale border-dashed h-24'
                 onDragOver={dragOver}
                 onDragEnter={dragEnter}
                 onDragLeave={dragLeave}
                 onDrop={fileDrop(_states)}
            >
                <div
                    className='container h-full flex justify-center items-center'>
                    Dropzone
                </div>
            </div>
            <div className='pt-4'>
                {
                    props.selectedFiles.map(function formatFiles(values, index) {
                        return (
                            !values.invalid &&
                            <div key={uuidv4()} className='pt-2'>
                                <div
                                    className='
                                    container
                                    flex items-center justify-between
                                    border-2 border-pale
                                    border-opacity-10 h-12'>
                                    <div className='pl-2'>
                                        <img src='/imageIconWhite.png'
                                             className='h-6 w-6
                                        '
                                        />
                                    </div>
                                    <div className='text-pale'>
                                        {values.name}
                                    </div>
                                    <div className='pr-2'>
                                        <button
                                            onClick={removeImage(index, _states)}
                                            className='button-add'
                                        >
                                            {generalButtons.delete.text}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function removeImage(index, states) {
    return function inner(event) {
        event.preventDefault()
        let listOfUpdatedFiles = states.selectedFiles.getter.slice()
        listOfUpdatedFiles.splice(index, 1)
        states.selectedFiles.setter(listOfUpdatedFiles)
    }
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
}

function dragLeave(event) {
    event.preventDefault();
}

function fileDrop(states) {
    return function inner(event) {
        event.preventDefault()
        let listOfFiles = event.dataTransfer.files;
        let listOfNewUpdatedFilesWithTag = []
        if (listOfFiles.length > 0) {
            listOfNewUpdatedFilesWithTag = listOfTaggedValidFilesByType(listOfFiles)
        }

        if (listOfNewUpdatedFilesWithTag.length > 0) {
            let listOfCurrentFiles = states.selectedFiles.getter.slice()
            let listWithNewFiles = listOfCurrentFiles.concat(listOfNewUpdatedFilesWithTag)
            states.selectedFiles.setter(listWithNewFiles)
        }
    }
}

function listOfTaggedValidFilesByType(listOfFiles) {
    let result = [];
    let property = 'invalid';

    for (let i = 0; i < listOfFiles.length; i++) {
        result.push(listOfFiles[i])
        if (validateFileType(listOfFiles[i])) {
            listOfFiles[i][property] = false;
        } else {
            listOfFiles[i][property] = true;
        }
    }
    return result
}


function validateFileType(file) {
    const validTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/x-icon'
    ];

    return validTypes.indexOf(file.type) !== -1;
}

