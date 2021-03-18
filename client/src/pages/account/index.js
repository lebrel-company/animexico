'use strict';
// libraries:
import {useContext} from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from "../../context/AuthContext"
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function Account() {
    var authContext = useContext(AuthContext)
    console.log(authContext)
    return(
        <div>
            <div>HELLO</div>
            <div>{authContext.authState.userInfo.firstName}</div>
            <div>{authContext.authState.userInfo.middleName}</div>
            <div>{authContext.authState.userInfo.lastName}</div>
            <div>{authContext.authState.userInfo.secondLastName}</div>
            <div>{authContext.authState.token}</div>
            <div>{authContext.authState.expiresAt}</div>
        </div>
    )

}