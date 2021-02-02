import Head from 'next/head';
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';


const GET_USER = gql`
query getUser($token:String!){
  getUser(token:$token){
    id
    name
    email
    cellphone
  }
}
`;



function Index(){

  //apollo 
  const { data } = useQuery(GET_USER)

  console.log(data)

  

  return(
    <div>
      <h1>Index</h1>
    </div>
  )
}

export default Index;