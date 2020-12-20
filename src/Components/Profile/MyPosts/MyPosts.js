import React from "react"
import classes from './MyPosts.module.css'
import Post from "./Post/Post.js";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../comon/FormsControls/FormsControls";
import {maxLengthCreator, requieredField} from "../../../Utils/Validators/validators";

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = React.memo(props => {
    return (<form onSubmit={props.handleSubmit}>
        <div>
            <Field name={"newPostText"} component={Textarea} placeholder={"Post message"}
                   validate = {[requieredField, maxLength10]} />
        </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
})

let AddNewPostFormForRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm)

    const MyPosts = (props) => {

        let postElements = [...props.postData].reverse().map(p => <Post message={p.message} likes={p.likes} key={p.id}/>);

        let onAddPost = (values) => {
            props.addPost(values.newPostText);
        }

        return (
            <>
                <div>
                    My posts
                    <div>
                        <AddNewPostFormForRedux onSubmit={onAddPost}/>
                    </div>
                </div>
                <div className={classes.posts}>
                    {postElements}
                </div>
            </>
        );
    }

    export default MyPosts;