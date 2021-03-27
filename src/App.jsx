import React from 'react';
import './App.css';
import HeaderContaioner from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import UsersContainer from "./components/Users/UsersContainer";
import FriendsContainer from './components/Friends/FriendsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import Login from './components/Login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './redux/AppReducer/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { withAuthRedirecr } from './Hoc/withAuthRedirect';
import { getInitialized } from './redux/AppReducer/app-selectors';

class App extends React.Component {
    
    componentDidMount() {
       this.props.initializeApp()
    }

    render () {
       if (!this.props.initialized) {
              return <Preloader/>
       }
       return (
              <div className='app-wrapper'>
                     
                     <HeaderContaioner />
                     <NavbarContainer />
             
                     <div className='app-wrapper-content'>
                            <Route path='/dialogs'
                                   render={ () => <DialogsContainer/> }/>
                            <Route path='/profile/:userid?'
                                   render={ () => <ProfileContainer /> }/>
                            <Route path='/news' render={ () => <News />}/>
                            <Route path='/music' render={ () => <Music />}/>
                            <Route path='/settings' render={ () => <Settings />}/>
                            <Route path='/friends'
                                   render={ () => <FriendsContainer /> }/>
                            <Route path='/users' 
                                   render={ () => <UsersContainer/> }/>
                            <Route path='/login' 
                                   render={ () => <Login/> }/>                  
                     </div>

              </div>);
       }
       
};

const mapStateToProps = (state) => {
    return {
       initialized: getInitialized(state)
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps,{initializeApp})
)(App)

