import React from "react"
import { Route } from "react-router-dom"

export const PublicRoute = ({ 
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props) => (
            <div className="content-container">
                <Component {...props} />
            </div>
        )}/>
    )
}

export default PublicRoute