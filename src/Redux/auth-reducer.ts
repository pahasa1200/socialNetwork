import {ResultCodeForCaptcha, ResultCodesEnum} from "../API/api";
import {stopSubmit} from "redux-form";
import {log} from "util";
import {authApi} from "../API/auth-api";
import {securityApi} from "../API/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

//state
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

//Reducer
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/auth/SET_USER_DATA":
        case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

//ActionCreators
export const actions = {
    setUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type:
        'SN/auth/SET_USER_DATA', payload: {userId, login, email, isAuth}
    }) as const,
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    }) as const
}

export const getUserLogin = (): BaseThunkType<ActionsType> => async(dispatch) => {
        let meData = await authApi.getUserLogin();
    debugger
            if (meData.resultCode === ResultCodesEnum.Success) {
                let {id, login, email} = meData.data;
                dispatch(actions.setUserData(id, login, email, true));
            }
        };

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): BaseThunkType<ActionsType |
    ReturnType<typeof stopSubmit>> => async (dispatch) => {
        let loginData = await authApi.login(email, password, rememberMe, captcha);
                if (loginData.resultCode === ResultCodesEnum.Success) {
                    dispatch(getUserLogin());
                }
                else {
                    if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired){
                        dispatch(getCaptchaUrl());
                    }
                    debugger
                    let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
                    dispatch(stopSubmit("login", {_error: message}));
                }
};

export const getCaptchaUrl = (): BaseThunkType<ActionsType> => async (dispatch) => {
    let captchaData = await securityApi.getCaptchaUrl();
    const captchaUrl = captchaData.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): BaseThunkType<ActionsType> => async (dispatch) => {
        let logoutData = await authApi.logout();
                if (logoutData.resultCode === ResultCodesEnum.Success) {
                    dispatch(actions.setUserData(null, null, null, false));
                }
};

export default authReducer;

//Types
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>