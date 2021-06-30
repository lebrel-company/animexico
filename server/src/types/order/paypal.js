'use strict';
// libraries:
import util from 'util'
import axios from 'axios'
import querystring from 'querystring'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================

export const PAYPAL_CLIENT = 'AWRqzvZX9poAvA67i306KiwGx82vdxVrhy0BcB6aJLCi_ihcalvYmFMzavW6SRngbRLkF2eUqUMGL2BU'
export const PAYPAL_SECRET = 'EKDfGW7hhCPV-OYQpDj8wpYToo72O_U2LOQSAB4j4JikvASovjDOxWqksxNy7hmsQBqEF4VvLLK-UyMX'

const PAYPAL_OAUTH_API = 'https://api-m.sandbox.paypal.com/v1/oauth2/token/';
export const PAYPAL_ORDER_API = 'https://api-m.sandbox.paypal.com/v2/checkout/orders/';
export const PAYPAL_PAYMENT_API = 'https://api-m.sandbox.paypal.com/v1/payments/payment';

//=============================================================================

function paypalEnvironment() {
    return new checkoutNodeJssdk.core.SandboxEnvironment(
        PAYPAL_CLIENT, PAYPAL_SECRET
    )
}

export function client() {
    return new checkoutNodeJssdk.core.PaymAPalHttpClient(paypalEnvironment())
}


export async function prettyPrint(jsonData, pre = '') {
    let pretty = '';

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    for (let key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            if (isNaN(key))
                pretty += pre + capitalize(key) + ': ';
            else
                pretty += pre + (parseInt(key) + 1) + ': ';
            if (typeof jsonData[key] === 'object') {
                pretty += '\n';
                pretty += await prettyPrint(jsonData[key], pre + '    ');
            } else {
                pretty += jsonData[key] + '\n';
            }

        }
    }
    return pretty;
}

//=============================================================================

export async function getToken() {
    let basicAuth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString('base64')
    let result;
    try {
        result = await axios.post(
            PAYPAL_OAUTH_API,
            querystring.stringify({'grant_type': 'client_credentials'}),
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Basic ${basicAuth}`
                }
            }
        )
        return result
    } catch (_e) {
        pp(_e.message)
    }
}




