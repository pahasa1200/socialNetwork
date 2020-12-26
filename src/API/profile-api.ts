import {PhotosType, ProfileType} from "../Types/types";
import {APIResponseType, instance, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileApi = {
    getProfile: (userId: number) => {
        return (
            instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
        )
    },
    getStatus: (userId: number) => {
        return (
            instance.get<string>(`profile/status/` + userId).then(res => res.data)
        )
    },
    updateStatus: (status: string) => {
        return (
            instance.put<APIResponseType>(`profile/status`, {status: status}).then(res => res.data)
        )
    },
    savePhoto: (photoFile: any) => {
        let formdata = new FormData();
        formdata.append("image", photoFile);
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formdata, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put("profile", profile).then(res => res.data);
    }
}