'use strict';
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphQL/schema.js');
const resolvers = require('./graphQL/resolvers.js')
const jsonWebToken = require('jsonwebtoken')

const mongoConection = require('./config/database.js');

mongoConection();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        console.log(req.headers);
        const token = req.headers['authorization'] || '';
        if(token){
            try {
                const user = jsonWebToken.verify(token.replace('Bearer ', ''), process.env.SECRET);
                //console.log(user)
                return{
                    user
                }
            } catch (error) {
                console.log('There was an error');
                console.log(error);
            }
        }
    }
});


//run server
server.listen().then(({url}) => {
    console.log(`Listening ${url}`)
})
