'use strict';
// libraries:
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


var _hostname;

if (process.env.CI === 'true') {
    _hostname = `http://0.0.0.0:${process.env.PORT}/`
} else {
    _hostname = 'http://localhost:5000/api'
}

_hostname = 'http://localhost:4000'

console.log('Axios test connection:', _hostname)

export var hostname = _hostname

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}
