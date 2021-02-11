import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers, getIsFetching} from "../../../Redux/users-selectors";
import Friends from "./Friends";
import User from "../../Users/User";
import {PropsType} from "./Friends";
import {actions, getUsers} from "../../../Redux/users-reducer";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import classes from "./Friends.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../Asserts/images/usersPhoto.jpg";
import styles from "./../../Navbar/NavbarList.module.css";
import Preloader from "../../comon/Preloader/Preloader";


export const FriendsContainer: React.FC = (props) => {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getUsers(1, 3, {term: '', friend: true}))
        return function cleanup(){
            dispatch(getUsers(1, 5, {term: '', friend: null}))
            }
    }, [])

    const users = useSelector(getAllUsers)

    useEffect( () => {
        dispatch(getUsers(1, 5, {term: '', friend: null}))
    }, [])

    return(
        <>
            <Container className={classes.friendsBlock}>
            <Row>
                <Col md={12}>
                    <h3>Friends</h3>
                    <Button size={"sm"} className={classes.friendsButton} variant={"outline-dark"}>
                        <NavLink to={'/users?friend=true'}>Friends</NavLink></Button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    {
                        users.map(u =>
                            <Friends user={u} key={u.id}/>
                        )
                    }
                </Col>
            </Row>
        </Container>
        </>
    )
}