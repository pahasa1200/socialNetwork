import React from 'react';
import Dialogs from './Dialogs'
import {actions} from "../../Redux/dialogs-reducer";
import {connect} from "react-redux";
import {withAuthRedicect} from "../../Hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../Redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedicect
)(Dialogs);