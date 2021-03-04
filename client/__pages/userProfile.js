import React from 'react';
import Link from 'next/link';
import Singoff from '../components/Singoff';
import { useQuery, gql } from '@apollo/client'
import Layout from '../components/Layout';

const QUERY_USER_INFO = gql`
        query queryUserInfo{
            queryUserInfo{
            id
            name
            lastname
            middleName
            lastname
            secondLastname
            email
            birthday
            cellphone
            address{
                city
                state
                country
                zipcode
                suburb
                street
                buildingNumber
                apartmentNumber
            }
        }
    }
`;

function userProfile() {

    const {data, loading, error} = useQuery(QUERY_USER_INFO);
    console.log( data )
    console.log( loading )
    console.log( error )

    

    
   


    return (
        <div>
            <Layout/>
            
            
            <div className="container mx-auto mt-20 grid grid-cols-2 gap-4">
                <div>
                    <div className="text-2xl font-semibold">Juan Pérez</div>
                    <div className="ml-20 mt-10 text-xl">
                        Perfíl
                    </div>
                    <div className="ml-20 mt-2 text-xl">
                        <Link href="/userOrdersHistory">
                            <a>
                                {text.userOrderTitle} 
                            </a>
                        </Link>
                    </div>
                    <div className="ml-20 mt-2 text-xl">
                        <Link href="/secondaryAddress">
                            <a > {text.secondaryAddressTitle}</a>                                                  
                        </Link>
                    </div>
                    <div className="ml-20 mt-2 text-xl">
                        <Link href="/editUser">
                            <a > {text.editUser}</a>                                                  
                        </Link>
                    </div>                  
                    <div className="ml-20 mt-2 text-xl">
                        <Singoff/>
                    </div>
                    
                </div>
                
                <div className="rounded-md flex flex-col border-2 border-gray-500">
                    <div className="p-4 m-2 grid grid-cols-2 gap-4">
                        <div className="border border-gray-500">
                                nombre
                        </div>
                        <div className="border border-gray-500">
                                segundo nombre
                        </div>
                        <div className="border border-gray-500">
                                Apellido Paterno
                        </div>
                        <div className="border border-gray-500">
                                Apellido Materno
                        </div>
                        <div className="border border-gray-500">
                                Fecha de nacimiento
                        </div>
                        <div className="border border-gray-500">
                                Celular
                        </div>
                        <div className="border border-gray-500">
                                México
                        </div>
                        <div className="border border-gray-500">
                                Ciudad
                        </div>
                        <div className="border border-gray-500">
                                Estado
                        </div>
                        <div className="border border-gray-500">
                                Código Postal
                        </div>
                        <div className="border border-gray-500">
                                Calle
                        </div>
                        <div className="border border-gray-500">
                                Colonia
                        </div>
                        <div className="border border-gray-500">
                                Número Exterior
                        </div>
                        <div className="border border-gray-500">
                                Número Interior
                        </div>
                    </div>
                    
                    
                    
                </div>
            </div>
        </div>
        
    );
}

var text = {
    title: 'Perfil de usuario',
    userOrderTitle: 'Historial de pedidos',
    secondaryAddressTitle: 'Direción Opcional',
    editUser: 'Editar Usuario'
}

export default userProfile;