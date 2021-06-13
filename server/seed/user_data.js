'use strict';
// libraries:
import mongoose from 'mongoose'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

export var mapUserRegister = {
    _id: mongoose.Types.ObjectId(),
    firstName: 'Jesus',
    middleName: 'Jair',
    lastName: 'Anguiano',
    secondLastName: 'Porras',
    email: 'jairanpo@gmail.com',
    password: 'tamashii',
    birthday: '1989-10-27',
    cellphone: '3325366927',
    mapOfAddresses: {
        primary: {
            country: 'México',
            state: 'Jalisco',
            city: 'Guadalajara',
            street: 'Nicolas Leaño',
            zipcode: '44130',
            neighbourhood: 'Arcos Vallarta',
            buildingNumber: '22A',
            apartmentNumber: '1'
        }
    }
}

export var mapAdminRegister = {
    _id: mongoose.Types.ObjectId(),
    firstName: 'Sofia',
    middleName: '',
    lastName: 'López',
    secondLastName: 'Figueroa',
    email: 'sofia@gmail.com',
    password: 'tamashii',
    cellphone: '3325366927'
}

function addRole(map, role) {
    let result
    result = _.cloneDeep(map)
    result.role = role
    return result
}

export var listOfUsers = [
    addRole(mapAdminRegister, 'ADMIN'),
    addRole(mapUserRegister, 'CLIENT')
]