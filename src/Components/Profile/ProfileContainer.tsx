import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedicect} from "../../Hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../Redux/redux-store";
import {ProfileType} from "../../Types/types";

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: null | number = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizeUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId as number);
        this.props.getUserStatus(userId as number);
    }

    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                         savePhoto = {this.props.savePhoto}
                         saveProfile = {this.props.saveProfile}
                />
            </>
        );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizeUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus,
        updateUserStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedicect
)(ProfileContainer);