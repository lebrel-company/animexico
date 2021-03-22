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
import {productFields} from "../../../utils/fields/product";
//==============================================================================


export default function Creator() {
    var [selectedFiles, setSelectedFiles] = useState([])

    return (
        <div className='
            min-h-screen
            container m-auto md:flex justify-center
        '>
            <form className='form-dark m-auto'>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <input
                            id={productFields.name.value}
                            type={productFields.name.type}
                            placeholder={productFields.name.name}
                            name={productFields.name.value}
                            // value={formik[productFields.name.value]}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                        />
                    </div>
                    <div>
                        <input
                            id={productFields.price.value}
                            type={productFields.price.type}
                            placeholder={productFields.price.name}
                            name={productFields.price.value}
                            // value={formik[productFields.price.value]}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                        />
                    </div>
                    <div>
                        <input
                            id={productFields.pieces.value}
                            type={productFields.pieces.type}
                            placeholder={productFields.pieces.name}
                            name={productFields.pieces.value}
                            // value={formik[productFields.price.value]}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                        />
                    </div>
                    <div>
                        <input
                            id={productFields.stock.value}
                            type={productFields.stock.type}
                            placeholder={productFields.stock.name}
                            name={productFields.stock.value}
                            // value={formik[productFields.price.value]}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                        />
                    </div>
                    <div>
                        <input
                            id={productFields.code.value}
                            type={productFields.code.type}
                            placeholder={productFields.code.name}
                            name={productFields.code.value}
                            // value={formik[productFields.price.value]}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className='text-center text-pale'>
                        <label className='check-container'>
                            {productFields.block.label}
                            <input
                                id={productFields.block.value}
                                type={productFields.block.type}
                                placeholder={productFields.block.name}
                                name={productFields.block.value}
                                // value={formik[productFields.price.value]}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            />
                            <span className='checkmark'/>
                        </label>
                    </div>
                </div>

                <div className='my-2'>
                    <textarea
                        id={productFields.description.value}
                        type={productFields.description.type}
                        placeholder={productFields.description.name}
                        name={productFields.description.value}
                        // value={formik[productFields.price.value]}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                    />
                </div>
                <div className='my-2'>
                    <Dropzone
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                    />
                </div>
                <div className='flex justify-center'>
                    <div>
                        <input
                            className='button-red text-xl'
                            type='submit'
                            // value={formik[productFields.price.value]}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}



