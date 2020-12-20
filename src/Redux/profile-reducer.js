import {profileApi} from "../API/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_PROFILE = "SET-PROFILE";
const SET_STATUS = "SET-STATUS";
const DELETE_POST = "DELETE-POST";
const SAVE_PHOTO_SUCCESS = "SET-PHOTO-SUCCESS";

let initialState = {
    postData: [
        {id: 1, message: "WTF?", likes: "12"},
        {id: 2, message: "Я молодой тупак", likes: "14"},
    ],
    newPostText: "",
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let postNew = {
                id: 3,
                message: action.newPostText,
                likes: 0,
            }
            return {
                ...state,
                postData: [...state.postData, postNew],
                newPostText: ''
            };
        }
        case SET_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state, status: action.status
            }
        case DELETE_POST:
            return {
                ...state, postData: state.postData.filter(p => p.id != action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({
    type: ADD_POST, newPostText
})
export const deletePostActionCreator = (postId) => ({
    type: DELETE_POST, postId
})

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, newText: text
})
export const setUserProfile = (profile) => ({
    type: SET_PROFILE, profile
})
export const setUserStatus = (status) => ({
    type: SET_STATUS, status
})
export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCESS, photos
})
export const getUserProfile = (userId) => (dispatch) => {
    profileApi.getProfile(userId)
        .then(response => {
                dispatch(setUserProfile(response.data));
            }
        )
}
export const getUserStatus = (userId) => (dispatch) => {
    profileApi.getStatus(userId)
        .then(response => {
                dispatch(setUserStatus(response.data));
            }
        )
}
export const updateUserStatus = (status) => (dispatch) => {
    profileApi.updateStatus(status)
        .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserStatus(status));
                }
            }
        )
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileApi.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileApi.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
    else {
        dispatch(stopSubmit("profile-edit", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}


export default profileReducer;