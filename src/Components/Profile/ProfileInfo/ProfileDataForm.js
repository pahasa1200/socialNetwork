import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../comon/FormsControls/FormsControls";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div>
            {error}
        </div>
        }
        <div>
            <b>Full name</b>: <Field name={"fullName"} placeholder={"fullName"} component={Input}/>
        </div>
        <div>
            <b>Looking for a job</b>: <Field name={"lookingForAJob"} placeholder={""} component={Input} type={"checkbox"}/>
        </div>
        <div>
            <b>My professioanal skills</b>: <Field name={"lookingForAJobDescription"} placeholder={"lookingForAJobDescription"} component={Textarea}/>
        </div>
        <div>
            <b>About me</b>: <Field name={"aboutMe"} placeholder={"about me"} component={Textarea}/>
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
const ProfileDataReduxForm = reduxForm({form: "profile-edit"})(ProfileDataForm)
export default ProfileDataReduxForm;