import React from "react";
import classes from './FormsControls.module.css'


const FormContorol = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <>
            <div className = {classes.formControl + " " + (hasError ? classes.error : "")}>
                <div>
                    {props.children}
                </div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormContorol {...props}><textarea {...input} {...restProps}/></FormContorol>
}
export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormContorol {...props}><input {...input} {...restProps}/></FormContorol>
}
