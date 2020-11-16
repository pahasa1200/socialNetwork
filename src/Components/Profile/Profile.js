import React from "react"
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
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
               <MyPosts />
            </div>
        </>
    );
}

export default Profile;