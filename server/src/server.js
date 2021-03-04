'use strict';
const {ApolloServer} = require('apollo-server');
const {loadSchemaType} = require('./utils/schema');
const {merge} = require('lodash');
const jsonWebToken = require('jsonwebtoken')
const mongoConnection = require('./config/database.js');
import product from './types/product/product.resolvers';
import user from './types/user/user.resolvers';
import order from './types/order/order.resolvers';
mongoConnection();

const types = ['product', 'user', 'order', 'address'];

async function start() {
    let schemaTypes = await Promise.all(types.map(loadSchemaType));


    const rootSchema = `
        schema {
            query: Query
            mutation: Mutation
        }
    `


    const server = new ApolloServer({
        typeDefs: [rootSchema, ...schemaTypes],
        resolvers: merge({}, product, user, order),
        context: ({req}) => {
            console.log('\n\n' + '>'.repeat(100));
            console.log('HEADERS:\n\n', req.headers);
            console.log('>'.repeat(100) + '\n\n');
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

    const {url} = await server.listen()
        .then(function ({url}) {
            console.log('Listening on localhost:5000/api')
        })
}

//==============================================================================

export default start
