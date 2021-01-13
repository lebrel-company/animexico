const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphQL/schema');
const resolvers = require('./graphQL/resolvers')

const mongoConection = require('./config/db');

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
