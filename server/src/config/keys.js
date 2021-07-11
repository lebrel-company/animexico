'use strict';
// libraries:
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


export const KEYS = {
    aws: {
        bucket: process.env.AWS_BUCKET,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    paypal: {
        client: process.env.PAYPAL_CLIENT,
        secret: process.env.PAYPAL_SECRET,
        api: process.env.PAYPAL_PAYMENT_API
    },
    mongodb: {
        connection_string: function () {
            if (process.env.MONGO) {
                return process.env.MONGO

            } else {
                throw Error(`MONGO connection string: ${process.env.MONGO}`)
            }
        }
    },
    server: {
        port: parseInt(process.env.PORT)
    }
}

