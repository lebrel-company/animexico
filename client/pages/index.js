import Head from 'next/head';
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';


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



function Index(){

  //apollo 
  const { data, loading, error } = useQuery(GET_USER)

  console.log(data)
  console.log(loading)
  console.log(error)

  
  if(loading) return 'Cargando...';
  

  return(
    <div>
      <Layout>
        <h1>Index</h1>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Datos de {data.getUserInfo.name} {data.getUserInfo.lastname}</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            <tr key={data.getUserInfo.id}>
              <td className="border px-4 py-2">{data.getUserInfo.name}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">{data.getUserInfo.lastname}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">{data.getUserInfo.secondLastname}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">{data.getUserInfo.email}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">{data.getUserInfo.cellphone}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">{data.getUserInfo.address[0].city}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">{data.getUserInfo.address[0].state}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">{data.getUserInfo.address[0].country}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">C.P. {data.getUserInfo.address[0].zipcode}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">{data.getUserInfo.address[0].street}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">Numero {data.getUserInfo.address[0].buildingNumber}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">Interior {data.getUserInfo.address[0].apartmentNumber}</td>              
            </tr>
            <tr >
              <td className="border px-4 py-2">{data.getUserInfo.secondaryAddress[0].city}</td>              
            </tr>
          </tbody>
        </table>
      </Layout>      
    </div>
  )
}

export default Index;