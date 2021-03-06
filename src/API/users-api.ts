import {UserType} from "../Types/types";
import {instance, GetUsersResponseType, APIResponseType} from "./api";

type GetFollowResponseType = {
    resultCode: string
    messages: Array<string>
    data: { userId: number, followStatus: boolean | null }
}
export const usersApi = {
    getUsers: (currentPage = 1, pageSize = 5, term: string= '', friend: null | boolean = null) => {
        return (
            instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`) )
                .then(res => res.data)
        )
    },
    getFollow: (userId: number) => {
        return (
            instance.post<APIResponseType>(`follow/${userId}`, {}).then(res => res.data)
        )
    },
    getUnfollow: (userId: number) => {
        return (
            instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data)
        )
    },
}