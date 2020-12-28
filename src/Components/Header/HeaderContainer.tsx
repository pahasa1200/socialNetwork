import React from "react"
import Header, {DispatchType, PropsType} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";


class HeaderContainer extends React.Component<PropsType & DispatchType>{

    render() {
        return(
            <>
                <Header {...this.props} />
                </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<PropsType, DispatchType,{}, AppStateType >(mapStateToProps, {logout})(HeaderContainer);