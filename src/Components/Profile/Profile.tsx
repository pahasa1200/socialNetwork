import React from "react"
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {updateUserStatus} from "../../Redux/profile-reducer";
import {ProfileType} from "../../Types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {
    debugger;
    return (
        <>
            <div>
                <ProfileInfo saveProfile = {props.saveProfile}
                             savePhoto={props.savePhoto}
                             isOwner={props.isOwner}
                             profile={props.profile}
                             status={props.status}
                             updateUserStatus={props.updateUserStatus}/>
                <MyPostsContainer />
            </div>
        </>
    );
}

export default Profile;