import React from 'react';
import classes from './Dialogs.module.css';
import Dialog from "./DialogItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogsData.map(dialog => <Dialog name={dialog.name} id={dialog.id} key={dialog.id}/>);

    let messageElements = state.messageData.map(message => <Message message={message.message} id={message.id}/>);

    let newMessage = () => {
        props.newMessage();
    }
    let onTextChange = (e) => {
        let text = e.target.value;
        props.onTextChange(text);
    }
    return (
        <>
            <div className={classes.dialogs}>
                <div className={classes.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={classes.messages}>
                    {messageElements}
                    <textarea placeholder= "Enter your message!" onChange={onTextChange} value={state.newMessageText}/>
                    <button onClick={newMessage} >Add message</button>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default Dialogs;