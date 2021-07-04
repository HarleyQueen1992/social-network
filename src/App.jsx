import React from "react"
import s from "./App.module.css"
import ProfileContainer from "./components/Profile/ProfileContainer"
import { withRouter, HashRouter, Redirect, Route } from "react-router-dom"
import SettingsContainer from "./components/Settings/SettingsContainer"
import NewsContainer from "./components/News/NewsContainer"
import UsersContainer from "./components/Users/UsersContainer"
import FriendsContainer from "./components/Friends/FriendsContainer"
import Login from "./components/Login/Login"
import { compose } from "redux"
import { connect, Provider } from "react-redux"
import {
  initializeApp,
  toggleIsPostCreation,
  setTheme,
  toggleIsHeaderBlur,
  setIndex,
  toggleIsBigScreen,
} from "./redux/AppReducer/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import {
  getInitialized,
  getTheme,
  getHeaderBlur,
  getInnerHeight,
  getIsPostCreation,
  getIndex,
  getIsBigScreen,
} from "./redux/AppReducer/app-selectors"
import store from "./redux/redux-store"
import { getIsAuth, getProfileInfo } from "./redux/AuthReducer/auth-selectors"
import MyPostsContainer from "./components/Posts/MyPosts/MyPostsContainer"
import Registration from "./components/Registration/Registration"
import SwipeableViews from "react-swipeable-views"
import MenuContainer from "./components/Menu/MenuContainer"
import Header from "./components/Header/Header"

const urlIndex = {
  0: "news",
  1: "profile",
  2: "posts",
  3: "users",
  4: "friends",
  5: "menu",
}
let i = NaN
class App extends React.Component {
  str = window.location.href

  // location = window.location
  state = {
    isBigScreen: window.innerWidth > 600,
  }
  handleChange = (event, value) => {
    for (let key in urlIndex) {
      if (key == value) {
        i = key
        break
      }
    }
    window.location = "/social-network#/" + urlIndex[i]
    this.props.setIndex(Number(value))
  }

  handleChangeIndex = index => {
    for (let key in urlIndex) {
      if (key == index) {
        i = key
        break
      }
    }
    window.location = "/social-network#/" + urlIndex[i]
    this.props.setIndex(Number(index))
  }

  changeIndex = velue => {
    let strUpdate = velue.substr(38)
    strUpdate = strUpdate.replace(/[^a-zа-яё]/gi, "")

    for (let key in urlIndex) {
      if (urlIndex[key] == strUpdate) {
        i = key
        break
      }
    }

    this.str = velue
    this.props.setIndex(Number(i))
  }

  componentDidMount() {
    let strUpdate = this.str.substr(38)
    strUpdate = strUpdate.replace(/[^a-zа-яё]/gi, "")

    if (strUpdate == "") {
      i = 0
      window.location = "/social-network#/" + urlIndex[i]
    } else if (strUpdate == "settings") {
      i = 5
    } else {
      for (let key in urlIndex) {
        if (urlIndex[key] == strUpdate) {
          i = key
          break
        }
      }
    }
    this.props.setIndex(Number(i))
    this.props.initializeApp()
  }

  themeToggler = () => {
    this.props.theme === "light"
      ? this.props.setTheme("dark")
      : this.props.setTheme("light")
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname.length == 1) {
        window.location = "/social-network#/news"
      }
      let url = this.props.location.pathname
      url = url.replace(/[^a-zа-яё]/gi, "")
      if (url == "settings") {
        this.props.setIndex(Number(5))
      }
    }
  }
  render() {
    const toggleIsBigScreen = value => {
      this.setState({
        isBigScreen: value,
      })
    }
    const themeToggler = () => {
      this.props.theme == "lightTheme"
        ? this.props.setTheme("dark")
        : this.props.setTheme("light")
    }
    // window.addEventListener("resize", function () {
    //   if (window.innerWidth > 600) {
    //     toggleIsBigScreen(true)
    //   } else {
    //     toggleIsBigScreen(false)
    //   }
    // })
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
            <Header
              handleChange={this.handleChange}
              index={this.props.index}
              theme={this.props.theme}
            />
            <div
              className={
                s.appWrapperContent + " " + (this.props.index != 0 ? s.up : "")
              }
            >
              <SwipeableViews
                index={this.props.index}
                enableMouseEvents
                onChangeIndex={this.handleChangeIndex}
                className={s.swipeableViews}
              >
                <Route
                  path='/news'
                  render={() => (
                    <NewsContainer
                      changeIndex={this.changeIndex}
                      strUrl={this.str}
                    />
                  )}
                />
                <Route
                  path='/profile/:userid?'
                  render={() => (
                    <ProfileContainer
                      changeIndex={this.changeIndex}
                      strUrl={this.str}
                    />
                  )}
                />
                <Route
                  path='/posts'
                  render={() => (
                    <MyPostsContainer
                      changeIndex={this.changeIndex}
                      strUrl={this.str}
                    />
                  )}
                />
                <Route
                  path='/users'
                  render={() => (
                    <UsersContainer
                      changeIndex={this.changeIndex}
                      strUrl={this.str}
                    />
                  )}
                />
                <Route
                  path='/friends'
                  render={() => (
                    <FriendsContainer
                      changeIndex={this.changeIndex}
                      strUrl={this.str}
                    />
                  )}
                />
                <Route
                  path='/menu'
                  render={() => (
                    <MenuContainer
                      changeIndex={this.changeIndex}
                      strUrl={this.str}
                    />
                  )}
                />
              </SwipeableViews>
              <Route path='/settings' render={() => <SettingsContainer />} />

              {/* <Route path='/login' render={() => <Login />} />
              
              <Route path='/friends' render={() => <FriendsContainer />} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/posts' render={() => <MyPostsContainer />} />
              <Route path='/services' render={() => <ServicesContainer />} /> */}

              {/* <Route path='/' exact render={() => <ProfileContainer />} /> */}
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
    index: getIndex(state),
    isBigScreen: getIsBigScreen(state),
    profileInfo: getProfileInfo(state),
  }
}

let AppContainer = compose(
  connect(mapStateToProps, {
    initializeApp,
    toggleIsPostCreation,
    setTheme,
    toggleIsHeaderBlur,
    setIndex,
    toggleIsBigScreen,
  }),
  withRouter
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
