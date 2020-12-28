import {APIResponseType, ResultCodesEnum} from "../API/api";
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
    followingInProgress: [] as Array<number>, // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
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
        case 'SN/USERS/SET_FILTER' :{
            return {...state, filter: action.payload}
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
    setFilter: (filter: FilterType) => ({
        type: 'SN/USERS/SET_FILTER', payload: filter
    })as const,
    setIsFetching: (isFetchingStatus: boolean) => ({
        type: 'SET_IS_FETCHING', isFetchingStatus
    })as const,
    togleIsFollowing: (followStatus: boolean, userId: number)  => ({
        type: 'TOGLE_IS_FOLLOWING_PROGRESS', followStatus, userId
    })as const,
}

//Thunks
export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): BaseThunkType<ActionsTypes> => async  (dispatch) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrent(currentPage));
        dispatch(actions.setFilter(filter));
        const usersData = await usersApi.getUsers(currentPage, pageSize, filter.term, filter.friend)
                dispatch(actions.setIsFetching(false));
                dispatch(actions.setUsers(usersData.items));
                dispatch(actions.setTotalUsersCount(usersData.totalCount));
}

export const followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number,
                                         apiMethod: (userId: number) => Promise<APIResponseType>,
                                         actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.togleIsFollowing(true, userId));
    let logData = await apiMethod(userId);
            if (logData.resultCode === 0) {
                dispatch(actionCreator(userId));
            }
            dispatch(actions.togleIsFollowing(false, userId));
}

export const getFollow = (userId: number): BaseThunkType<ActionsTypes> => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersApi.getFollow.bind(usersApi), actions.follow);
    }
}

export const getUnfollow = (userId: number): BaseThunkType<ActionsTypes> => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersApi.getUnfollow.bind(usersApi), actions.unfollow);
    }
}

export default usersReducer;

//Types
export type InitialStateActionType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>