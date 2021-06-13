'use strict';
// libraries:
import util from 'util'
import fetch from 'node-fetch'
import {setContext} from 'apollo-link-context';
import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}
//==============================================================================


const httpLink = createHttpLink({
    uri: '/api',
    fetch: fetch
});


const authLink = setContext((_, {headers}) => {
    //Read the token storage
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''

        }
    }
});

export const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});



