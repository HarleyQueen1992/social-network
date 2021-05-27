import React from "react"
import s from "./App.module.css"
import ProfileContainer from "./components/Profile/ProfileContainer"
import { HashRouter, Redirect, Route } from "react-router-dom"
import SettingsContainer from "./components/Settings/SettingsContainer"
import NewsContainer from "./components/News/NewsContainer"
import UsersContainer from "./components/Users/UsersContainer"
import FriendsContainer from "./components/Friends/FriendsContainer"
import Navbar from "./components/Navbar/Navbar"
import Header from "./components/Header/Header"
import Login from "./components/Login/Login"
import { compose } from "redux"
import { connect, Provider } from "react-redux"
import {
  initializeApp,
  toggleIsPostCreation,
  setTheme,
  toggleIsHeaderBlur,
} from "./redux/AppReducer/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import {
  getInitialized,
  getTheme,
  getHeaderBlur,
  getInnerHeight,
  getIsPostCreation,
} from "./redux/AppReducer/app-selectors"
import store from "./redux/redux-store"
import { getIsAuth } from "./redux/AuthReducer/auth-selectors"
import MyPostsContainer from "./components/Posts/MyPosts/MyPostsContainer"
import ServicesContainer from "./components/Services/ServicesContainer"
import Registration from "./components/Registration/Registration"

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
          <Route path='/register' render={() => <Registration />} />
        </div>
      )
    } else {
      return (
        <>
          <div className={s.appWrapper}>
            <Header />
            <Navbar />
            {/* {this.props.isFetching ? (
              <Preloader />
            ) : ( */}
            <div
              className={
                s.appWrapperContent +
                " " +
                (this.props.headerBlur ? s.headerBlur : "") +
                " " +
                (this.props.isPostCreation ? s.isPostCreation : "")
              }
            >
              <Route
                path='/profile/:userid?'
                render={() => <ProfileContainer />}
              />

              <Route path='/login' render={() => <Login />} />
              <Route path='/settings' render={() => <SettingsContainer />} />
              <Route path='/friends' render={() => <FriendsContainer />} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/posts' render={() => <MyPostsContainer />} />
              <Route path='/services' render={() => <ServicesContainer />} />
              <Route path='/news' render={() => <NewsContainer />} />
              <Route path='/' exact render={() => <ProfileContainer />} />
            </div>
            {/* )} */}
          </div>
        </>
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
    headerBlur: getHeaderBlur(state),
    Height: getInnerHeight(state),
  }
}

let AppContainer = compose(
  connect(mapStateToProps, {
    initializeApp,
    // addPostActionCreator,
    toggleIsPostCreation,
    setTheme,
    toggleIsHeaderBlur,
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
