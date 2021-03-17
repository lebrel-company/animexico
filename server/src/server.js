const {ApolloServer} = require('apollo-server')
const {loadSchemaType} = require('./utils/schema')
const {merge} = require('lodash')
const mongoConnection = require('./config/database.js')
import {createToken, userFromToken} from  './utils/auth'
import product from './types/product/product.resolvers'
import user from './types/user/user.resolvers'
import order from './types/order/order.resolvers'
import address from './types/address/address.resolvers'
import file from './types/file/file.resolvers'
mongoConnection()

const types = ['product', 'user', 'order', 'address', 'file'];

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
            let user = userFromToken(token)
            return {user}
        }
    });

    const {url} = await server.listen()
        .then(function ({url}) {
            console.log('Listening on localhost:5000/api')
        })
}

//==============================================================================

export default start
