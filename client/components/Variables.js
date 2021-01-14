import React from 'react'

const Variables = () => {

    const saludo = 'Hola soy una constante'
    const goku = 'https://static.t13.cl/images/original/2019/05/1557689182-goku.jpg'

    return (

        <div>
            <h2>texto de prueba {saludo}</h2>
            <img src={goku}/>
        </div>
    )
}

export default Variables
