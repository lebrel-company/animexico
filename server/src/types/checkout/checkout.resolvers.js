'use strict';
// libraries:
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


const CLIENT_ID = 'AckhWxBS-Yyom4xnyh7dluNlHv1ikXdYlKGuqlYjL5-Qog-NCmefjEbiLYzo0P87iW4B79u-yfx0IREk'
const SECRET = 'EKimWS4HuFYdP_a9dr4X8pwYL6A19w69R9L4_z59lQsSXhJib-j9qFWVfj7YtNJuHcvpTD0V2IN6v0ua'
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'
const auth = {user: CLIENT_ID, pass: SECRET}


