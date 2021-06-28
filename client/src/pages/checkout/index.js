'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import CheckoutComponent from '../../components/cart/checkout.comp'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)

//==============================================================================

function cart() {
    return (
        <CheckoutComponent/>
    )
}

export default cart
