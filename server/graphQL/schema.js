const { gql } = require('apollo-server')


//Schema
const typeDefs = gql`
    type User{
        id: ID
        name: String
        middleName: String
        lastname: String
        secondLastName: String
        email: String
        birthday: String
        cellphone: String
        address: [Address]       
        created: String
        access: String
        
    }

    type Address{
        city: String
        state: String
        country: String
        zipcode: Int
        street: String
        buildingNumber: String
        apartmentNumber: String        
    }

    input UserInput{
        name: String!
        middleName: String
        lastname: String!
        secondLastName: String!
        email: String!
        password:String!
        birthday: String!
        cellphone: String!
        address: [AddressInput]!
        access: String!
    }

    input AddressInput{
        city: String!
        state: String!
        country: String!
        zipcode: Int!
        street: String!
        buildingNumber: String!
        apartmentNumber: String  
    }


    type Query{
        obtenerCurso: String
    }

    type Mutation{
        newUser(input: UserInput) : String
    }
  
`;

module.exports = typeDefs;