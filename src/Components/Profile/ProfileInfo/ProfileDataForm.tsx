import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../comon/FormsControls/FormsControls";
import {ProfileType} from "../../../Types/types";


type PropsType = {
    profile: ProfileType
}
const ProfileDataForm: React.FC<InjectedFormProps<ProfileType,
    PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div>
            {error}
        </div>
        }
        <div>
            <b>Full name</b>: {createField<GetStringKeys<ProfileType>>("fullName", "fullName", [], Input )}
        </div>
        <div>
            <b>Looking for a job</b>: {createField<GetStringKeys<ProfileType>>("", "lookingForAJob", [], Input, {type: "checkbox"}  )}
        </div>
        <div>
            <b>My professioanal skills</b>: {createField<GetStringKeys<ProfileType>>("lookingForAJobDescription", "lookingForAJobDescription", [], Textarea )}
        </div>
        <div>
            <b>About me</b>: {createField<GetStringKeys<ProfileType>>("about me", "aboutMe", [], Textarea )}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div>
                <b>{key}</b>: <Field name={"contacts." + key} placeholder={key} component={Input}/>
            </div>
        })}
        </div>
    </form>
}
const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: "profile-edit"})(ProfileDataForm)
export default ProfileDataReduxForm;