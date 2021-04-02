import { ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import fetch from 'node-fetch'


const httpLink = createHttpLink({
    uri: '/api',
    fetch: fetch,
    credential: 'same-origin'
});


const authLink = setContext((_, { headers }) => {
    //Read the token storage
    const token = localStorage.getItem('token');
    return{
        headers:{
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
            
        }
    }
});


const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpLink )
});

export default client;

