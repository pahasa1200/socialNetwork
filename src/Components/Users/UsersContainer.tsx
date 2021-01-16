import React from "react"
import {useSelector} from "react-redux";
import Preloader from "../comon/Preloader/Preloader";
import {getIsFetching} from "../../Redux/users-selectors";
import {Users} from "./Users";

type UsersPagePropsType = {

}

export const UsersPage:React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        <Users />
    </>
}
