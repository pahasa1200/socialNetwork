import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";

let mapStateforRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type MapPropsType = {
    isAuth: boolean
}
type MapDispatchType = {
}
export function withAuthRedicect <WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const ReactRedirectComponent: React.FC<MapPropsType & MapDispatchType> = (props) =>{
        let {isAuth, ...restProps} = props
            if (!isAuth) return <Redirect to={'/login'}/>
            return <WrappedComponent {...restProps as WCP}/>
    }
    let withRedirect = connect(mapStateforRedirect)(ReactRedirectComponent);
    return withRedirect;
}