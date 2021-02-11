import React from "react"
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../comon/FormsControls/FormsControls";
import {requieredField} from "../../../Utils/Validators/validators";
import {PostDataType} from "../../../Types/types";
import {Col, Container, Row} from "react-bootstrap";


type PropsType = {

}

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType>
    & PropsType> = React.memo(props => {
    return (<form className={classes.postsArea} onSubmit={props.handleSubmit}>
            <div>
                {createField<GetStringKeys<AddPostFormValuesType>>("Your post",
                    'newPostText', [], Textarea, classes.addPostTextarea)}
            </div>
            <div>
                <button className={`btn-dark ${classes.buttonAdd}`}>Add post</button>
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
        <div>
            <Container className={classes.postsContainer}>
                <Row>
                    <Col className={classes.posts}>
                            <h3 >Posts</h3>
                            <div>
                                <AddNewPostFormForRedux onSubmit={onAddPost}/>
                            </div>
                        <div >
                            {postElements}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const MyPostsMemo = React.memo(MyPosts)
export default MyPostsMemo;