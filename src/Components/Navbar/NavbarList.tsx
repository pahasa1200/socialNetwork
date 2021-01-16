import React from 'react';
import classes from './NavbarList.module.css'
import {NavLink} from "react-router-dom";
import {Col, Container, Row} from 'react-bootstrap';


const NavbarList: React.FC = () => {
    return (
        <>
            <Container fluid={true} className={`${classes.containerNav} + text-center`}>
                <Row>
                    <Col md = {12}>
                        <nav className={'navbar-container flex-column'}>
                                    <div className={classes.item}>
                                        <NavLink to='/profile' activeClassName={classes.activeLink}>Profile</NavLink>
                                    </div>
                                    <div className={classes.item}>
                                        <NavLink to='/dialogs' activeClassName={classes.activeLink}>Messages</NavLink>
                                    </div>
                                    <div className={classes.item}>
                                        <NavLink to='/users' activeClassName={classes.activeLink}>Users</NavLink>
                                    </div>
                                    <div className={classes.item}>
                                        <NavLink to='/chat' activeClassName={classes.activeLink}>Chat</NavLink>
                                    </div>
                                    <div className={classes.item}>
                                        <NavLink to='/news' activeClassName={classes.activeLink}>News</NavLink>
                                    </div>
                                    <div className={classes.item}>
                                        <NavLink to='/music' activeClassName={classes.activeLink}>Music</NavLink>
                                    </div>
                                    <div className={classes.item}>
                                        <NavLink to='/settings' activeClassName={classes.activeLink}>Settings</NavLink>
                                    </div>
                        </nav>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
export default NavbarList;