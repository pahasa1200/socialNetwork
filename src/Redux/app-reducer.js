import {authApi, usersApi} from "../API/api";
import {togleIsFollowing, unfollow} from "./users-reducer";
import {stopSubmit} from "redux-form";
import {getUserLogin} from "./auth-reducer";

const INITIALIZE_SUCCESS = "INITIALIZE-SUCCESS";

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializeSuccess = () => ({
    type: INITIALIZE_SUCCESS
})

export const initializeApp = () =>
    (dispatch) => {
        let promise = dispatch(getUserLogin());
        Promise.all([promise]).then(() => {
        dispatch(initializeSuccess());
        });
}


export default appReducer;