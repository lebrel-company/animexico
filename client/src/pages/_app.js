'use strict';
// libraries:
import {ApolloProvider} from '@apollo/client'
import 'react-awesome-slider/dist/styles.css';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import '../../styles/tailwind.css'
import '../../styles/globals.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import client from '../config/apollo';
import {AuthProvider} from '../context/AuthContext';

//==============================================================================

function MyApp({Component, pageProps}) {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <Component {...pageProps}/>
            </AuthProvider>
        </ApolloProvider>
    )
}

export default MyApp
