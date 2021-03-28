import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Card from './Card'

const photos = [
    {
        title: 'Artesania TAMASHII:',
        text: 'Una promesa de calidad'
    },
    {
        title: 'Escultura:',
        text: '',
        description: 'Nuestros escultores trabajan con alma de artesano y con tecnología, así crean modelos excelentes. Algunos crean modelos a mano que se escanean digitalmente y posteriormente se corrigen. Otros escultores crean modelos digitales desde el principio. En ambos casos, el modelo se imprime en 3D y se ajusta a mano después. Esta fusión de artesanía y tecnología es lo que trae a los personajes a la vida tridimensional.' 
    },
    {
        title: 'Posabilidad:',
        text: '',
        description:'Hemos llevado la posabilidad al siguiente nivel al utilizar las más recientes ideas, materiales y técnicas. La habilidad de replicar poses y escenas icónicas es el corazón y el alma de las figuras de acción. Las figuras TAMASHII NATIONS, representadas por S.H. Figuart, se dedican a capturar el movimiento de los personajes. Articulaciones dobles, de bola y otras técnicas se emplean para ampliar el rango de movimiento y crear las mejores figuras de acción.'
    },
    {
        title: 'Materiales:',
        text: '',
        description:'Chogokin, nombrado así por la super aleación ficticia del anime “Mazinger Z”, representa nuestra prestigiada línea de figuras de metal. La dureza, pero y precisión de la aleación del zinc hace que estos productos tengan una presencia impresionante. El uso del cromo, PVC y plástico ABS incrementa el realismo de su apariencia. Esta elección cuidadosa de estos materiales es el DNA de las figuras Chogokin, y el alma de la marca TAMASHII NATIONS.'
    }
]

export default function Carousel(props){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: 'container'
    }

    return(
        <div className='flex justify-center'>
            <Slider {...settings}>
               
                {
                    photos.map((element) => {
                        return(
                                <div className='text-white text-center font-deco'>
                            
                                    <span className='font-black text-9xl'>{element.title}</span> <span className='text-3xl'>{element.text}</span>
                                        {
                                            element.description && <div className='w-1/2 text-3xl m-auto'>{element.description}</div>
                                        }
                                </div>
                            )
                        })
                }
                               
            </Slider>
        </div>
    )
    
}



