import React, {useState} from "react"
import classes from './ProfileInfo.module.css'
import Preloader from "../../comon/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../Asserts/images/usersPhoto.jpg";
import ProfileDataForm from "./ProfileDataForm";



const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then
        (
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <>
            <div className={classes.content}>
                <div>
                    {/*<img src={'http://neonmamacita.com/wp-content/uploads/2012/08/Natalie_Cottee_Woods04.jpg'}*/}
                    {/*     className={classes.headImage}/>*/}

                </div>
                <div>
                    <img src={props.profile.photos.large || userPhoto} alt="Dimy4"/>
                    {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                    <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                </div>
                {editMode
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={props.profile} isOwner={props.isOwner}/>}

            </div>
        </>
    );
}
const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
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
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}

export default ProfileInfo;