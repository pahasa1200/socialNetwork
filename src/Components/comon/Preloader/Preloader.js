import React from 'react';
import preloader from './../../../Asserts/images/preloader.gif'
import classes from './Preloader.module.css'
let Preloader = (props) => {
    return(
        <>
            <div >
                <img className={classes.preloaderImage} src={preloader} alt='hi'/>
            </div>
            </>
    )
}

export default Preloader;