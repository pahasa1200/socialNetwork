import React from "react"
import {connect} from "react-redux";
import {
    getUsers,
    getFollow,
    getUnfollow, FilterType
} from "../../Redux/users-reducer";
import Users from "./Users";
import Preloader from "../comon/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedicect} from "../../Hoc/withAuthRedirect";
import {
    getAllUsers,
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount, getUsersFilter
} from "../../Redux/users-selectors";
import User from "./User";
import {AppStateType} from "../../Redux/redux-store";
import {UserType} from "../../Types/types";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    getUnfollow: (userId: number) => void
    getFollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props;
        this.props.getUsers(pageNumber, pageSize, filter);
    }
    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props;
        this.props.getUsers(1 , pageSize, filter);
}

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   onFilterChanged = {this.onFilterChanged}
                   getFollow={this.props.getFollow}
                   getUnfollow={this.props.getUnfollow}
                   followingInProgress = {this.props.followingInProgress}/>
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state),
        isFetching: state.usersPage.isFetching,
        filter: getUsersFilter(state)
    }
}
export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, {
        getFollow,
        getUnfollow,
        getUsers
    }),
    withAuthRedicect
)(UsersContainer);