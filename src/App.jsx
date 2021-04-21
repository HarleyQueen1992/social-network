import React, {Component} from 'react';
import './App.css';
import HeaderContaioner from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {HashRouter, Redirect, Route, withRouter} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import UsersContainer from "./components/Users/UsersContainer";
import FriendsContainer from './components/Friends/FriendsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import Login from './components/Login/Login';
import { compose } from 'redux';
import { connect, Provider} from 'react-redux';
import { initializeApp, toggleIsPostCreation } from './redux/AppReducer/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { getInitialized, getIsPostCreation } from './redux/AppReducer/app-selectors';
import store from "./redux/redux-store";
import {addPostActionCreator} from './redux/ProfileReducer/profile-reducer'
import { getIsAuth } from './redux/AuthReducer/auth-selectors';
import {Helmet} from 'react-helmet'
import Post from './components/Profile/MyPosts/Post/Post';
import PostCreation from './components/Profile/MyPosts/PostCreation/PostCreation';

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
       if (!this.props.isAuth) {
              return (
                     <div className='loginPage' >
                     <Redirect to='/login/'/>
                     <Route path='/login' render={ () => <Login />}/></div>)

       // } else if (this.props.isPostCreation) {
       //      return <PostCreation addPostActionCreator={this.props.addPostActionCreator} toggleIsPostCreation={this.props.toggleIsPostCreation} />
       } else {    
       return (
              <div className='app-wrapper'>
                     <Redirect to='/profile'/>
                     
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
                                         
                     </div>

              </div>)}
       }
       
};

const mapStateToProps = (state) => {
    return {
       initialized: getInitialized(state),
       isAuth: getIsAuth(state),
       isPostCreation: getIsPostCreation(state)
    }
}

let AppContainer = compose(
       withRouter,
       connect(mapStateToProps, {initializeApp, addPostActionCreator,toggleIsPostCreation}))(App);
   
   const SamuraiJSApp = (props) => {
      return <HashRouter >
           <Provider store={store}>
               <AppContainer />
           </Provider>
       </HashRouter>
   }
   
   export default SamuraiJSApp;
