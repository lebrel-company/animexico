'use strict';
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphQL/schema.js');
const resolvers = require('./graphQL/resolvers.js')


const mongoConection = require('./config/database.js');

//Conect to data base
mongoConection();

//server
const server = new ApolloServer({
    typeDefs,
    resolvers
});



//run server
server.listen().then(({url}) => {
    console.log(`Listening ${url}`)
})
