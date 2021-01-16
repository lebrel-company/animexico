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
        address: [Address] 
        access: String!
        created: String
    }

    type Address {
        
        city: String
        state: String
        country: String
        zipcode: Int
        street: String
        buildingNumber: String
        apartmentNumber: String
    }

    type Token {
        token: String
    }

    type Product{

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
        address: [AddressInput!] 
        access: String!
        
    }

    input AddressInput {
        city: String!
        state: String!
        country: String!
        zipcode: Int!
        street: String!
        buildingNumber: String!
        apartmentNumber: String
        
    }

    input  authenticateInput{
        email: String!
        password: String!
    }

    input ProductInput{
        name: String!
        price: Float!
        stock: Int!
        
    }

    type Query {
        getUser(token: String!) : User
    }

    type Mutation {
        #Users
        createNewUser(input: UserInput) : User        
        authenticateUser(input: authenticateInput): Token

        #Products
        newProduct(input: ProductInput) : Product
    }
`;

module.exports = typeDefs;
