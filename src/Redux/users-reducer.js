const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const SET_IS_FETCHING = "SET-IS-FETCHING"

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users:
                    state.users.map(u => {
                            if (u.id === action.userId) {
                                return {...u, followed: true}
                            }
                            return u;
                        }
                    )
            }
        case UNFOLLOW:
            return {
                ...state,
                users:
                    state.users.map(u => {
                            if (u.id === action.userId) {
                                return {...u, followed: false};
                            }
                            return u;
                        }
                    )
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

export default usersReducer;