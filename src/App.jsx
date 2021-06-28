import React from "react"
import s from "./App.module.css"
import ProfileContainer from "./components/Profile/ProfileContainer"
import { NavLink, HashRouter, Redirect, Route } from "react-router-dom"
import SettingsContainer from "./components/Settings/SettingsContainer"
import NewsContainer from "./components/News/NewsContainer"
import UsersContainer from "./components/Users/UsersContainer"
import FriendsContainer from "./components/Friends/FriendsContainer"
import Navbar from "./components/Navbar/Navbar"
import Login from "./components/Login/Login"
import { compose } from "redux"
import { connect, Provider } from "react-redux"
import {
  initializeApp,
  toggleIsPostCreation,
  setTheme,
  toggleIsHeaderBlur,
  toggleIsChange
} from "./redux/AppReducer/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import {
  getInitialized,
  getTheme,
  getHeaderBlur,
  getInnerHeight,
  getIsPostCreation,
  getIsChange,
  
} from "./redux/AppReducer/app-selectors"
import store from "./redux/redux-store"
import { useHistory } from "react-router-dom";
import { getIsAuth } from "./redux/AuthReducer/auth-selectors"
import MyPostsContainer from "./components/Posts/MyPosts/MyPostsContainer"
import ServicesContainer from "./components/Services/ServicesContainer"
import Registration from "./components/Registration/Registration"
import Home from './assets/images/homeW.png'
import Profile from './assets/images/profileW.png'
import Posts from './assets/images/postsW.png'
import UsersW from './assets/images/usersW.png'
import SettingsW from './assets/images/settingsW.png'
import FriendsW from './assets/images/friendsW.png'
import SearchW from './assets/images/searchW.png'
import SwipeableViews from 'react-swipeable-views';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const urlIndex =  {
  0: 'news',
  1: 'profile',
  2: 'posts',
  3: 'users',
  4: 'friends'

}
let i = 0
class App extends React.Component {
  state = {
    index: 0
  };
  handleChange = (event, value) => {
    for (let key in urlIndex) {
      if (key == value) {
        i = key
        break
      }
      
    }
    window.location = '/social-network#/' + urlIndex[i];
    this.setState({
      index: value,
    });
  };
  handleChangeIndex = index => {
    for (let key in urlIndex) {
      if (key == index) {
        i = key
        break
      }
      
    }
    window.location = '/social-network#/' + urlIndex[i];
    this.setState({
      index,
    });
  };
  componentDidMount() {
    let str = window.location.href
    str = str.substr(38)
    for (let key in urlIndex) {
      if (urlIndex[key] == str) {
        i = key
        break
      }
    }
    this.setState({
      index: Number(i),
    });
    this.props.initializeApp()
  }
  themeToggler = () => {
    this.props.theme === "light"
      ? this.props.setTheme("dark")
      : this.props.setTheme("light")
  }
  render() {
    const { index } = this.state;
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
          <div className={s.header + ' ' + (index != 0 ? s.roll : '')} >
            <div className={s.titleSite} >
                <span className={s.logo} >Mosset</span>
                <img className={s.searchImg} src={SearchW} alt="search"/>
            </div>
            
            {/* <div className={s.listOfCategories} > */}
              <Tabs value={index} className={s.listOfCategories} onChange={this.handleChange}>
                  <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={Home} /></div> } />
                  <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={Profile} /></div>} />
                  <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={Posts} /></div>} />
                  <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={UsersW} /></div>} />
                  {/* <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={SettingsW} /></div>} /> */}
                  <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={FriendsW} /></div>} />
              </Tabs>
          </div>
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
                (this.props.isPostCreation ? s.isPostCreation : "") +
                ' ' + 
                (index != 0 ? s.up : '')
              }
            >
              <SwipeableViews
                index={index}
                enableMouseEvents
                onChangeIndex={this.handleChangeIndex}>
                <Route path='/news' render={() => <NewsContainer />} />
                
                  
                <Route
                    path='/profile/:userid?'
                    render={() => <ProfileContainer />}
                  />
                
                <Route path='/posts' render={() => <MyPostsContainer />} />
                <Route path='/users' render={() => <UsersContainer />} />
                <Route path='/friends' render={() => <FriendsContainer />} />
                
                
              </SwipeableViews>
              
              <Route path='/settings' render={() => <SettingsContainer />} />
              {/* <Route path='/login' render={() => <Login />} />
              
              <Route path='/friends' render={() => <FriendsContainer />} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/posts' render={() => <MyPostsContainer />} />
              <Route path='/services' render={() => <ServicesContainer />} /> */}
              {/* <Route path='/news' render={()   => <NewsContainer />} /> */}
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
    isChange: getIsChange(state),
  }
}

let AppContainer = compose(
  connect(mapStateToProps, {
    initializeApp,
    // addPostActionCreator,
    toggleIsPostCreation,
    setTheme,
    toggleIsHeaderBlur,
    toggleIsChange
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
