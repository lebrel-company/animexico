'use strict';
const {ApolloServer} = require('apollo-server');
const {loadSchemaType} = require('./utils/schema');
const {merge} = require('lodash');
const jsonWebToken = require('jsonwebtoken')
const mongoConnection = require('./config/database.js');
const product = require('./types/product/product.resolvers');
const user = require('./types/user/user.resolvers');
const order = require('./types/order/order.resolvers');

mongoConnection();

async function start() {
    const types = ['product', 'user', 'order', 'address']
    const schemaTypes = await Promise.all(types.map(loadSchemaType))

    const server = new ApolloServer({
        typeDefs: [...schemaTypes],
        resolvers: merge({}, product, user, order),
        context: ({req}) => {
            const token = req.headers['authorization'] || '';
            if (token) {
                try {
                    const user = jsonWebToken.verify(
                        token.replace('Bearer ', ''),
                        process.env.SECRET
                    );
                    return {
                        user: user
                    }
                } catch (error) {
                    console.log('There was an error');
                    console.log(error);
                }
            }
        }
    });

    const { url } = await server.listen()
        .then(function ({url}){
            console.log('Listening on localhost:5000/api')
        })
}

//==============================================================================

export default start
