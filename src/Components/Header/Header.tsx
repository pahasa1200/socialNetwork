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
                        ? <div><div><span className={classes.login}>{props.login}</span>
                            <Button size='sm' className={classes.loginButton} type='primary' onClick={props.logout}>Log out</Button>
                            {/*<Image className={'a'} src={props.profile.photos.large || userPhoto} alt="Avatar" thumbnail/>*/}
                        </div></div>
                        : <NavLink to="/login">Login</NavLink> }
                </div>
            </header>
        </>
    );
}

export default Header;