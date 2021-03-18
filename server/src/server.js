'use strict';
// libraries:
const {ApolloServer} = require('apollo-server')
const {merge} = require('lodash')
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
const mongoConnection = require('./config/database.js')
const {loadSchemaType} = require('./utils/schema')
import {createToken, userFromToken} from './utils/auth'
import product from './types/product/product.resolvers'
import user from './types/user/user.resolvers'
import order from './types/order/order.resolvers'
import address from './types/address/address.resolvers'
import file from './types/file/file.resolvers'
//==============================================================================

mongoConnection()

const types = ['product', 'toy', 'user', 'order', 'address', 'file'];

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
        resolvers: merge(
            {},
            product,
            user,
            order,
            address,
            file
        ),
        context: ({req, connection}) => {
            let token = req.headers.authorization
            let userInfo = userFromToken(token)
            return {userInfo}
        }
    });

    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });

}


//==============================================================================

export default start
