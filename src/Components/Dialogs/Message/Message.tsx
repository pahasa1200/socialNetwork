import React from 'react';
import classes from './Message.module.css';

type PropsType = {
    message: string
}
const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.message}>{props.message}
            <hr/>
        </div>
    )
}

export default Message;