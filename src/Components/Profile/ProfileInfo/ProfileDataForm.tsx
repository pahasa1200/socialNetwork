import React, {ChangeEvent} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../comon/FormsControls/FormsControls";
import {ProfileType} from "../../../Types/types";
import {Button} from "react-bootstrap";
import classes from './ProfileInfo.module.css'

type PropsType = {
    profile: ProfileType
    savePhoto: (file: File) => void
}
const ProfileDataForm: React.FC<InjectedFormProps<ProfileType,
    PropsType> & PropsType> = ({handleSubmit, profile, error, savePhoto}) => {

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <b>Full name</b>: {createField<GetStringKeys<ProfileType>>("fullName", "fullName", [], Input, null )}
        </div>
        <div>
            <b>Looking for a job</b>: {createField<GetStringKeys<ProfileType>>("", "lookingForAJob", [], Input, null, {type: "checkbox"}  )}
        </div>
        <div>
            <b>My professioanal skills</b>: {createField<GetStringKeys<ProfileType>>("lookingForAJobDescription", "lookingForAJobDescription", [], Textarea, null )}
        </div>
        <div>
            <b>About me</b>: {createField<GetStringKeys<ProfileType>>("about me", "aboutMe", [], Textarea, null )}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div>
                <b>{key}</b>: <Field name={"contacts." + key} placeholder={key} component={Input}/>
            </div>
        })}
        </div>
        <b>Change photo</b>
        <input type="file" onChange={onMainPhotoSelected}/>
        <div><Button className={classes.saveButton} type={'primary'}>save</Button></div>
        {error && <div>
            {error}
        </div>
        }
    </form>
}
const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: "profile-edit"})(ProfileDataForm)
export default ProfileDataReduxForm;