import React from 'react';
import classes from './Navbar.module.css'
import {Link} from "react-router-dom";

const Navbar = () => {
    return(
        <>
            <nav className={classes.nav}>
                <div className={classes.item}>
                    <a><Link to='/profile'>Profile</Link></a>
                </div>
                <div className={classes.item}>
                    <a><Link to='/dialogs'>Messages</Link></a>
                </div>
                <div className={classes.item}>
                    <a><Link to='/news'>News</Link></a>
                </div>
                <div className={classes.item}>
                    <a><Link to='/music'>Music</Link></a>
                </div>
                <div className={classes.item}>
                    <a><Link to='/settings'>Settings</Link></a>
                </div>
            </nav>
            </>
    )
}
export default Navbar;