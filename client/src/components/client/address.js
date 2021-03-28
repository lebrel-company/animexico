import React from 'react'

import {useState} from 'react';

function address(){

    const [editMode, setEditMode] = useState(false)

    function changeEditMode(enabled) {
        setEditMode(enabled)
    }

    return (
        <div>
            
            <form className='flex items-center'>
                    <div className='form-dark w-full h-5/5 m-auto'>
                        <div className='grid grid-cols-2 gap-2 container'>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>País</div>
                                <div>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Mexico'
                                        name='name'
                                        className='bg-pale h-8 flex items-center rounded-lg'
                                        disabled='True'
                                        // value={formik[productFields.name.value]}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Ciudad</div>
                                <div>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Ciudad'
                                        name='name'
                                        className='bg-pale h-8 flex items-center rounded-lg'
                                        disabled={!editMode}
                                        // value={formik[productFields.name.value]}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Estado</div>
                                <div>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Estado'
                                        name='name'
                                        className='bg-pale h-8 flex items-center rounded-lg'
                                        disabled={!editMode}
                                        // value={formik[productFields.name.value]}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Codigo Postal</div>
                                <div>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Codigo Postal'
                                        name='name'
                                        className='bg-pale h-8 flex items-center rounded-lg'
                                        disabled={!editMode}
                                        // value={formik[productFields.name.value]}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Calle</div>
                                <div>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Calle'
                                        name='name'
                                        className='bg-pale h-8 flex items-center rounded-lg'
                                        disabled={!editMode}
                                        // value={formik[productFields.name.value]}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Colonia</div>
                                <div>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Colonia'
                                        name='name'
                                        className='bg-pale h-8 flex items-center rounded-lg'
                                        disabled={!editMode}
                                        // value={formik[productFields.name.value]}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Número Exterior</div>
                                <div>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Número Exterior'
                                        name='name'
                                        className='bg-pale h-8 flex items-center rounded-lg'
                                        disabled={!editMode}
                                        // value={formik[productFields.name.value]}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Número Exterior</div>
                                <div>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Número Exterior'
                                        name='name'
                                        className='bg-pale h-8 flex items-center rounded-lg'
                                        disabled={!editMode}
                                        // value={formik[productFields.name.value]}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>                                                             
                        </div>
                        <div className='py-4'>
                            {
                                toggleEditMode(changeEditMode, editMode)
                            }
                        </div>
                    </div>
                </form>
        </div>
    )
}

function toggleEditMode(callback, enabled){
    if (enabled) {
        return(
            <div className='flex justify-center items-stretch gap-3'>
                <div>
                    <button
                        className='button-red w-24 h-12'>Aplicar</button>
                </div>
                <div>
                    <button onClick={
                        function (event){
                            event.preventDefault()
                            callback(false)
                        }
                    }
                        className='button-red w-24 h-12'>Cancelar</button>
                </div>
            </div>
        )
    }else{
        return (
            <div className='flex justify-center'>
                <button onClick={
                    function (event) {
                        event.preventDefault()
                        callback(true)
                    }
                } className="button-red w-24 h-12">
                    Editar
                </button>

            </div>
        )
    }
}

export default address
