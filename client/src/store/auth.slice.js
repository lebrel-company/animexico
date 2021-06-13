'use strict';
// libraries:
import {createSlice} from '@reduxjs/toolkit'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// middleware:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)
//==============================================================================


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        expiresIn: null,
        userInfo: {
            id: null,
            name: '',
            lastName: ''
        },
        isAuthenticated: false
    },
    reducers: {
        fetchUser: function _fetchUser(state, action) {
            state.user = 'jair'
        }
    }
})
