'use strict';
// libraries:
import util from 'util'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


pp(process.env)

const __e = {
    aws_bucket: 'AWS_BUCKET',
    aws_access_key_id: 'AWS_ACCESS_KEY_ID',
    aws_secret_access_key: 'AWS_SECRET_ACCESS_KEY',
    paypal_client: 'PAYPAL_CLIENT',
    paypal_secret: 'PAYPAL_SECRET',
    paypal_payment_api: 'PAYPAL_PAYMENT_API',
    mongo: 'MONGO',
    apiPort: 'API_PORT'
}


function missing_env() {
    let listOfRequiredEnvVars = _.values(__e)
    let listOfErrors = []

    listOfRequiredEnvVars.forEach((env) => {
        if (!_.has(process.env, env)) {
            listOfErrors.push(env)
        }
    })

    return listOfErrors
}

var listOfMissingEnvironmentVariables = missing_env()

if (listOfMissingEnvironmentVariables.length > 0) {
    throw Error(
        `Missing Environment Variables: ${listOfMissingEnvironmentVariables.join('\n')}`
    )
    process.exit(9)
}


export const KEYS = {
    aws: {
        bucket: process.env[__e.aws_bucket],
        accessKeyId: process.env[__e.aws_access_key_id],
        secretAccessKey: process.env[__e.aws_secret_access_key]
    },
    paypal: {
        client: process.env[__e.paypal_client],
        secret: process.env[__e.paypal_secret],
        api: process.env[__e.paypal_payment_api]
    },
    mongodb: {
        connection_string: function () {
            if (process.env[__e.mongo]) {
                return process.env[__e.mongo]

            } else {
                throw Error(`MONGO connection string: ${process.env[__e.mongo]}`)
            }
        }
    },
    server: {
        port: parseInt(process.env[__e.apiPort]),
        host: process.env.API_HOST || 'tamashii-api'
    }
}

