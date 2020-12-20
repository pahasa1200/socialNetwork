import React from "react"
import {connect} from "react-redux";
import {
    setCurrent,
    setIsFetching,
    setTotalUsersCount,
    setUsers,
    togleIsFollowing,
    getUsers,
    getFollow,
    getUnfollow
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
    getTotalUsersCount
} from "../../Redux/users-selectors";
import User from "./User";

class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   getFollow={this.props.getFollow}
                   getUnfollow={this.props.getUnfollow}
                   togleIsFollowing={this.props.togleIsFollowing}
                   followingInProgress = {this.props.followingInProgress}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state),
    }
}
export default compose(
    connect(mapStateToProps, {
        getFollow,
        getUnfollow,
        setUsers,
        setCurrent,
        setTotalUsersCount,
        setIsFetching,
        togleIsFollowing,
        getUsers
    }),
    withAuthRedicect
)(UsersContainer);