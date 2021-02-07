import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';

const GET_USER = gql`
query getUserInfo{
  getUserInfo{
    id
    name
    middleName
    lastname
    secondLastname
    email
    cellphone
    address{
      city
      state
      country
      zipcode
      street
      buildingNumber
      apartmentNumber      
    }
    secondaryAddress{
      city
      state
      country
      zipcode
      street
      buildingNumber
      apartmentNumber  
    }
  }
}
`;



const Header = () => {

    const router = useRouter();

    //query from apollo
    const {data, loading, error} = useQuery(GET_USER); 

    //console.log(data)
    //console.log(loading)
    //console.log(error)

    if(loading) return null;


    if(!data){
        return router.push('/login')
    }

    const {name, lastname} = data.getUserInfo;

    const singOff = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }


    return (
        <div className="flex justify-between mb-10">
            <p className="mr-2">Hola: {name} {lastname}</p>

            <button
                onClick={ () => singOff() } 
                type="button"
                className="bg-black w-full sm:w-auto font-bold uppercase text-xs  py-1 px-2 text-white"    
            >
                Cerrar Sesión
            </button>
        </div> 
        
     );
}
 
export default Header;