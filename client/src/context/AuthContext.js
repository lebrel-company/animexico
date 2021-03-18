// libraries:
import {useState, createContext} from 'react';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

const AuthContext = createContext()
const Provider = AuthContext.Provider

function AuthProvider(props) {
    const [authState, setAuthState] = useState({
        token: null,
        expiresIn: null,
        userInfo: {}
    })

    function populateAuthData(data) {
        setAuthState({
            token: data.token,
            expiresIn: data.expiresIn,
            userInfo: data.userInfo
        })
    }

    return (
        <Provider
            value={{
                authState: authState,
                setAuthState: function (userData) {
                    populateAuthData(userData)
                }
            }}
        >
            {
                props.children
            }
        </Provider>
    )
}

export {AuthContext, AuthProvider}