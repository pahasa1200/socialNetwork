import React from "react"
import classes from './Post.module.css'

const Post = (props) => {
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