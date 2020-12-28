import React from 'react';
import User from "./User";
import Paginator from "./Paginator/Paginator";
import {UserType} from "../../Types/types";
import {FilterType} from "../../Redux/users-reducer";
import {UsersSearchForm} from "./Paginator/UsersSearchForm";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    onFilterChanged: (filter: FilterType) => void
    getUnfollow: (userId: number) => void
    getFollow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged}  />
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollow={props.getUnfollow}
                                     follow={props.getFollow}
                    />
                )
            }
        </div>
    </div>
}
export default Users;