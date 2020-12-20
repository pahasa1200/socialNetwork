import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateforRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedicect = (Component) => {
    class ReactRedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...this.props}/>
        }
    }
    let withRedirect = connect(mapStateforRedirect)(ReactRedirectComponent);
    return withRedirect;
}