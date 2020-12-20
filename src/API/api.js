import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "b6921cbd-7492-47bf-aa43-00e9332f72a1"
    }
});

export const usersApi = {
    getUsers: (currentPage = 1, pageSize = 5) => {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`,)
                .then(response => {
                    return response.data;
                })
        )
    },
    getFollow: (userId) => {
        return (
            instance.post(`follow/${userId}`, {}
            ).then(response => {
                return response.data;
            })
        )
    },
    getUnfollow: (userId) => {
        return (
            instance.delete(`follow/${userId}`
            ).then(response => {
                return response.data;
            })
        )
    },
}
export const authApi = {
    getUserLogin: () => {
        return (
            instance.get(`auth/me`)
        )
    },
    login: (email, password, rememberMe = false, captcha = null) => {
        return (
            instance.post(`auth/login`, {email, password, rememberMe, captcha})
        )
    },
    logout: () => {
        return (
            instance.delete(`auth/login`)
        )
    }
}
export const securityApi = {
    getCaptchaUrl (){
        return (
            instance.get(`security/get-captcha-url`)
        )
    },
}
export const profileApi = {
    getProfile: (userId) => {
        return (
            instance.get(`profile/` + userId)
        )
    },
    getStatus: (userId) => {
        return (
            instance.get(`profile/status/` + userId)
        )
    },
    updateStatus: (status) => {
        return (
            instance.put(`profile/status`, {status: status})
        )
    },
    savePhoto: (photoFile) => {
        let formdata = new FormData();
        formdata.append("image", photoFile);
        return instance.put(`profile/photo`, formdata, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put("profile", profile);
    }
}


