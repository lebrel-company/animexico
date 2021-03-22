'use strict'; // libraries:
import {useState} from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function Reports(props) {
    return (
        <div>
            <div className='flex flex-col'>
                {
                    data.map(function (data) {
                            return (
                                <div>
                                    <div>{data[0]}</div>
                                    <div>{data[1]}</div>
                                    <div>{data[2]}</div>
                                    <div>{data[3]}</div>
                                    <div>{data[4]}</div>
                                    <div>{data[5]}</div>
                                    <div>{data[6]}</div>
                                    <div>{data[7]}</div>
                                    <div>{data[8]}</div>
                                    <div>{data[9]}</div>
                                    <div>{data[10]}</div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

var data = [
    ['juan', 'jose', 'perez', 'lopez', 'dato_01', 'dato-02', 'dato_03', 'dato-04', 'dato-05', 'dato-05', 'empaquetado', 'ver orden'],
    ['maria', '', 'garcia', 'lopez', 'dato_01', 'dato-02', 'dato_03', 'dato-04', 'dato-05', 'dato-05', 'empaquetado', 'ver orden'],
    ['pedro', 'ramon', 'hernandez', 'jimenez', 'dato_01', 'dato-02', 'dato_03', 'dato-04', 'dato-05', 'dato-05', 'empaquetado', 'ver orden'],
    ['karla', 'jose', 'perez', 'lopez', 'dato_01', 'dato-02', 'dato_03', 'dato-04', 'dato-05', 'dato-05', 'empaquetado', 'ver orden'],
    ['raul', '', 'perez', 'lopez', 'dato_01', 'dato-02', 'dato_03', 'dato-04', 'dato-05', 'dato-05', 'empaquetado', 'ver orden'],
    ['mariana', 'laura', 'gutierrez', 'lopez', 'dato_01', 'dato-02', 'dato_03', 'dato-04', 'dato-05', 'dato-05', 'empaquetado', 'ver orden'],
    ['pablo', '', 'rocha', 'reyes', 'dato_01', 'dato-02', 'dato_03', 'dato-04', 'dato-05', 'dato-05', 'empaquetado', 'ver orden'],
]