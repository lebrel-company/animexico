'use strict';
// libraries:
import mongoose from 'mongoose'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

export var listOfProducts = [
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Goku',
        price: {
            amount: 7000,
            currency: 'MXN'
        },
        description: 'Dragon Ball Z figuart',
        code: '123456',
        stock: 200,
        available: true,
        publish: {
            date: '2021-04-13'
        },
        purchaseLimit: 3,
        listOfImages: [
            'https://omochanoruumu.com/wp-content/uploads/2018/01/gh0.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71YRJ1CizSL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/91Y8WRGOsEL._AC_SL1500_.jpg'
        ],
        listOfTags: ['']
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Guts',
        price: {
            amount: 73030,
            currency: 'MXN'
        },
        description: 'Guts from Berserk',
        code: '12345',
        stock: 323,
        available: true,
        purchaseLimit: 1,
        publish: {
            date: '2021-02-01'
        },
        listOfImages: [
            'https://images-na.ssl-images-amazon.com/images/I/71-iF8CS68L._AC_SL1391_.jpg',
            'https://www.animecollection.es/wp-content/uploads/2020/03/x_3z0041_dretocada.jpg',
            'https://www.animecollection.es/wp-content/uploads/2020/03/x_3z0041.jpg'
        ],
        listOfTags: ['']
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Kenshin Himura',
        price: {
            amount: 7000,
            currency: 'MXN'
        },
        description: 'Kenshing amazing figure',
        code: '12345678',
        stock: 2343,
        available: true,
        purchaseLimit: 5,
        publish: {
            date: '2021-04-13'
        },
        listOfImages: [
            'https://images-na.ssl-images-amazon.com/images/I/71qPAzt74DL._AC_SL1500_.jpg',
            'https://toydistrictmanila.com/wp-content/uploads/2021/04/cc9203295cebd1b0d83b445d500aaebd.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/51wLNCUvwUL._AC_SL1000_.jpg'
        ],
        listOfTags: ['april']
    }
]

