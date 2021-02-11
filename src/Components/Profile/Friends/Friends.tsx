import React from 'react'
import {ProfileType, UserType} from "../../../Types/types";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import userPhoto from "../../../Asserts/images/usersPhoto.jpg";
import classes from './Friends.module.css'
import styles from "../../Users/Users.module.css";
import {NavLink} from "react-router-dom";
import {actions} from "../../../Redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getIsFetching} from "../../../Redux/users-selectors";
import Preloader from "../../comon/Preloader/Preloader";

export type PropsType = {
    user: UserType
}

const Friends: React.FC<PropsType> = (props) => {
    return (
        <>
                        {props.user.followed &&
                        <NavLink to={'/profile/' + props.user.id}>
                            <Image src={props.user.photos.small != null ? props.user.photos.small : userPhoto}
                                   className={classes.friendPhoto} thumbnail/>
                        </NavLink>
                        }
        </>
    )
}

export default Friends