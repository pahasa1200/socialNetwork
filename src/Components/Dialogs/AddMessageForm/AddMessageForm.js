import React from "react";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../comon/FormsControls/FormsControls";
import {requieredField} from "../../../Utils/Validators/validators";

const AddMessageForm = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Textarea}
                           validate={[requieredField]}
                           placeholder='Enter your message'
                           name='newMessageBody'/>
                </div>
                <div>
                    <button>Send</button>
                </div>
            </form>
            </>
    )
}
export default reduxForm({form: 'dialog-add-message-form'})(AddMessageForm);