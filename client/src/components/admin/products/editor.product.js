'use strict';
// libraries:
import {useState} from 'react'
import {useRouter} from 'next/router'
import {gql, useQuery} from '@apollo/client';
import AwesomeSlider from 'react-awesome-slider';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Dropzone from '../../dropzone'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {productButtons} from "../../../utils/buttons/product";
import {generalButtons} from "../../../utils/buttons/general";
import {productFields} from "../../../utils/fields/product";
//==============================================================================

var listOfImages = [
'https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000013333_rsqWpdMA_01_1500x.jpg',
'https://cdn.shopify.com/s/files/1/0065/2535/4073/products/SOC-GX-93-SB-Arcadia-TV-Ver.-03.jpg',
'https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000012161_Gxr51siy_03_900x.jpg',
'https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000013312_LclgAvZO_05_1500x.jpg'
]

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
                <div>
                    <AwesomeSlider className='' bullets={false}>
                        <div
                            data-src={listOfImages[0]}
                        >
                            <div hidden={!editMode} className='button-red absolute bottom-2 right-2'>
                                delete
                            </div>
                        </div>
                        <div
                            data-src={listOfImages[1]}
                        >
                            <div hidden={!editMode} className='button-red absolute bottom-2 right-2'>
                                delete
                            </div>
                        </div>
                        <div
                            data-src={listOfImages[2]}
                        >
                            <div hidden={!editMode} className='button-red absolute bottom-2 right-2'>
                                delete
                            </div>
                        </div>
                        <div
                            data-src={listOfImages[3]}
                        >
                            <div hidden={!editMode} className='button-red absolute bottom-2 right-2'>
                                delete
                            </div>
                        </div>
                        <div
                            data-src={listOfImages[4]}
                        >
                            <div hidden={!editMode} className='button-red absolute bottom-2 right-2'>
                                delete
                            </div>
                        </div>
                    </AwesomeSlider>
                </div>
                <form>
                    <div className="grid grid-cols-2 gap-4 w-full h-full pt-2">
                        <div>
                            <input
                                disabled={!editMode}
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
                                disabled={!editMode}
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
                                disabled={!editMode}
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
                                disabled={!editMode}
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
                                disabled={!editMode}
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
                                    disabled={!editMode}
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
                    <div className='my-4'>
                        <textarea
                            className='max-w-full min-w-full'
                            disabled={!editMode}
                            id={productFields.description.value}
                            type={productFields.description.type}
                            placeholder={productFields.description.name}
                            name={productFields.description.value}
                            // value={formik[productFields.price.value]}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                        />
                    </div>
                    {
                        editMode && <div className='my-4'>
                            <Dropzone
                                disabled={!editMode}
                                selectedFiles={selectedFiles}
                                setSelectedFiles={setSelectedFiles}
                            />
                        </div>
                    }
                    <div className='py-4'>
                        {
                            toggleEditMode(changeEditMode, editMode)
                        }
                    </div>
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

