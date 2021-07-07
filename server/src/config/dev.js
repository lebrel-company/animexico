'use strict';
// libraries:
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================

export var devKeys = {
    aws: {
        bucket: 'lebrel.tamashii',
        accessKeyId: 'AKIAUNJCWA5RLIIBWK44',
        secretAccessKey: 'qMpzzRrqwaOnWR1t1JEu34O3mooGLTPsEebFiBOer'
    },
    paypal: {
        client: 'AWRqzvZX9poAvA67i306KiwGx82vdxVrhy0BcB6aJLCi_ihcalvYmFMzavW6SRngbRLkF2eUqUMGL2BU',
        secret: 'EKDfGW7hhCPV-OYQpDj8wpYToo72O_U2LOQSAB4j4JikvASovjDOxWqksxNy7hmsQBqEF4VvLLK-UyMX',
        api: 'https://api-m.sandbox.paypal.com/v1/payments/payment'
    },
    mongodb: {
        host: 'mongodb://tamashii-mongo/database'
    }
}

