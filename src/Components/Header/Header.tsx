import React from "react"
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import {Button, Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import userPhoto from "../../Asserts/images/usersPhoto.jpg";
import {ProfileType} from "../../Types/types";

export type PropsType = {
    isAuth: boolean
    login: string | null
    profile: ProfileType | null
}
export type DispatchType = {
    logout: () => void
}
const Header: React.FC<PropsType & DispatchType> = (props) => {
    // @ts-ignore
    return (
        <>
            <header className={classes.header}>
                <img src={''}/>
                <div>
                    {props.isAuth
                        ? <div>
                            <Button size='sm' className={classes.loginButton} type='primary' onClick={props.logout}>Log out</Button>
                            <span className={classes.login}>{props.login}</span>
                            <Image className={classes.headerPhoto} src={props.profile?.photos.small|| userPhoto} alt="Avatar" roundedCircle/>
                        </div>
                        : <NavLink to="/login">Login</NavLink> }
                </div>
            </header>
        </>
    );
}

export default Header;