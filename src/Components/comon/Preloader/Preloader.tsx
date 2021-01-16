import React from 'react';
import preloader from './../../../Asserts/images/preloader.gif'
import classes from './Preloader.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Spinner} from "react-bootstrap";
type PropsType = {

}
const Preloader: React.FC<PropsType> = (props) => {
    return(
        <>
            <div >
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            </>
    )
}

export default Preloader;