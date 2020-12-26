import React from 'react';
import classes from './Dialogs.module.css';
import Dialog from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";


const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogsData.map(dialog => <Dialog name={dialog.name} id={dialog.id} key={dialog.id}/>);

    let messageElements = state.messageData.map(message => <Message message={message.message} id={message.id}/>);

    let newMessage = (values) => {
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