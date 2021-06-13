'use strict';
// libraries:
import axios from 'axios'
import {gql} from '@apollo/client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// middleware:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)
//==============================================================================


export default function apiMiddleware(store) {
    return function wrapper(nextDispatch) {
        return async function inner(action) {
            if (action.type !== 'apiCallBegan') return nextDispatch(action)

            nextDispatch(action)

            try {
                let response = await axios.request({
                    baseUrl: 'http://localhost:5000/api',
                    url: action.url,
                    method: action.method,
                    data: action.data
                })
                store.dispatch({
                    type: action.onSuccess,
                    payload: response.data
                })
            } catch (_e) {
                store.dispatch({
                    type: action.onError,
                    payload: {
                        message: _e.message
                    }
                })
            }

        }
    }
}
