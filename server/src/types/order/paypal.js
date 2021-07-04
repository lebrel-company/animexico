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




