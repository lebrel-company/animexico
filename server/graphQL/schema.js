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

    type Product {
        id: ID
        name: String
        price: Boolean
        description: String
        codes:[Codes]
        category:String
        stock: Int
        available: Boolean
        images: String
        created: String
    }

    type Codes{
        barcode: String
        jancode: String
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
        name: String
        price: Float
        description: String
        codes:[CodesInput]
        category: String
        stock: Int
        available: Boolean
        images: String
    }

    input CodesInput{
        barcode: String
        jancode: String
    }

    

    type Query {
        #Users
        getUser(id: ID!) : User

        #Products
        getProducts:[Product]
        getProduct(id : ID!) : Product
    }

    type Mutation {
        #Users
        createNewUser(input: UserInput) : User        
        authenticateUser(input: authenticateInput): Token

        #Productos
        newProduct(input: ProductInput) : Product
        updateProduct( id: ID!, input: ProductInput ) : Product
        deleteProduct( id : ID! ): String
       
    }
`;

module.exports = typeDefs;
