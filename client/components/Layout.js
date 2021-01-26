
import React from 'react';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';

function Layout({children}){

    const router = useRouter();

    return(
        <>
            <Head>
                <title>Tamashi MX</title>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />

                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
            </Head>

            {router.pathname === '/login' || router.pathname === '/signup' ? (
                <div className="bg-white min-h-screen flex flex-col justify-center">
                    <div>
                        { children }
                    </div>                    
                </div>
            ) : (
                <div className="bg-white min-h-screen font-mono">
                    { children }
                </div>
            )}

            

            
        </>
    );
}

export default Layout