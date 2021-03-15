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
        expiresAt: null,
        userInfo: {}
    })

    function populateAuthData(data) {
        setAuthState({
            token: data.token,
            expiresAt: data.expiresAt,
            userInfo: data.userInfo
        })
    }


    return (
        <Provider
            value={{
                authState: authState,
                setAuthState: function updateAuthState(userData) {
                    populateAuthData(userData)
                }
            }}
        >
            {
                children
            }
        </Provider>
    )
}

export {AuthContext, AuthProvider}