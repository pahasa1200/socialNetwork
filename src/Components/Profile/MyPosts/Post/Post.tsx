import React from "react"
import classes from './Post.module.css'

type PropsType = {
    message: string
    likes: number
}
const Post: React.FC<PropsType> = (props) => {
    return (
        <>
            <div className={classes.item}>
                <img
                    src='https://yt3.ggpht.com/a/AATXAJwu0fvICSBsYl9qzOz1sjoyoxfEP2aPplVF7d9H=s900-c-k-c0x00ffffff-no-rj'/>
                <span className={classes.message}>{props.message}</span>
                <div>
                    <span>Likes : {props.likes}</span>
                </div>
            </div>
            <hr/>
        </>
    );
}

export default Post;