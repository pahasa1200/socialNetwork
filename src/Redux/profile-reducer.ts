import {ResultCodesEnum} from "../API/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostDataType, ProfileType} from "../Types/types";
import { BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileApi} from "../API/profile-api";


//state
let initialState = {
    postData: [
        {id: 1, message: "Hello", likes: 12},
        {id: 2, message: "Haha", likes: 14},
    ] as Array<PostDataType>,
    newPostText: "",
    profile: null as null | ProfileType ,
    status: ""
}

//Reducer
const profileReducer = (state = initialState, action: ActionsTypes ): InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD_POST": {
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
        case "SN/PROFILE/SET_PROFILE":
            return {
                ...state, profile: action.profile
            }
        case "SN/PROFILE/SET_STATUS":
            return {
                ...state, status: action.status
            }
        case "SN/PROFILE/DELETE_POST":
            return {
                ...state, postData: state.postData.filter(p => p.id != action.postId)
            }
        case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

//ActionCreators
export const actions = {
    addPostActionCreator: (newPostText: string) => ({
        type: 'SN/PROFILE/ADD_POST', newPostText
    })as const,

    deletePostActionCreator: (postId: number) => ({
        type: 'SN/PROFILE/DELETE_POST', postId
    })as const,

    setUserProfile: (profile: ProfileType) => ({
        type: 'SN/PROFILE/SET_PROFILE', profile
    })as const,

    setUserStatus: (status: string) => ({
        type: 'SN/PROFILE/SET_STATUS', status
    })as const,

    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos
    })as const,
}

//Thunks
export const getUserProfile = (userId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const userData = await profileApi.getProfile(userId)
                dispatch(actions.setUserProfile(userData));
}

export const getUserStatus = (userId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const userData = await profileApi.getStatus(userId)
                dispatch(actions.setUserStatus(userData));
}

export const updateUserStatus = (status: string): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const statusData = await profileApi.updateStatus(status)
                if (statusData.resultCode === ResultCodesEnum.Success) {
                    dispatch(actions.setUserStatus(status));
                }
}

export const savePhoto = (file: File): BaseThunkType<ActionsTypes> => async (dispatch) => {
    let photoData = await profileApi.savePhoto(file);
    if (photoData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(photoData.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): BaseThunkType<ActionsTypes | FormAction> => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let photoData = await profileApi.saveProfile(profile);
    if (photoData.resultCode === ResultCodesEnum.Success) {
        if (userId != null){
            dispatch(getUserProfile(userId));
        }
        else {
            throw new Error("userId can't be null");
        }
    }
    else {
        dispatch(stopSubmit("profile-edit", {_error: photoData.messages[0]}));
        return Promise.reject(photoData.messages[0]);
    }
}


export default profileReducer;

//Types
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;