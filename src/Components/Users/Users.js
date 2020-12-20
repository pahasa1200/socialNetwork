import React from 'react';
import User from "./User";
import Paginator from "./Paginator/Paginator";

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
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