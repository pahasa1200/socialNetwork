import React from "react"
import classes from './ProfileInfo.module.css'


const ProfileInfo = (props) => {
    return (
        <>
            <div className={classes.content}>
                <div>
                    <img src={'http://neonmamacita.com/wp-content/uploads/2012/08/Natalie_Cottee_Woods04.jpg'}
                         className={classes.headImage}/>
                </div>
                <div>
                    ava + discr
                </div>
            </div>
        </>
    );
}

export default ProfileInfo;