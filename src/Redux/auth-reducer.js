import {authApi, securityApi, usersApi} from "../API/api";
import {togleIsFollowing, unfollow} from "./users-reducer";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET-USER-DATA";
const UNFOLLOW = "UNFOLLOW";
const GET_CAPTCHA_URL_SUCCESS = "GET-CAPTCHA-URL-SUCCESS";


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setUserData = (userId, login, email, isAuth) => ({
    type: SET_USER_DATA, payload: {userId, login, email, isAuth}
})
export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
})
export const getUserLogin = () => async(dispatch) => {
        let response = await authApi.getUserLogin();
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setUserData(id, login, email, true));
            }
        };

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
        let response = await authApi.login(email, password, rememberMe, captcha);
                if (response.data.resultCode === 0) {
                    dispatch(getUserLogin());
                }
                else {
                    if (response.data.resultCode === 10){
                        dispatch(getCaptchaUrl());
                    }
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                    dispatch(stopSubmit("login", {_error: message}));
                }
};
export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityApi.getCaptchaUrl();
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch) => {
        let response = await authApi.logout();
                if (response.data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false));
                }
};

export default authReducer;