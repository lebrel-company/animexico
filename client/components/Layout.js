
import React from 'react'
import Head from 'next/head';
import Header from '../components/Header';
import Link from 'next/link';

function Layout({children}) {
    return (
        <>
            <Head>
                <title>Tamashi Nations Webshop México</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>

            </Head>
            <div className="bg-gray-200 shadow-lg w-full h-20 flex items-center">
                <div className="flex justify-center space-x-10 container">
                    <p className="font-medium text-gray-700">Inicio</p>
                    <Link href="/userProfile">
                        <a className="font-medium text-gray-700">Perfil</a>
                    </Link>
                    
                    <Link href="/toSell">
                        <a className="font-medium text-gray-700">Productos</a>
                    </Link>
                    
                    <Link href="/frequentQuestions">
                        <a className="font-medium text-gray-700">Preguntas Frecuentes</a>
                    </Link> 
                        <div>
                            <Link href="/login">
                                <button className="px-10 py-1 font-normal text-xs rounded-sm shadow-md text-gray-800 bg-white hover:bg-gray-50">
                                    Iniciar Sesión
                                </button>
                            </Link>     
                        </div>
                        <div>
                            <Link href="/purchasing">
                                <button className="px-10 py-1 font-normal text-xs rounded-sm shadow-md text-gray-800 bg-white hover:bg-gray-50">
                                    Carro de compras
                                </button>
                            </Link>
                        </div>

                </div>
                
            </div>
           {children}
        </>
    )
}

export default Layout
