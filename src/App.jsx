import React, {Component} from 'react';
import './App.css';
import HeaderContaioner from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {HashRouter, Route, withRouter} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import UsersContainer from "./components/Users/UsersContainer";
import FriendsContainer from './components/Friends/FriendsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import Login from './components/Login/Login';
import { compose } from 'redux';
import { connect, Provider} from 'react-redux';
import { initializeApp } from './redux/AppReducer/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { getInitialized } from './redux/AppReducer/app-selectors';
import store from "./redux/redux-store";

// const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))


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
                                   render={ () => <DialogsContainer />}/>
                            <Route path='/profile/:userid?'
                                   render={ () => <ProfileContainer />}/>
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

let AppContainer = compose(
       withRouter,
       connect(mapStateToProps, {initializeApp}))(App);
   
   const SamuraiJSApp = (props) => {
      return <HashRouter >
           <Provider store={store}>
               <AppContainer />
           </Provider>
       </HashRouter>
   }
   
   export default SamuraiJSApp;
