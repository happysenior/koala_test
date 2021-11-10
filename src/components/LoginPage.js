import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startLogin } from "../actions/auth"
import "./loginPage.css"

const LoginPage = () => {
    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const { error: authError } = auth
    

    const handleLogin = () => dispatch(startLogin())
    
    return (
        <div>
            <div className="container">
                <div className="logo">
                    <i className="fa fa-sticky-note-o"></i>
                    <strong className="appName">Notes.</strong>
                </div>
                <div className="error">
                    {authError}
                </div>
                <button className="login login--google" onClick={handleLogin}>
                    <i className="fa fa-google fa-fw"></i>
                    Login with Google
                </button>
                {/* <button onClick={() => dispatch(startLogout())}>Logout</button> */}
            </div>
            
        </div>
    )
}

export default LoginPage