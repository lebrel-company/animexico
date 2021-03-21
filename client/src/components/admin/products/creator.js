'use strict';
// libraries:
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Dropzone from '../../dropzone'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {productFields} from "../../../utils/fields.helpers";
//==============================================================================


export default function Creator() {
    var [selectedFiles, setSelectedFiles] = useState([])
    var productFieldKeys = Object.keys(productFields)

    return (
        <div className='
            min-h-screen
            container m-auto md:flex justify-center
        '>
            <form className='form-dark m-auto'>
                <div className="grid md:grid-cols-2 gap-4">
                    {
                        productFieldKeys.map(function createInputs(data) {
                                return (
                                    <div>
                                        <input
                                            id={data.id}
                                            placeholder={data.placeholder}
                                            type={data.type}
                                        />
                                    </div>
                                )
                            }
                        )
                    }
                </div>
                <div>
                    <Dropzone
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                    />
                </div>
            </form>
        </div>
    )
}



