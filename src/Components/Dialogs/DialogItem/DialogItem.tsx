import React from 'react';
import classes from './DialogItem.module.css';
import {NavLink} from "react-router-dom";
import {Image} from "react-bootstrap";
import userPhoto from "../../../Asserts/images/usersPhoto.jpg";

type PropsType = {
    id: number
    name: string
}
const DialogItem: React.FC<PropsType> = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={classes.dialog + ' ' + classes.active}>

            <NavLink to={path}>
                <Image className={classes.imgUser} src={userPhoto}/>
                {props.name}
                <hr/>
            </NavLink>
        </div>
    )
}

export default DialogItem;