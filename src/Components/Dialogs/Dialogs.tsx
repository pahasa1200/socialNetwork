import React from 'react';
import classes from './Dialogs.module.css';
import Dialog from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import {InitialStateType} from "../../Redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialStateType
    addMessage: (messageText: string) => void
}
export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogsData.map(dialog => <Dialog name={dialog.name} id={dialog.id} key={dialog.id}/>);

    let messageElements = state.messageData.map(message => <Message message={message.message} key={message.id}/>);


    let newMessage = (values: NewMessageFormType) => {
        props.addMessage(values.newMessageBody);
    }
    return (
        <>
            <div className={classes.dialogs}>
                <div className={classes.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={classes.messages}>
                    {messageElements}
                    <AddMessageForm onSubmit={newMessage}/>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default Dialogs;