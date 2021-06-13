'use strict';
// libraries:
import {createSlice} from '@reduxjs/toolkit'
import moment from 'moment'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// middleware:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)
//==============================================================================


export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        listOfProducts: [],
        lastFetched: null
    },
    reducers: {
        queryAllAvailableProducts: function _queryAllAvailableProducts() {

        }
    }
})
