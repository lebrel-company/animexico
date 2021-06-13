'use strict';
// libraries:
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {createWrapper, HIDRATE} from 'next-redux-wrapper'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// middleware:
import apiMiddleware from './middleware/api';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import _reducer from './reducer'

var pp = (el) => console.log(el)

//==============================================================================


function makeStore(context) {
    return configureStore({
        reducer: _reducer,
        middleware: [
            ...getDefaultMiddleware(),
            apiMiddleware
        ]
    })
}

export const wrapper = createWrapper(
    makeStore,
    {
        debug: true,
        devTools: true
    }
)
