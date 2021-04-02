// libraries:
import { useState, createContext } from 'react';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


const AuthContext = createContext();
const Provider = AuthContext.Provider;

function AuthProvider(props) {
    const _token = localStorage.getItem('token');
    const _userInfo = localStorage.getItem('userInfo');
    const _expiresIn = localStorage.getItem('expiresIn');

    const [authState, setAuthState] = useState({
        token: _token,
        expiresIn: _expiresIn,
        userInfo: _userInfo ? JSON.parse(_userInfo) : {}
    });

    function isAdmin() {
        return authState.userInfo.role === 'ADMIN';
    }

    function logout() {
        setAuthState({
            token: null,
            expiresIn: null,
            userInfo: {}
        });
    }

    function populateAuthData(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('expiresIn', data.expiresIn);
        localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
        setAuthState({
            token: data.token,
            expiresIn: data.expiresIn,
            userInfo: data.userInfo
        });
    }

    function isAuthenticated() {
        if (!authState.token || !authState.expiresIn) {
            return false;
        }
        return (new Date().getTime() / 1000) < authState.expiresIn;
    }

    return (
        <Provider
            value={ {
                authState: authState,
                setAuthState:
                    function (userData) {
                        populateAuthData(userData);
                    },
                isAdmin: isAdmin,
                isAuthenticated: isAuthenticated(),
                logout: logout
            } }
        >
            {
                props.children
            }
        </Provider>
    );
}

export { AuthContext, AuthProvider };