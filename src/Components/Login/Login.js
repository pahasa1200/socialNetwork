import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {Input} from "../comon/FormsControls/FormsControls";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"email"} placeholder={"email"} component={Input}/>
            </div>
            <div>
                <Field name={"password"} placeholder={"password"} component={Input} type={"password"}/>
            </div>
            <div>
                <Field name={"rememberMe"} type={"checkbox"} component={Input}/> rememberMe
            </div>
            {props.captchaUrl && <img src={props.captchaUrl} alt={""}/>}
            {props.captchaUrl && <Field presholder={"Symbols from image"} name={"captcha"} component={Input}/>}
            {props.error && <div>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);
const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth){
        return <Redirect to={"/profile"}/>
    }
    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl = {props.captchaUrl}/>
        </>
    )
}
const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps,{login})(Login);