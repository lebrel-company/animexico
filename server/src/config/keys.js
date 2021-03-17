'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

var keys = null

if (process.env.NODE_ENV === 'dev'){
    keys = require('./dev')
}else if(process.env.NODE_ENV === 'sta'){
    keys = require('./sta')
}else if(process.env.NODE_ENV  === 'pro'){
    keys = require('./pro')
}else{
    throw Error('There is no NODE_ENV variable defined')
}

export default keys
