import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from "./Components/Navbar/Navbar";
import Profile from './Components/Profile/Profile';
import Dialogs from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from 'react-router-dom'
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import store from "./Redux/store";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";

const App = (props) => {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route  path='/dialogs' render={ () => <DialogsContainer />}/>
                    <Route  path='/profile' render={ () => <Profile />}/>
                    <Route  path='/news' render={ () => <News/>}/>
                    <Route  path='/music' render={ () => <Music/>}/>
                    <Route  path='/settings' render={ () => <Settings/>}/>
                    <Route  path='/users' render={ () => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
