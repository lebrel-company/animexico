'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


var _hostname;

if (process.env.CI === 'true') {
    _hostname = `http://localhost:${process.env.PORT}`
} else {
    _hostname = 'http://localhost:5000/api'
}

console.log('Axios test connection:', _hostname)

export var hostname = _hostname

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}
