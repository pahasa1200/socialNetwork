import React from 'react';
import classes from './Dialog.module.css';
import {NavLink} from "react-router-dom";


const DialogItem = (props) =>{
    let path = '/dialogs/' + props.id
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Messages = (props) =>{
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

const Dialogs = (props) => {
    return(
        <>
            <div className={classes.dialogs}>
                <div className={classes.dialogsItems}>
                    <DialogItem name='Pavel' id='1' />
                    <DialogItem name='Kasha' id='2' />
                    <DialogItem name='Andrey' id='3' />
                    <DialogItem name='Masha' id='4' />
                    <DialogItem name='Viktor' id='5' />
                </div>
                <div className={classes.messages}>
                    <Messages message='Hi' />
                    <Messages message="What's up?" />
                    <Messages message="Yo" />
                </div>
            </div>
            </>
    )
}

export default Dialogs;