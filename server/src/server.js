'use strict';
// libraries:
const {ApolloServer} = require('apollo-server')
const {merge} = require('lodash')
import util from 'util'
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
import cart from './types/cart/cart.resolvers'

var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}
//==============================================================================


const types = ['product', 'cart', 'user', 'order', 'address', 'file'];

export async function Server() {
    let schemaTypes = await Promise.all(types.map(loadSchemaType));

    const rootSchema = `
        schema {
            query: Query
            mutation: Mutation
        }
    `
    return new ApolloServer({
        typeDefs: [rootSchema, ...schemaTypes],
        resolvers: merge(
            {},
            product,
            cart,
            user,
            order,
            address,
            file
        ),
        context: ({req, connection}) => {
            let token = req.headers.authorization

            if (!token){
                return {userInfo: null}
            }

            let userInfo = userFromToken(token.slice(7))
            return {userInfo}
        }
    });
}


export default async function start() {
    mongoConnection()
    let _server = await Server()
    _server.listen().then(({url}) => {
        console.log(`🚀  Server ready at ${url}`);
    });

}
