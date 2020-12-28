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
                {props.message}
                <div>
                    <span>Likes : {props.likes}</span>
                </div>
            </div>
        </>
    );
}

export default Post;