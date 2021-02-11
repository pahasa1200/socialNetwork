import React from "react";
import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar/NavbarList";
import {BrowserRouter, Route, withRouter, Switch, NavLink} from 'react-router-dom'
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import {UsersPage} from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import LoginPage from "./Components/Login/LoginPage";
import {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import Preloader from "./Components/comon/Preloader/Preloader";
import {initializeApp} from "./Redux/app-reducer";
import store, {AppStateType} from "./Redux/redux-store";
import {withSuspense} from "./Hoc/withSuspense";
import {Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Col, Container, Row} from "react-bootstrap";
import {Affix, Menu} from 'antd';
import { SmileOutlined, MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import classes from "./Components/Navbar/NavbarList.module.css";
import Footer from "./Components/Footer/Footer";

const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./Components/Profile/ProfileContainer"));
const ChatPage = React.lazy(() => import("./Pages/Chat/ChatPage"));

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

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
            <>
                <Container fluid className={'fullContainer'}>
                    <Row>
                        <Col md={12} className='sidebar-wrapper'>
                            <HeaderContainer/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} sm={6} >
                            {/*<Navbar/>*/}
                            <Sider />
                        </Col>
                        <Col md={10} sm={6}>
                            <div>
                                <Switch>
                                    <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
                                    <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                                    <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                                    <Route path='/chat' render={() => <SuspendedChatPage/>}/>
                                    <Route path='/news' render={() => <News/>}/>
                                    <Route path='/music' render={() => <Music/>}/>
                                    <Route path='/settings' render={() => <Settings/>}/>
                                    <Route path='/users' render={() => <UsersPage/>}/>
                                    <Route path='/login' render={() => <LoginPage/>}/>
                                    <Route path='*' render={() => <div>404 not found </div>}/>
                                </Switch>
                            </div>
                        </Col>
                    </Row>
                    <Row className={classes.footer}>
                        <Col md={12}>
                            <Footer />
                        </Col>
                    </Row>
                </Container>
            </>
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

const Sider = () => {
    return (
        <>
        <Menu className='sidebarMenu' mode="inline">
                <Menu.Item key="1" icon={<UserOutlined />}><NavLink to='/profile' activeClassName={classes.activeLink}>Profile</NavLink></Menu.Item>
                <Menu.Item key="2" icon={<MailOutlined />}><NavLink to='/dialogs' activeClassName={classes.activeLink}>Messages</NavLink></Menu.Item>
                <Menu.Item key="3" icon={<SmileOutlined />}> <NavLink to='/users' activeClassName={classes.activeLink}>Users</NavLink></Menu.Item>
                <Menu.Item key="4" icon={<MessageOutlined />}><NavLink to='/chat' activeClassName={classes.activeLink}>Chat</NavLink></Menu.Item>
        </Menu>
        </>
            );
}

export default SocialNetworkApp;