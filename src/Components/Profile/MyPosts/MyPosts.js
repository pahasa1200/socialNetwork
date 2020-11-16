import React from "react"
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <>
                <div>
                    My posts
                </div>
                <div>
                    New post
                </div>
            <div className={classes.posts}>
               <Post messages='WTF?' likes='15' />
               <Post messages='Я молодой тупак' likes='23' />
            </div>
        </>
    );
}

export default MyPosts;