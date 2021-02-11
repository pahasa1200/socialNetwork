import axios from "axios";
import {UserType} from "../Types/types";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "cd4a49c2-06f2-4dec-89cb-d96efa945c6a"
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