import React from 'react';
import Dialogs from './Dialogs'
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../Redux/dialogs-reducer";
import {connect} from "react-redux";
import {withAuthRedicect} from "../../Hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
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
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedicect
)(Dialogs);