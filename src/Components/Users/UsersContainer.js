import React from "react"
import {connect} from "react-redux";
import {
    setCurrent,
    setIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollow,
    follow
} from "../../Redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../comon/Preloader/Preloader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setIsFetching(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrent(pageNumber);
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setIsFetching(false);
            this.props.setUsers(response.data.items)
        });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}


export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrent, setTotalUsersCount, setIsFetching})(UsersContainer);