import React from 'react';
import Link from 'next/link';
import Singoff from '../components/Singoff';
import { useQuery, gql } from '@apollo/client'

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

function Homepage() {

    const {data, loading, error} = useQuery(QUERY_USER_INFO);
    console.log( data )
    console.log( loading )
    console.log( error )

    
   


    return (
        <div>
            <div>{text.title}</div>
            <Singoff/>
            <div>
                
                
                <Link href="/secondaryAddress">
                <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                        value={text.secondaryAddressTitle}                    
                    />
                </Link>
                <Link href="/userOrdersHistory">
                <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                        value={text.userOrderTitle}                    
                    />
                </Link>
                <Link href="/editUser">
                <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                        value={text.editUser}                    
                    />
                </Link>
            </div>
        </div>
        
    );
}

var text = {
    title: 'Perfil de usuario',
    userOrderTitle: 'Ver historial de compras',
    secondaryAddressTitle: 'Añadir Dirección',
    editUser: 'Editar Usuario'
}

export default Homepage;