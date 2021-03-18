'use strict';
// libraries:
import axios from 'axios'
import {useState} from 'react'
import {useLazyQuery} from '@apollo/client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import stringQuery from '../../controllers/file/fileUpload.query.gql'
//==============================================================================


export default function UploadImage(props){
    var [imageFile, setImageFile] = useState(null)
    var [queryAwsUrl, {loading, error}] = useLazyQuery(stringQuery)
    function onFileChange(event){
        setImageFile(event.target.files[0])
    }

    async function submitImage(event){
        event.preventDefault()
        console.log(imageFile)
        console.log(loading)
        var _data = await queryAwsUrl()
        console.log(_data)
        console.log(error)
        // await axios.put(uploadConfig.data.url, file, {
        //     'headers':{
        //         'Content-Type': file.type
        //     }
        // })
    }

    return(
        <div className='container m-auto flex justify-center items-center'>
            <form onSubmit={submitImage}>
                <input
                    onChange={onFileChange}
                    type='file' accept='image/png, image/jpeg'/>
                <input className='button-red' type='submit' value='Submit'/>
            </form>
        </div>
    )
}