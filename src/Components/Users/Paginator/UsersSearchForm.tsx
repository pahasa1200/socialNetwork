import {Formik} from "formik";
import React from "react";
import {FilterType} from "../../../Redux/users-reducer";
import {Field, Form} from "formik";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../../Redux/users-selectors";
import {Button, Dropdown} from "react-bootstrap";
import classes from "./../Users.module.css"

const UsersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = 'null' | 'true' | 'false';

type FormType = {
    term: string
    friend: FriendFormType
}


export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
        const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
            const filter: FilterType = {
                term: values.term,
                friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
            }
            props.onFilterChanged(filter);
            setSubmitting(false);
        }

        const filter = useSelector(getUsersFilter)

        return <div>
            <Formik
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
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
                    <Form className={classes.searchingForm}>
                        <Field type="text" name="term" placeholder="nickname"/>
                        <Field className={classes.dropdownFriend} name="friend" as="select" >
                            <option value="null">All</option>
                            <option value="true">Followed</option>
                            <option value="false">Unfollowed</option>
                        </Field>
                        <Button size="sm" className={classes.buttonFriend} type="submit" disabled={isSubmitting}>
                            Find
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    }
)