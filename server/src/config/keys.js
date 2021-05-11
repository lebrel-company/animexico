'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

var keys = null

if (process.env.NODE_ENV === 'dev') {
    keys = require('./dev')
} else {
    keys = {
        bucket: process.env.BUCKET,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
}

export default keys
