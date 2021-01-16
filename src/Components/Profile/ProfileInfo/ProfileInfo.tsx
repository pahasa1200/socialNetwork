import React, {ChangeEvent, useState} from "react"
import classes from './ProfileInfo.module.css'
import Preloader from "../../comon/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../Asserts/images/usersPhoto.jpg";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../Types/types";
import {Button, Col, Container, Image, Row} from "react-bootstrap";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const ProfileInfo: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData).then
        (
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <>
            <Container className={classes.profileInfoContainer}>
                <Row>
                    <Col md={4}>
                        <Image className={classes.headImage} src={props.profile.photos.large || userPhoto} alt="Avatar" thumbnail/>
                        <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                    </Col>
                    <Col md={4} className={classes.contacts}>
                        {editMode
                            ?
                            <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} savePhoto={props.savePhoto} />
                            : <ProfileData goToEditMode={() => {
                                setEditMode(true)
                            }} profile={props.profile} isOwner={props.isOwner}/>}
                    </Col>
                    <Col md={4} >
                        {(props.isOwner && !editMode) && <div>
                        <Button  size = 'sm' type='danger' onClick={() => {
                            setEditMode(true)
                        }}>edit profile</Button>
                    </div>}

                    </Col>
                </Row>
            </Container>
        </>
    );
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

type ProfilePropsDataTypes = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfilePropsDataTypes> = ({profile, isOwner, goToEditMode}) => {
    return <div className={classes.contactsBlock}>
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professioanal skills</b>: {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}
        </div>

    </div>
}

export default ProfileInfo;