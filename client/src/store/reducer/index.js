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
import _entities from './entities'
import {authSlice} from '../auth.slice'

var pp = (el) => {
    console.log(el)
}
//==============================================================================


export default combineReducers({
    entities: _entities,
    auth: authSlice.reducer
})