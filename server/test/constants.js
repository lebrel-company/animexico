'use strict';
// libraries:
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {KEYS} from '../src/config/keys';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


var _hostname;


if (process.env.CI === 'true') {
    if (process.env.API_HOST === undefined) {
        throw Error('Please provide an API_HOST environment variable.')
    }
    _hostname = `http://${KEYS.server.host}:${KEYS.server.port}/`
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
