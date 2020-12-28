import React from "react";
import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter, Switch} from 'react-router-dom'
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import Preloader from "./Components/comon/Preloader/Preloader";
import {initializeApp} from "./Redux/app-reducer";
import store, {AppStateType} from "./Redux/redux-store";
import {withSuspense} from "./Hoc/withSuspense";
import {Redirect} from "react-router-dom";

const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./Components/Profile/ProfileContainer"));

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer)

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchType = {
    initializeApp: () => void
}
class App extends Component<MapPropsType & MapDispatchType> {
    catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
        alert("Some error");
    }
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors);
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
                        <Route path='/dialogs' render={() => <SuspendedDialogs /> }/>
                        <Route path='/profile/:userId?' render={() => <SuspendedProfile />}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='*' render={() => <div>404 not found </div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SocialNetworkApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default SocialNetworkApp;