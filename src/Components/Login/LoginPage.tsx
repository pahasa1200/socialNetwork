import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {connect, useDispatch, useSelector} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {createField, Input} from "../comon/FormsControls/FormsControls";
import {AppStateType} from "../../Redux/redux-store";
import {requieredField} from "../../Utils/Validators/validators";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", 'email', [requieredField], Input, null)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [requieredField], Input, null, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(null, "rememberMe", [], Input, null, {type: "checkbox"}, "remember me")}

            { props.captchaUrl && <img src={props.captchaUrl} />}
            { props.captchaUrl &&  createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [requieredField], Input, null, {}) }


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

type LoginFormValuesType = {
    captcha: string
    email: string
    password: string
    rememberMe: boolean
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

export const LoginPage: React.FC = (props) => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    }
    if (isAuth){
        return <Redirect to={"/profile"}/>
    }
    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl = {captchaUrl}/>
        </>
    )
}



