const { gql } = require('apollo-server')


//Schema
const typeDefs = gql`

    type User{
        id: ID
        name: String!
        middleName: String
        lastname: String!
        secondLastname: String
        email: String
        birthday: String
        cellphone: String
        address: [Address]
        secondaryAddress: [secondaryAddress] 
        access: String
        created: String
    }

    type Address {        
        city: String!
        state: String!
        country: String!
        zipcode: Int!
        suburb: String!
        street: String!
        buildingNumber: String!
        apartmentNumber: String
    }

    type secondaryAddress {
        
        city: String
        state: String
        country: String
        zipcode: Int
        suburb: String
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
        price: [Price]
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

    type Price{
        amount: Float
        currency: String
    }

    type Order{
        id: ID
        order: [OrderGroup]
        total: Float
        user: ID
        address: ID
        created: String
        status: OrderStatus
    }

    type OrderGroup{
        id: ID
        amount: Int        
    }

    type resetPassword{
        email: String!
        password: String!
        confirmPassword: String!
        
        
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
        secondaryAddress: [SecondaryAddressInput]
        access: String
        
    }

    input UpdateUserInput{
        id: ID
        name: String
        middleName: String
        lastname: String
        secondLastname: String
        cellphone: String
        address: [AddressInput!]
    }

    input AddressInput {
        city: String!
        state: String!
        country: String!
        zipcode: Int!
        suburb: String!
        street: String!
        buildingNumber: String!
        apartmentNumber: String
        
    }

    input SecondaryAddressInput {
        city: String
        state: String
        country: String
        zipcode: Int
        suburb: String
        street: String
        buildingNumber: String
        apartmentNumber: String
        
    }

    input  authenticateInput{
        email: String!
        password: String!
    }

    input ProductInput{
        name: String!
        price: [PriceInput]!
        description: String!
        codes:[CodesInput]!
        category: String!
        stock: Int!
        available: Boolean!
        images: String!
    }

    input CodesInput{
        barcode: String
        jancode: String
    }

    input PriceInput{
        amount: Float
        currency: String
    }

    #order schema input

    input OrderProductInput{
        id: ID
        amount: Int!
        
    }

    input OrderInput {
        order: [OrderProductInput]
        total: Float!
        user: ID!
        address: ID!
        status: String
    }

    input resetPasswordInput{
        email: String!
        password: String!
        confirmPassword: String!
        
        
    }

    enum OrderStatus{
        PENDING
        COMPLETED
        CANCEL

    }

    type Query {
        #Users
        getUser(token: String!) : User
        getUserInfo: User

        #Products
        getProducts:[Product]
        getProduct(id : ID!) : Product
        
    }

    type Mutation {
        #Users
        createNewUser(input: UserInput) : User        
        authenticateUser(input: authenticateInput): Token
        deleteUser( id : ID!) : String
        updateUser( input: UpdateUserInput ) : User
        resetPassword(input: resetPasswordInput) : User

        #Productos
        newProduct(input: ProductInput) : Product
        updateProduct( id: ID!, input: ProductInput ) : Product
        deleteProduct( id : ID! ): String


        #Orders
        newOrder(input: OrderInput): Order
       
    }
`;

module.exports = typeDefs;
