'use strict';
// libraries:
import React, { useState } from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function dropzone() {
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');

    var _states = {
        selectedFiles: {
            getter: selectedFiles,
            setter: setSelectedFiles
        },
        errorMessage: {
            getter: errorMessage,
            setter: setErrorMessage
        }
    }

    return (
        <div>
            <div className='border-2 border-pale text-pale border-dashed h-24'
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={
                    function handleFileDrop(event){
                        event.preventDefault()
                        fileDrop(event, _states)
                    }
                }
            >
                <div className='container h-full flex justify-center items-center'>
                    Dropzone
                </div>                
            </div>
            <div>
                {
                    selectedFiles.map(function formatFiles(values, index){
                        return (
                        !values.invalid && <div className='text-pale'>{values.name}</div>
                        )
                    })
                }
            </div>          
        </div>
    )
}

function removeImage(index, states){


}

function dragOver(event){
    event.preventDefault();
}

function dragEnter(event){
    event.preventDefault();
}

function dragLeave(event){
    event.preventDefault();
}

function fileDrop(event, states){
    var listOfFiles = event.dataTransfer.files;
    var listOfNewUpdatedFilesWithTag = []

    if(listOfFiles.length > 0){
        listOfNewUpdatedFilesWithTag = listOfTaggedValidFilesByType(listOfFiles)
    } 

    if(listOfNewUpdatedFilesWithTag.length > 0){
        let listOfCurrentFiles = states.selectedFiles.getter.slice()
        let listWithNewFiles = listOfCurrentFiles.concat(listOfNewUpdatedFilesWithTag)
        states.selectedFiles.setter(listWithNewFiles)
        console.log('New State: ', listWithNewFiles)
    }

}

function listOfTaggedValidFilesByType(listOfFiles){
    let result = [];
    let property = 'invalid';
    
    for(let i = 0; i < listOfFiles.length; i++){   
        result.push(listOfFiles[i])
        if(validateFileType(listOfFiles[i])){
            listOfFiles[i][property] = false;
        }else{
            listOfFiles[i][property] = true;
        }
    }
    return  result
}


function validateFileType(file){
    const validTypes = [
        'image/jpeg', 
        'image/jpg', 
        'image/png', 
        'image/gif', 
        'image/x-icon'
    ];

    return validTypes.indexOf(file.type) !== -1;
}

