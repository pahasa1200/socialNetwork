import React from "react"
import {actions} from "../../../Redux/profile-reducer";
import MyPosts, {MapDispatchType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return{
        newPostText: state.profilePage.newPostText,
        postData: state.profilePage.postData
    }
}

const MyPostsContainer = connect<MapPropsType, MapDispatchType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
}) (MyPosts);
export default MyPostsContainer;