'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

var _hostname;

if (process.env.CI){
    _hostname = `http://localhost:`
}
export const hostname = 'http://localhost:5000/api'

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}
