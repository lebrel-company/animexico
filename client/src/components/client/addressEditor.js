import React from 'react'

import {useState} from 'react';

const MapOfAddresses = {
    primary: {
        city: 'Guadalajara',
        state: 'Jalisco',
        zipcode: '44600',
        neighbourhood: 'Ladrón de Guevara',
        street: 'Av. Mexico',
        buildingNumber: '2286',
        apartmentNumber: '1',
    },
    secondary: {
        city: 'Queretaro',
        state: 'Queretaro',
        zipcode: '76165',
        neighbourhood: 'Las Margaritas',
        street: 'primavera',
        buildingNumber: '87',
        apartmentNumber: 'D 15',
    },
}


export default function AddressEditor() {
    var [address, setAddress] = useState('primary')
    var [toggleText, setToggleText] = useState('Dirección secundaria')

    const [editMode, setEditMode] = useState(false)

    function changeEditMode(enabled) {
        setEditMode(enabled)
    }


    function toggleAddress(event) {
        event.preventDefault()
        if (address === 'primary') {
            setAddress('secondary')
            setToggleText('Dirección primaria')
        } else {
            setAddress('primary')
            setToggleText('Dirección secundaria')
        }
    }

    return (
        <div className="flex justify-center mt-2">
            <form className="flex items-center w-3/5">
                <div className="form-dark w-full h-5/5 m-auto">
                    <div className="flex justify-center pb-4">
                        <button
                            onClick={toggleAddress}
                            className="
                            bg-grayblue rounded-sm font-deco w-72 mr-2
                            text-2xl shadow-lg
                        ">{toggleText}
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 container">
                        <div
                            className="
                            border-2 border-pale border-opacity-20 p-1 m-1
                            ">
                            <div
                                className="
                                pb-2 font-deco text-pale text-xl"
                            >País
                            </div>
                            <input
                                id="name"
                                type="text"
                                placeholder="Mexico"
                                name="name"
                                className="
                                bg-pale h-8 flex items-center rounded-lg
                                "
                                disabled="True"
                                // value={formik[productFields.name.value]}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            />
                        </div>
                        <div
                            className="border-2 border-pale border-opacity-20 p-1 m-1">
                            <div
                                className="pb-2 font-deco text-pale text-xl">Ciudad
                            </div>
                            <input
                                id="name"
                                type="text"
                                placeholder={MapOfAddresses[address].city}
                                name="name"
                                className="bg-pale h-8 flex items-center rounded-lg"
                                disabled={!editMode}
                                // value={formik[productFields.name.value]}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            />
                        </div>
                        <div
                            className="border-2 border-pale border-opacity-20 p-1 m-1">
                            <div
                                className="pb-2 font-deco text-pale text-xl">Estado
                            </div>
                            <input
                                id="name"
                                type="text"
                                placeholder={MapOfAddresses[address].state}
                                name="name"
                                className="bg-pale h-8 flex items-center rounded-lg"
                                disabled={!editMode}
                                // value={formik[productFields.name.value]}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            />
                        </div>
                    </div>
                    <div
                        className="border-2 border-pale border-opacity-20 p-1 m-1">
                        <div className="pb-2 font-deco text-pale text-xl">Codigo
                            Postal
                        </div>
                        <input
                            id="name"
                            type="text"
                            placeholder={MapOfAddresses[address].zipcode}
                            name="name"
                            className="bg-pale h-8 flex items-center rounded-lg"
                            disabled={!editMode}
                            // value={formik[productFields.name.value]}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                        />
                    </div>
                    <div
                        className="border-2 border-pale border-opacity-20 p-1 m-1">
                        <div
                            className="pb-2 font-deco text-pale text-xl">Calle
                            <input
                                id="name"
                                type="text"
                                placeholder={MapOfAddresses[address].street}
                                name="name"
                                className="bg-pale h-8 flex items-center rounded-lg"
                                disabled={!editMode}
                                // value={formik[productFields.name.value]}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            />
                        </div>
                    </div>
                    <div
                        className="
                        border-2 border-pale border-opacity-20 p-1 m-1
                        ">
                        <div
                            className="pb-2 font-deco text-pale text-xl">Colonia
                            <input
                                id="name"
                                type="text"
                                placeholder={MapOfAddresses[address].neighbourhood}
                                name="name"
                                className="bg-pale h-8 flex items-center rounded-lg"
                                disabled={!editMode}
                                // value={formik[productFields.name.value]}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            />
                        </div>
                        <div
                            className="
                            border-2 border-pale border-opacity-20 p-1 m-1
                            ">
                            <div className="
                            pb-2 font-deco text-pale text-xl"
                            >Número Exterior
                            </div>
                            <input
                                id="name"
                                type="text"
                                placeholder={MapOfAddresses[address].buildingNumber}
                                name="name"
                                className="
                                    bg-pale h-8 flex items-center rounded-lg
                                "
                                disabled={!editMode}
                                // value={formik[productFields.name.value]}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            />
                        </div>
                        <div
                            className="
                            border-2 border-pale border-opacity-20 p-1 m-1
                            ">
                            <div
                                className="
                                pb-2 font-deco text-pale text-xl
                                ">Número Interior
                            </div>
                            <input
                                id="name"
                                type="text"
                                placeholder={MapOfAddresses[address].apartmentNumber}
                                name="name"
                                className="bg-pale h-8 flex items-center rounded-lg "
                                disabled={!editMode}
                                // value={formik[productFields.name.value]}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            />
                        </div>
                    </div>
                    <div className="py-4">
                        {
                            toggleEditMode(changeEditMode, editMode)
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

function toggleEditMode(callback, enabled) {
    if (enabled) {
        return (
            <div className="flex justify-center items-stretch gap-3">
                <div>
                    <button
                        className="button-red w-24 h-12">Aplicar
                    </button>
                </div>
                <div>
                    <button onClick={
                        function (event) {
                            event.preventDefault()
                            callback(false)
                        }
                    }
                            className="button-red w-24 h-12">Cancelar
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex justify-center">
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
