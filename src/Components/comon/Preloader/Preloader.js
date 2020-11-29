import React from 'react';
import preloader from './../../../Asserts/images/preloader.gif'
let Preloader = (props) => {
    return(
        <>
            <div>
                <img src={preloader} alt='hi'/>
            </div>
            </>
    )
}

export default Preloader;