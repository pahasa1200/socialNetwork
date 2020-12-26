import axios from "axios";
import {UserType} from "../Types/types";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "b6921cbd-7492-47bf-aa43-00e9332f72a1"
    }
});

export enum ResultCodesEnum  {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha  {
    CaptchaIsRequired = 10
}

export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}