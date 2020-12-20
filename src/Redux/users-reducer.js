import {usersApi} from "../API/api";
import {updateObjectInArray} from "../Utils/objects-helpers";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const SET_IS_FETCHING = "SET-IS-FETCHING"
const TOGLE_IS_FOLLOWING_PROGRESS = "TOGLE-IS-FOLLOWING-PROGRESS"

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false})
            }
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case SET_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetchingStatus
            }
        case TOGLE_IS_FOLLOWING_PROGRESS:
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

export const follow = (userId) => ({
    type: FOLLOW, userId
})

export const unfollow = (userId) => ({
    type: UNFOLLOW, userId
})
export const setUsers = (users) => ({
    type: SET_USERS, users
})
export const setCurrent = (currentPage) => ({
    type: SET_CURRENT_PAGE, currentPage
})
export const setTotalUsersCount = (totalCount) => ({
    type: SET_TOTAL_USERS_COUNT, totalCount
})
export const setIsFetching = (isFetchingStatus) => ({
    type: SET_IS_FETCHING, isFetchingStatus
})
export const togleIsFollowing = (followStatus, userId) => ({
    type: TOGLE_IS_FOLLOWING_PROGRESS, followStatus, userId
})

export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrent(currentPage));
        usersApi.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(setIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            });
    }
}
export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(togleIsFollowing(true, userId));
    let data = await apiMethod(userId);
            if (data.resultCode == 0) {
                dispatch(actionCreator(userId));
            }
            dispatch(togleIsFollowing(false, userId));
}

export const getFollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersApi.getFollow.bind(usersApi), follow);
    }
}
export const getUnfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersApi.getUnfollow.bind(usersApi), unfollow);
    }
}

export default usersReducer;