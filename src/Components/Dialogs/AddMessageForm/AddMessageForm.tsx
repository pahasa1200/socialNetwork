import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import classes from '../Dialogs.module.css'
import {createField, Textarea} from "../../comon/FormsControls/FormsControls";
import {maxLengthCreator, requieredField} from "../../../Utils/Validators/validators";
import {NewMessageFormType} from "../Dialogs";
import {Button} from "react-bootstrap";

type DialogsFormValuesTypeKeys = Extract<keyof NewMessageFormType, string>
type PropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit} >
                <div>
                    <button className={`btn-danger ${classes.addNewMessageButton}`}>Send</button>
                </div>
                <div className={classes.formAddMessage}>
                    {createField<DialogsFormValuesTypeKeys>("Enter your message", 'newMessageBody', [], Textarea, classes.addNewMessageArea)}
                </div>

            </form>
            </>
    )
}
export default reduxForm<NewMessageFormType>({form: 'dialog-add-message-form'})(AddMessageForm);