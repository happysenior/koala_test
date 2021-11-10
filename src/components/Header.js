import React from "react"
import { useSelector } from "react-redux"
import "./header.css"
import "./common.css" // maybe it should be imported in index

const Header = () => {
    const auth = useSelector(state => state.auth)

    const { displayName, photoURL } = auth
    return (
        <header>
            <div className="header__logo">
                <i className="fa fa-sticky-note-o"></i>
                <strong className="header__appName">Notes.</strong>
            </div>
            <div className="header__userArea">
                <img className="header__photo" src={photoURL} alt="headerphoto" />
                <div className="header__userName">
                    <div>Hello, <strong>{displayName}</strong></div>
                    <button className="button button--logout">Set User</button>
                </div>
            </div>
        </header>
    )
}

export default Header