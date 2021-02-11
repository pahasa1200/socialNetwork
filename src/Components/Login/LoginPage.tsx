import React from "react";
import { InjectedFormProps, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {createField, GetStringKeys, Input} from "../comon/FormsControls/FormsControls";
import {AppStateType} from "../../Redux/redux-store";
import {requieredField} from "../../Utils/Validators/validators";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", 'email', [requieredField], Input, null, {})}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [requieredField], Input, null, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, null, {type: "checkbox"}, "remember me")}

            { captchaUrl && <img src={captchaUrl} alt='captcha'/>}
            { captchaUrl &&  createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [requieredField], Input, null, {}) }

            {error && <div>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

type LoginFormValuesType = {
    captcha: string
    email: string
    password: string
    rememberMe: boolean
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>


 const LoginPage: React.FC = (props) => {
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

export default LoginPage