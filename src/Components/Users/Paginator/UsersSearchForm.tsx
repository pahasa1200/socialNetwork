import {Formik} from "formik";
import React from "react";
import {FilterType} from "../../../Redux/users-reducer";
import {Field, Form} from "formik";

const UsersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: 'null' | 'true' | 'false'
}
export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const  filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null:  values.friend === 'true'? true : false
        }
        debugger
        props.onFilterChanged(filter);
        setSubmitting(false);
    }
    return <div>
        <Formik
            initialValues={{term: '', friend: 'null'}}
            validate={UsersSearchFormValidate}
            onSubmit={submit}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}
)