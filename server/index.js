const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers')

const conectarDB = require('./config/db');

//Conect to data base
conectarDB();


//server
const server = new ApolloServer({
    typeDefs,
    resolvers
});




//run server
server.listen().then(({url}) => {
    console.log(`Listening ${url}`)
})