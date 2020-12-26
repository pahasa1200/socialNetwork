import {instance} from "./api";

type CaptchaResponseType = {
    url: string
}
export const securityApi = {
    getCaptchaUrl() {
        return (
            instance.get<CaptchaResponseType>(`security/get-captcha-url`).then(res => res.data)
        )
    },
}