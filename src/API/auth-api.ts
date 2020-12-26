import {instance, APIResponseType, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

type MeResponseType = {
    id: number,
    email: string,
    login: string
}
type LoginResponseType = {
    userId: number
}
export const authApi = {
    getUserLogin: () => {
        return (
            instance.get<APIResponseType<MeResponseType>>(`auth/me`).then(res => res.data)
        )
    },
    login: (email: string, password: string, rememberMe = false, captcha: string | null = null) => {
        return (
            instance.post<APIResponseType<LoginResponseType, ResultCodesEnum | ResultCodeForCaptcha
                >>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
        )
    },
    logout: () => {
        return (
            instance.delete(`auth/login`).then(res => res.data)
        )
    }
}