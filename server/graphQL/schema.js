const { gql } = require('apollo-server')


//Schema
const typeDefs = gql`

    type User{
        id: ID
        name: String
        middleName: String
        lastname: String
        secondLastname: String
        email: String
        birthday: String
        cellphone: String
        city: String
        adress:[Adress]
        access: String!
        created: String
    }

    type Adress{
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
        secondLastname: String!
        email: String!
        password: String!
        birthday: String!
        cellphone: String!
        adress: [AdressInput]!
        access: String!
        
    }

    input AdressInput{
        city: String!
        state: String!
        country: String!
        zipcode: Int!
        street: String!
        buildingNumber: String!
        apartmentNumber: String
        
    }

    type Query {
        obtenerCurso: String
    }

    type Mutation {
        newUser(input: UserInput) : User
    }
`;

module.exports = typeDefs;