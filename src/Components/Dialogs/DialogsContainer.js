import React from 'react';
import Dialogs from './Dialogs'
import {actions,addMessageActionCreator, updateNewMessageTextActionCreator} from "../../Redux/dialogs-reducer";
import {connect} from "react-redux";
import {withAuthRedicect} from "../../Hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose(
    connect(mapStateToProps, {...actions}),
    withAuthRedicect
)(Dialogs);