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
        <div className='h-full w-full container mx-auto relative z-50'>
            <div className='flex flex-col h-full w-full justify-center'>
                <div>
                    <table className='table-auto border-2 container mx-auto w-5/6'>
                        <thead>
                        <tr className='bg-dark text-pale'>
                            <th>dato_01</th>
                            <th>dato_02</th>
                            <th>dato_03</th>
                            <th>dato_04</th>
                            <th>dato_05</th>
                            <th>dato_06</th>
                            <th>dato_07</th>
                            <th>dato_08</th>
                            <th>dato_09</th>
                            <th>dato_10</th>
                            <th>dato_11</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map(function (data, index) {
                                return (
                                    <tr key={index} className='bg-pale h-10'>
                                        <td>{data[0]}</td>
                                        <td>{data[1]}</td>
                                        <td>{data[2]}</td>
                                        <td>{data[3]}</td>
                                        <td>{data[4]}</td>
                                        <td>{data[5]}</td>
                                        <td>{data[6]}</td>
                                        <td>{data[7]}</td>
                                        <td>{data[8]}</td>
                                        <td>{data[9]}</td>
                                        <td className='button-blue rounded-md'>{data[10]}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
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