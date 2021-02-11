import React from "react"
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {updateUserStatus} from "../../Redux/profile-reducer";
import {ProfileType} from "../../Types/types";
import Friends from "./Friends/Friends";
import {Col, Container, Row} from "react-bootstrap";
import {FriendsContainer} from "./Friends/FriendsContainer";
import {IsFetchingFriends} from "./Friends/isFetchingFriends";

type PropsType = {
    profile: null | ProfileType,
    status: string,
    updateUserStatus: (status: string) => void,
    isOwner: boolean,
    savePhoto: (file: File) => void,
    saveProfile: (profile: ProfileType) => Promise<any>,
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                    <ProfileInfo saveProfile = {props.saveProfile}
                             savePhoto={props.savePhoto}
                             isOwner={props.isOwner}
                             profile={props.profile}
                             status={props.status}
                             updateUserStatus={props.updateUserStatus}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} className={`${classes.friendsBlock} mr-auto ml-auto`}>
                    <IsFetchingFriends />
                    </Col>
                    <Col md={8}>
                        <MyPostsContainer />
                    </Col>
                    </Row>
            </Container>
        </>
    );
}

export default Profile;