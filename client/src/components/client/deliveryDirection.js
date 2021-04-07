import React from 'react';
import {useState} from 'react';


const MapOfAddresses = {
    primary: {
        city: 'Guadalajara',
        state: 'Jalisco',
        zipcode: '44600',
        neighbourhood: 'Ladrón de Guevara',
        street: 'Av. Mexico',
        buildingNumber: '2286',
        apartmentNumber: '1'
    },
    secondary:{ 
        city: 'Queretaro',
        state: 'Queretaro',
        zipcode: '76165',
        neighbourhood: 'Las Margaritas',
        street: 'primavera',
        buildingNumber: '87',
        apartmentNumber: 'D 15'
    }  
}


function deliveryDirection(){

    var [address, setAddress] = useState('primary')
    var [toggleText, setToggleText] = useState('Dirección secundaria')

    function toggleAddress(event){
        event.preventDefault()
        if(address === 'primary'){
            setAddress('secondary')
            setToggleText('Dirección primaria')
        }
        else{
            setAddress('primary')
            setToggleText('Dirección secundaria')
        }

    }

    return (
        <div className='bg-dark h-3/5 rounded-md'>
            <div className=' font-deco rounded-md m-4'>                
                <div className='font-deco text-pale flex justify-center text-2xl pt-6'>Dirección de entrega</div>
                <div className='flex justify-center p-4'>
                    <button className='bg-grayblue rounded-sm font-deco w-72 mr-2 shadow-lg text-2xl' onClick={toggleAddress}>{toggleText}</button>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                        <div className='text-pale text-xl'>País</div>
                        <div className='w-52 bg-pale text-xl'>País</div>
                    </div>
                    <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                        <div className='text-pale text-xl'>Ciudad</div>
                        <div className='w-52 bg-pale text-xl'>{MapOfAddresses[address].city}</div>
                    </div>           
                    <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                        <div className='text-pale text-xl'>Estado</div>
                        <div className='w-52 bg-pale text-xl'>{MapOfAddresses[address].state}</div>
                    </div>
                    <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                        <div className='text-pale text-xl'>Codigo Postal</div>
                        <div className='w-52 bg-pale text-xl'>{MapOfAddresses[address].zipcode}</div>
                    </div>
                    <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                        <div className='text-pale text-xl'>Calle</div>
                        <div className='w-52 bg-pale text-xl'>{MapOfAddresses[address].street}</div>
                    </div>
                    <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                        <div className='text-pale text-xl'>Colonia</div>
                        <div className='w-52 bg-pale text-xl'>{MapOfAddresses[address].neighbourhood}</div>
                    </div>
                    <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                        <div className='text-pale text-xl'>Número Exterior</div>
                        <div className='w-52 bg-pale text-xl'>{MapOfAddresses[address].buildingNumber}</div>
                    </div>
                    <div className='border-2 border-pale border-opacity-20 p-1 m-1'>
                        <div className='text-pale text-xl'>Número Interior</div>
                        <div className='w-52 bg-pale text-xl'>{MapOfAddresses[address].apartmentNumber}</div>
                    </div>
                </div>               
            </div>
        </div>
        
    )
}

export default deliveryDirection