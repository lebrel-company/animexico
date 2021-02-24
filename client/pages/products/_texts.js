'use strict';

var fields = {
    name: {
        placeholder: 'Nombre',
        id: 'name'
    },
    price: {
        amount:{
            placeholder: 'Precio',
            id: 'price.amount'
        },
        currency:{
            placeholder: 'Moneda',
            id: 'price.currency'
        }    
    },
    description: {
        placeholder:'Descripcion',
        id:'description'
    },    
    jancode:{
        placeholder: 'Jancode',
        id: 'codes.jancode'
    
    },
    category:{
        placeholder: 'Categoria',
        id: 'category'
    },
    stock:{
        placeholder: 'stock',
        id:'stock'
    },
    available:{
        placeholder:'Disponible',
        id:'available'
    },
    images:{
        placeholder:'Imagenes',
        id:'images'
    },
        
    submit: {
        id: 'submit-button',
        value: 'Enviar'
    }
}

export {fields}