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
pp(process.env)

if (process.env.CI === 'true') {
    _hostname = `http://localhost:${process.env.PORT}/`
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
