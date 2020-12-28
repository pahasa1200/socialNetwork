import React from "react"
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../comon/FormsControls/FormsControls";
import {requieredField} from "../../../Utils/Validators/validators";
import {PostDataType} from "../../../Types/types";


type PropsType = {

}

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType>
    & PropsType> = React.memo(props => {
    return (<form onSubmit={props.handleSubmit}>
            <div>
                {createField<GetStringKeys<AddPostFormValuesType>>("Your post",
                    'newPostText', [requieredField], Textarea)}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
})

let AddNewPostFormForRedux = reduxForm<AddPostFormValuesType, PropsType>({form: "ProfileAddNewPostForm"})(AddNewPostForm)

export type AddPostFormValuesType = {
    newPostText: string
}

export type MapPropsType = {
    postData: Array<PostDataType>
}

export type MapDispatchType = {
    addPost: (newPostText: string) => void
}
const MyPosts: React.FC<MapPropsType & MapDispatchType> = (props) => {

    let postElements = [...props.postData].reverse().map(p => <Post message={p.message} likes={p.likes} key={p.id}/>);

    let onAddPost = (values: AddPostFormValuesType) => {
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

const MyPostsMemo = React.memo(MyPosts)
export default MyPostsMemo;