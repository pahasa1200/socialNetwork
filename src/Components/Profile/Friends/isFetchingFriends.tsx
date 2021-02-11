import React from "react"
import {useSelector} from "react-redux";
import {getIsFetching} from "../../../Redux/users-selectors";
import Preloader from "../../comon/Preloader/Preloader";
import {FriendsContainer} from "./FriendsContainer";
import {PropsType} from "./Friends";


export const IsFetchingFriends:React.FC = (props) => {
    let isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        <FriendsContainer />
    </>
}
