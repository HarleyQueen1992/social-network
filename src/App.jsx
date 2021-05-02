import React, { Component } from "react"
import "./App.css"
import HeaderContaioner from "./components/Header/HeaderContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import { HashRouter, Redirect, Route, withRouter } from "react-router-dom"
import SettingsContainer from "./components/Settings/SettingsContainer"
import NewsContainer from "./components/News/NewsContainer"
import Music from "./components/Music/Music"
import UsersContainer from "./components/Users/UsersContainer"
import FriendsContainer from "./components/Friends/FriendsContainer"
import NavbarContainer from "./components/Navbar/NavbarContainer"
import Login from "./components/Login/Login"
import { compose } from "redux"
import { connect, Provider } from "react-redux"
import {
  initializeApp,
  toggleIsPostCreation,
  setTheme,
} from "./redux/AppReducer/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import {
  getInitialized,
  getIsPostCreation,
  getTheme,
} from "./redux/AppReducer/app-selectors"
import store from "./redux/redux-store"
import { addPostActionCreator } from "./redux/ProfileReducer/profile-reducer"
import { getIsAuth } from "./redux/AuthReducer/auth-selectors"
import { Helmet } from "react-helmet"
import Post from "./components/Profile/MyPosts/Post/Post"
import PostCreation from "./components/Posts/MyPosts/PostCreation/PostCreation"
import MyPostsContainer from "./components/Posts/MyPosts/MyPostsContainer"
import ServicesContainer from "./components/Services/ServicesContainer"
import styled, { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js"

// const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const StyledApp = styled.div`
  background-color: ${props => props.theme.body};
`

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  themeToggler = () => {
    this.props.theme === "light"
      ? this.props.setTheme("dark")
      : this.props.setTheme("light")
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    if (!this.props.isAuth) {
      return (
        <div className='loginPage'>
          <Redirect to='/login/' />
          <Route path='/login' render={() => <Login />} />
        </div>
      )

      // } else if (this.props.isPostCreation) {
      //      return <PostCreation addPostActionCreator={this.props.addPostActionCreator} toggleIsPostCreation={this.props.toggleIsPostCreation} />
    } else {
      return (
        <div className='app-wrapper'>
          <Redirect to='/profile' />

          <HeaderContaioner />
          <NavbarContainer />

          <div className='app-wrapper-content'>
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route
              path='/profile/:userid?'
              render={() => <ProfileContainer />}
            />
            <Route path='/music' render={() => <Music />} />
            <Route path='/settings' render={() => <SettingsContainer />} />
            <Route path='/friends' render={() => <FriendsContainer />} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/posts' render={() => <MyPostsContainer />} />
            <Route path='/services' render={() => <ServicesContainer />} />
            <Route path='/news' render={() => <NewsContainer />} />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    initialized: getInitialized(state),
    isAuth: getIsAuth(state),
    isPostCreation: getIsPostCreation(state),
    theme: getTheme(state),
  }
}

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {
    initializeApp,
    addPostActionCreator,
    toggleIsPostCreation,
    setTheme,
  })
)(App)

const SamuraiJSApp = props => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}

export default SamuraiJSApp
