import React, {useEffect} from 'react';
import User from "./User";
import Paginator from "./Paginator/Paginator";
import {FilterType, getFollow, getUnfollow, getUsers} from "../../Redux/users-reducer";
import {UsersSearchForm} from "./Paginator/UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllUsers,
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
} from "../../Redux/users-selectors";
import { useHistory } from 'react-router-dom';
import * as queryString from 'querystring'

type QueryParamsType = { term?: string; page?: string; friend?: string }
type PropsType = {

}

export const Users: React.FC<PropsType> = (props) => {
    debugger;

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getAllUsers)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)


        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch(parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        dispatch(getUsers(currentPage, pageSize, filter));
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        history.push({
            pathname: "/users",
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])


    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1 , pageSize, filter));
    }
    const unfollow = (userId: number) => {
        dispatch(getUnfollow(userId))
    }
    const follow = (userId: number) => {
        dispatch(getFollow(userId))
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}  />
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     key={u.id}
                                     unfollow={unfollow}
                                     follow={follow}
                    />
                )
            }
        </div>
    </div>
}