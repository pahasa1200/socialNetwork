import React from "react"
import classes from './MyPosts.module.css'
import Post from "./Post/Post.js";



const MyPosts = (props) => {

    let postElements = props.postData.map(p => <Post message={p.message} likes={p.likes} key={p.id}/>);

    let onAddPost = () => {
        props.addPost();
    }

    let onChangeTextPost = (e) => {
        let text = e.target.value;
        props.updateNewPostText(text);
    }

    return (
        <>
            <div>
                My posts
                <div>
                    <textarea onChange={onChangeTextPost} value={props.newPostText}/>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postElements}
            </div>
        </>
    );
}

export default MyPosts;