'use strict';
// libraries:
import {combineReducers} from 'redux'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {productsSlice} from '../products.slice';

var pp = (el) => {
    console.log(el)
}

export default combineReducers({
    products: productsSlice.reducer
})
