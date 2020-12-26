import {ResultCodesEnum} from "../API/api";
import {updateObjectInArray} from "../Utils/objects-helpers";
import {UserType} from "../Types/types";
import {Dispatch} from "redux";
import {InferActionsTypes, BaseThunkType} from "./redux-store";
import {usersApi} from "../API/users-api";

//state
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users ids
}

//Reducer
const usersReducer = (state = initialState, action: ActionsTypes): InitialStateActionType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false})
            }
        case 'SET_USERS':
            return {
                ...state, users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case 'SET_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetchingStatus
            }
        case 'TOGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.followStatus
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

//ActionCreators
export const actions = {
    follow: (userId: number) => ({
        type: 'FOLLOW', userId
    }) as const,
    unfollow: (userId: number) => ({
        type: 'UNFOLLOW', userId
    })as const,
    setUsers: (users: Array<UserType>) => ({
        type: 'SET_USERS', users
    })as const,
    setCurrent: (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE', currentPage
    })as const,
    setTotalUsersCount: (totalCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT', totalCount
    })as const,
    setIsFetching: (isFetchingStatus: boolean) => ({
        type: 'SET_IS_FETCHING', isFetchingStatus
    })as const,
    togleIsFollowing: (followStatus: boolean, userId: number)  => ({
        type: 'TOGLE_IS_FOLLOWING_PROGRESS', followStatus, userId
    })as const,
}

//Thunks
export const getUsers = (currentPage: number, pageSize: number): BaseThunkType<ActionsTypes> => async  (dispatch) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrent(currentPage));
        const usersData = await usersApi.getUsers(currentPage, pageSize)
                dispatch(actions.setIsFetching(false));
                dispatch(actions.setUsers(usersData.items));
                dispatch(actions.setTotalUsersCount(usersData.totalCount));
}

export const followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number,
                                         apiMethod: any,
                                         actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.togleIsFollowing(true, userId));
    let data = await apiMethod(userId);
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(actionCreator(userId));
            }
            dispatch(actions.togleIsFollowing(false, userId));
}

export const getFollow = (userId: number): BaseThunkType<ActionsTypes> => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersApi.getFollow.bind(usersApi), actions.follow);
    }
}

export const getUnfollow = (userId: number): BaseThunkType<ActionsTypes> => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersApi.getUnfollow.bind(usersApi), actions.unfollow);
    }
}

export default usersReducer;

//Types
export type InitialStateActionType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>