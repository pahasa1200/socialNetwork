import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../comon/FormsControls/FormsControls";
import {maxLengthCreator, requieredField} from "../../../Utils/Validators/validators";
import {NewMessageFormType} from "../Dialogs";

type DialogsFormValuesTypeKeys = Extract<keyof NewMessageFormType, string>
type PropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<DialogsFormValuesTypeKeys>("Enter your message", 'newMessageBody', [requieredField], Textarea)}
                </div>
                <div>
                    <button>Send</button>
                </div>
            </form>
            </>
    )
}
export default reduxForm<NewMessageFormType>({form: 'dialog-add-message-form'})(AddMessageForm);