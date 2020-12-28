import React, {useState, useEffect, ChangeEvent} from 'react';

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}
const ProfileStatusWithHooks: React.FC<PropsType>  = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }
    return (
        <>
            <div>
                {!editMode &&
            <div>
                <span onDoubleClick={ activateEditMode }>{props.status || "None"}</span>
            </div>
                }
                {editMode &&
                <div>
                    <input onChange={ onStatusChange } autoFocus={true} onBlur={ deactivateEditMode } value={status}/>
                </div>
                }
            </div>
            </>
    )
}
export default ProfileStatusWithHooks;