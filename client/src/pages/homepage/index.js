// libraries:
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useEffect } from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from "../../layout/Client";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:

import Slider from "react-slick";
import React, { Component } from "react";
import Carousel from "../../components/SliderMultipleFiles";
import SingleCarousel from "../../components/SliderSingleFile";
import Footer from "../../components/Footer";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================



function Homepage() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }



    return (
        <ClientLayout>
            <div>
                <div className='w-full flex justify-center'>
                    <div className='h-1/3 flex items-center relative'>
                        <div>
                            <button className='button-blue top-44 h-16 w-64 text-2xl z-10 ml-20 absolute'>Proximos Productos</button>
                            <img className='z-0 bg-cover rounded-md w-full relative' src='/banner-test.png' />
                        </div>
                    </div>
                </div>
                <div className='my-12'>
                    <Carousel />
                </div>
                <div className='flex justify-center items-center relative'>
                    <div className='z-30 absolute'>
                        <SingleCarousel />
                    </div>
                    <div>
                        <div className='z-10 h-full w-full absolute bg-black opacity-30'></div>
                        <video autoPlay muted loop className="myVideo w-screen">
                            <source src="/tamashiBackgroundVideo.mp4" type="video/mp4" className='z-0 relative' />
                        </video>
                    </div>
                </div>
                <div className='text-dark text-center font-deco p-20'>
                        <div className='container m-auto flex justify-center p-10 m-10'>
                            <img className='h-44 w-44' src='/tamashiiNationsQuality.png' />
                        </div>                            
                        <span className='font-black text-4xl'>EL ALMA ESTÁ EN LOS DETALLES: Esa es el alma de la artesanía TAMASHII.</span>
                        <pre className='font-deco font-semibold text-2xl pt-3'>{`
Planificación de producto basado en las pasiones del personal a cargo y las voces de los fans.
Prototipos creados con imaginación y habilidad.
Supervisión dirigida por creadores y expertos.
Control de calidad que garantiza seguridad y confianza.

Todas estas etapas ocurren en Japón.
Desde la cultura y caracterización, hasta los materiales, la obsesión de TAMASHII con el detalle busca 
la verdadera calidad artesanal. 

Después, unimos fuerzas con fabricantes internacionales. 

La combinación de la artesanía japonesa y la producción de fábrica a nivel global crean los mejores productos.
TAMASHII NATIONS QUALITY  es la prueba de la alma de la artesanía TAMASHII, un producto auténtico en el que puedes confiar.
 
Estamos dedicados a llevar lo mejor al mundo. 
Nuestra alma llena todos y canda uno de los productos que hacemos`}</pre>
                    
                </div>
                <div className='w-full relative z-30 bottom-0 flex-none'>
                    <Footer/>
                </div>
            </div>

        </ClientLayout>
    )
}






export default Homepage;