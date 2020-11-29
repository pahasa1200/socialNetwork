import React from 'react';
import Dialogs from './Dialogs'
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../Redux/dialogs-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onTextChange: (body) => {
            dispatch(updateNewMessageTextActionCreator(body));
        },
        newMessage: () => {
            dispatch(addMessageActionCreator());
        }
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
export default DialogsContainer;