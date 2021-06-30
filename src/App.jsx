import React from "react"
import s from "./App.module.css"
import ProfileContainer from "./components/Profile/ProfileContainer"
import {withRouter, NavLink, HashRouter, Redirect, Route } from "react-router-dom"
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
  setIndex
} from "./redux/AppReducer/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import {
  getInitialized,
  getTheme,
  getHeaderBlur,
  getInnerHeight,
  getIsPostCreation,
  getIndex,
  
} from "./redux/AppReducer/app-selectors"
import store from "./redux/redux-store"
import { useHistory } from "react-router-dom";
import { getIsAuth } from "./redux/AuthReducer/auth-selectors"
import MyPostsContainer from "./components/Posts/MyPosts/MyPostsContainer"
import ServicesContainer from "./components/Menu/MenuContainer"
import Registration from "./components/Registration/Registration"
import Home from './assets/images/homeW.png'
import Profile from './assets/images/profileW.png'
import Posts from './assets/images/postsW.png'
import UsersW from './assets/images/usersW.png'
import SettingsW from './assets/images/settingsW.png'
import MenuW from './assets/images/menuW.png'
import FriendsW from './assets/images/friendsW.png'
import SearchW from './assets/images/searchW.png'
import SwipeableViews from 'react-swipeable-views';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "./components/Menu/Menu"
import Search from "./assets/images/searchW.png"
import SearchB from "./assets/images/searchB.png"
import MenuContainer from "./components/Menu/MenuContainer"

const urlIndex =  {
  0: 'news',
  1: 'profile',
  2: 'posts',
  3: 'users',
  4: 'friends',
  5: 'menu'

}
let i = NaN
class App extends React.Component {
  str = window.location.href
  state = {
    focus: false
  }

  handleChange = (event, value) => {
    for (let key in urlIndex) {
      if (key == value) {
        i = key
        break
      }
      
    }
    window.location = '/social-network#/' + urlIndex[i];
    this.props.setIndex(Number(value))
    // this.setState({
    //   index: Number(value),
    // });
  };
  handleChangeIndex = index => {
    for (let key in urlIndex) {
      if (key == index) {
        i = key
        break
      }
      
    }
    window.location = '/social-network#/' + urlIndex[i];
    this.props.setIndex(Number(index))
  };
  // setIndex = value => { 
  //   this.setState({
  //     index: Number(value),
  //   });
  // }
  changeIndex = velue => {
    
    let strUpdate = velue.substr(38)
    strUpdate = strUpdate.replace(/[^a-zа-яё]/gi, '');
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
    strUpdate = strUpdate.replace(/[^a-zа-яё]/gi, '');
    if (strUpdate == '') {
      i = 0
      window.location = '/social-network#/' + urlIndex[i]; 
    } else if (strUpdate == 'settings') {
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
  // componentDidUpdate() {
  //   let newsUrl = window.location.href
  //   if (str !=  newsUrl) {
  //     alert('123')
  //     let strUpdate = str.substr(38)
  //     for (let key in urlIndex) {
  //       if (urlIndex[key] == strUpdate) {
  //         i = key
  //         break
  //       }
  //     }
  //   this.setIndex(i)

  //   }
  // }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname.length == 1) {
        window.location = '/social-network#/' + 'news';
      }
      let url = this.props.location.pathname
      url = url.replace(/[^a-zа-яё]/gi, '') 
      if (url == 'settings') {
        this.props.setIndex(Number(5))
      }
    }
}
  render() {
    // debugger
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
          <div className={s.header + ' ' + (this.props.index != 0 ? s.roll : '')} >
            <div className={s.titleSite} >
              <span className={s.logo} >Mosset</span>
              <div className={s.wrap}>
                <form className={s.forma} action='' autocomplete='off'>
                  <input
                    className={s.search}
                    name='search'
                    type='text'
                    // onChange={props.handleChange}
                    // value={props.value}
                    placeholder='News search'
                    // onFocus={() => {
                    //   setFocus(!focus)
                    // }}
                    // onBlur={() => {
                    //   setFocus(!focus)
                    //   props.resetSearchUsers()
                    // }}
                    // autocomplete='off'
                  />
                  <img
                    src={this.props.theme == "lightTheme" ? SearchB : Search}
                    className={s.searchSubmit}
                    alt='searchSubmit'
                    value='Rechercher'
                    type='submit'
                  />
                </form>
              </div>
            </div>
            
            {/* <div className={s.listOfCategories} > */}
            {/* <Route path='/' render={()   => */}
              <Tabs value={this.props.index} className={s.listOfCategories} onChange={this.handleChange}>
               
                <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={Home} /></div> } />
                <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={Profile} /></div>} />
                <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={Posts} /></div>} />
                <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={UsersW} /></div>} />
                <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={FriendsW} /></div>} />
                <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={MenuW} /></div>} />
                
              </Tabs>
            {/* } /> */}
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
                (this.props.index != 0 ? s.up : '')
              }
            >
              <SwipeableViews
                index={this.props.index}
                enableMouseEvents
                onChangeIndex={this.handleChangeIndex}>
                <Route 
                    path='/news' 
                    render={() => <NewsContainer 
                    changeIndex={this.changeIndex} 
                    strUrl={this.str}/>} />
                <Route 
                    path='/profile/:userid?'
                    render={() => <ProfileContainer 
                    changeIndex={this.changeIndex} 
                    strUrl={this.str} />}
                  />
                <Route 
                    path='/posts' 
                    render={() => <MyPostsContainer 
                    changeIndex={this.changeIndex} 
                    strUrl={this.str} />} />
                <Route 
                    path='/users' 
                    render={() => <UsersContainer 
                    changeIndex={this.changeIndex} 
                    strUrl={this.str} />} />
                <Route 
                    path='/friends' 
                    render={() => <FriendsContainer 
                    changeIndex={this.changeIndex} 
                    strUrl={this.str} />} />
                <Route 
                    path='/menu' 
                    render={() => <MenuContainer 
                    changeIndex={this.changeIndex} 
                    strUrl={this.str} />} />
                
                
              </SwipeableViews>
              <Route 
                    path='/settings' 
                    render={() => <SettingsContainer  />} />
              
              
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
  }
}

let AppContainer = compose(
  connect(mapStateToProps, {
    initializeApp,
    // addPostActionCreator,
    toggleIsPostCreation,
    setTheme,
    toggleIsHeaderBlur,
    setIndex
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
