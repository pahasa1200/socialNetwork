import React from "react"
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";

export type PropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchType = {
    logout: () => void
}
const Header: React.FC<PropsType & DispatchType> = (props) => {
    return (
        <>
            <header className={classes.header}>
                <img src={''}/>
                <div>
                    {props.isAuth
                        ? <div><div>{props.login}</div><div><button onClick={props.logout}>Log out</button></div></div>
                        : <NavLink to="/login">Login</NavLink> }
                </div>
            </header>
        </>
    );
}

export default Header;