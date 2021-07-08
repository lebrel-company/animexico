'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

var _hostname;

if (process.env.CI === 'true') {
    _hostname = `http://localhost:${process.env.GRAPHQL_PORT}`
} else {
    _hostname = 'http://localhost:5000/api'
}

export var hostname = _hostname

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}
