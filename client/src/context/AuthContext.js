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

    function isAdmin() {
        return authState.userInfo.role === 'ADMIN'
    }

    function logout() {
        console.log('Clearing site data')
        setAuthState({
            token: null,
            expiresIn: null,
            userInfo: {}
        })
    }

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
                setAuthState:
                    function (userData) {
                        populateAuthData(userData)
                    },
                isAdmin: isAdmin,
                logout: logout
            }}
        >
            {
                props.children
            }
        </Provider>
    )
}

export {AuthContext, AuthProvider}