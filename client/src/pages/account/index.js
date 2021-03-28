'use strict';
// libraries:
import {useContext, useState} from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from "../../context/AuthContext"
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import ClientLayout from "../../layout/Client";

// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function Account() {
    var authContext = useContext(AuthContext)
    const[editMode, setEditMode] = useState(false);

    function changeEditMode(enabled){
        setEditMode(enabled)
    }

    console.log(authContext)
    return(
        <ClientLayout>
            <div className='container grid grid-cols-2 gap-4'>
                <div className='font-deco h-1/5 text-4xl font-bold flex items-center col-span-1'>
                    Juan Perez
                </div>
                <form className='flex items-center'>
                    <div className='form-dark w-full h-5/5 m-auto'>
                        <div className='grid grid-cols-2 gap-2 container'>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Nombre</div>
                                <div className='bg-pale h-8 flex items-center rounded-lg'></div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Segundo Nombre</div>
                                <div className='bg-pale h-8 flex items-center rounded-lg'></div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Apellido Paterno</div>
                                <div className='bg-pale h-8 flex items-center rounded-lg'></div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Apellido Materno</div>
                                <div className='bg-pale h-8 flex items-center rounded-lg'></div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Fecha de nacimiento</div>
                                <div className='bg-pale h-8 flex items-center rounded-lg'></div>
                            </div>
                            <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                                <div className='pb-2 font-deco text-pale text-xl'>Numero de Celular</div>
                                <div>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Numero de Celular'
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
                                <div className='pb-2 font-deco text-pale text-xl'>País</div>
                                <div className='bg-pale h-8 flex items-center rounded-lg'></div>
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
                                toggleEditMode(changeEditMode,editMode)
                            }
                        </div>  
                    </div>
                </form>
            </div>
            
            {/*<div>
                <div>HELLO</div>
                <div>{authContext.authState.userInfo.firstName}</div>
                <div>{authContext.authState.userInfo.middleName}</div>
                <div>{authContext.authState.userInfo.lastName}</div>
                <div>{authContext.authState.userInfo.secondLastName}</div>
                <div>{authContext.authState.token}</div>
                <div>{authContext.authState.expiresAt}</div>
            </div>*/}
        </ClientLayout>
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