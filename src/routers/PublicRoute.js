import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

export const PublicRoute = ({ 
    component: Component,
    ...rest
}) => {
    const isAuthenticated = useSelector(state => state.auth.uid)

    return (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <Redirect to="/boards" />
            ) : (
                <div className="content-container">
                    <Component {...props} />
                </div>
            )
        )}/>
    )
}

export default PublicRoute