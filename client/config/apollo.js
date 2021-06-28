import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';
import fetch from 'node-fetch'


const httpLink = createHttpLink({
    uri: '/api',
    fetch: fetch,
    credential: 'same-origin'
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


const client = new ApolloClient({
    ssrMode: true,
    connectToDevTools: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Product: {
                keyFields: ['code']
            },
            Cart: {
                fields: {
                    listOfProducts: {
                        merge: function (existing = [], incoming) {
                            pp(existing)
                            pp(incoming)
                        }
                    }
                }
            }
        }
    })
});

export default client;

