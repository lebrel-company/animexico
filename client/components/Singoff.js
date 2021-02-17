import React from 'react'
import { useQuery, gql } from '@apollo/client'

const Singoff = () => {
    return (
        <div>
            <button>
                {data.ButtonName}
            </button>
        </div>
    )
}


var data = {
    ButtonName: 'Cerrar Sesión',
}


export default Singoff
