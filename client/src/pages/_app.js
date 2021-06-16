'use strict';
// libraries:
import {ApolloProvider} from '@apollo/client'
import 'react-awesome-slider/dist/styles.css';
import {Provider as ReduxProvider} from 'react-redux'
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
import {client} from '../config/apollo';
import {AuthProvider} from '../context/AuthContext';
import {CartProvider} from '../context/CartContext';

//==============================================================================


function MyApp({Component, pageProps}) {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <CartProvider>
                    <Component {...pageProps}/>
                </CartProvider>
            </AuthProvider>
        </ApolloProvider>
    )
}

export default MyApp
