import React from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../Asserts/images/usersPhoto.jpg";
import {NavLink} from "react-router-dom";
import {UserType} from "../../Types/types";
import {Button, Image} from "react-bootstrap";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
                <span>
                    <div>
                       <NavLink to={'/profile/' + user.id}>
                        <Image src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.userPhoto} thumbnail/>
                       </NavLink>
                        <span className={styles.blockText}>{user.name}
                    </span>
                        <div>
                        {user.followed
                            ? <Button className={styles.buttonFollowUnfollow} variant="danger" disabled={followingInProgress
                                .some(id => id === user.id)}
                                      onClick={() => { unfollow(user.id) }}>
                                Unfollow</Button>
                            : <Button className={styles.buttonFollowUnfollow} variant="outline-danger" disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => { follow(user.id) }}>
                                Follow</Button>}
                    </div>
                        <hr/>
                    </div>
                </span>
            <span>

                </span>
        </div>)
}

export default User;