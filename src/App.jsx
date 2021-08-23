import React from "react";
import s from "./App.module.css";
import "./App.css";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {
  withRouter,
  HashRouter,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import SettingsContainer from "./components/Settings/SettingsContainer";
import NewsContainer from "./components/News/NewsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import FollowingsContainer from "./components/Followings/FollowingsContainer";
import Login from "./components/Login/Login";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import {
  initializeApp,
  toggleIsPostCreation,
  setTheme,
  toggleIsHeaderBlur,
  setIndex,
  toggleIsBigScreen,
  setMenuActive,
  setEditMode,
  setUpdatePost,
  setIsUpdatePost,
} from "./redux/AppReducer/app-reducer";
import {
  updatePost,
  setDropdownMenus,
  setIsBigPictures,
} from "./redux/PostsReducer/posts-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import { blockUser } from "./redux/ProfileReducer/profile-reducer";
import {
  getInitialized,
  getTheme,
  getHeaderBlur,
  getInnerHeight,
  getIsPostCreation,
  getIndex,
  getIsBigScreen,
  getEditMode,
  getMenuActive,
  getIsPostUpdate,
  getUpdatePost,
  getIsLoader,
} from "./redux/AppReducer/app-selectors";
import store from "./redux/redux-store";
import { getIsAuth, getProfileInfo } from "./redux/AuthReducer/auth-selectors";
import MyPostsContainer from "./components/Posts/MyPosts/MyPostsContainer";
import Registration from "./components/Registration/Registration";
import SwipeableViews from "react-swipeable-views";
import MenuContainer from "./components/Menu/MenuContainer";
import Header from "./components/Header/Header";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import EditProfile from "./components/Profile/EditProfile/EditProfile";
import { getValue } from "./redux/SearchReducer/search-selectors";
import FollowersContainer from "./components/Followers/FollowersContainer";
import CreatePost from "./components/Posts/MyPosts/PostCreation/CreatePost/CreatePost";
import UpdatePost from "./components/Posts/MyPosts/PostCreation/UpdatePost/UpdatePost";
import DropdownMenus from "./components/Posts/MyPosts/Post/DropdownMenus/DropdownMenus";
import {
  getDropdownMenus,
  getImgUrl,
  getIsBigPictures,
  getSelectedPost,
} from "./redux/PostsReducer/posts-selectors";
import loaderWhite from "./assets/images/loaderWhite.svg";
import BigPictures from "./components/Posts/BigPictures/BigPictures";
import { getBanUser } from "./redux/ProfileReducer/profile-selectors";

const urlIndex = {
  0: "news",
  1: "profile",
  2: "posts",
  3: "users",
  4: "followings",
  5: "menu",
};
let i = NaN;
class App extends React.Component {
  str = window.location.href;
  url = window.location.origin + "/social-network/#/";

  // location = window.location
  state = {
    isBigScreen: window.innerWidth > 600,
    editMode: false,
  };
  handleChange = (event, value) => {
    for (let key in urlIndex) {
      if (key == value) {
        i = key;
        break;
      }
    }
    window.location = "/social-network/#/" + urlIndex[i];
    this.props.setIndex(Number(value));
    window.scroll(0, 0);
  };

  handleChangeIndex = (index) => {
    for (let key in urlIndex) {
      if (key == index) {
        i = key;
        break;
      }
    }
    window.location = "/social-network/#/" + urlIndex[i];
    this.props.setIndex(Number(index));
    window.scroll(0, 0);
  };

  changeIndex = (velue) => {
    let strUpdate = velue.substr(this.url.length);
    strUpdate = strUpdate.split("/")[0];

    strUpdate = strUpdate.replace(/[^a-zа-яё]/gi, "");
    for (let key in urlIndex) {
      if (urlIndex[key] == strUpdate) {
        i = key;
        break;
      }
    }

    this.str = velue;
    this.props.setIndex(Number(i));
    window.scroll(0, 0);
  };

  componentDidMount() {
    let strUpdate = this.str.substr(this.url.length);
    strUpdate = strUpdate.replace(/[^a-zа-яё]/gi, "");

    if (strUpdate == "") {
      i = 0;
      window.location = "/social-network/#/" + urlIndex[i];
    } else if (strUpdate == "settings") {
      i = 5;
    } else {
      for (let key in urlIndex) {
        if (urlIndex[key] == strUpdate) {
          i = key;
          break;
        }
      }
    }
    this.props.setIndex(Number(i));
    this.props.initializeApp();
  }

  themeToggler = () => {
    this.props.theme === "light"
      ? this.props.setTheme("dark")
      : this.props.setTheme("light");
  };
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname.length == 1) {
        window.location = "/social-network/#/news";
      }
      let url = this.props.location.pathname;
      url = url.replace(/[^a-zа-яё]/gi, "");
      if (url == "settings") {
        this.props.setIndex(Number(5));
      }
    }
  }
  setEitMode = (value) => {
    this.props.setEitMode(getValue);
  };
  render() {
    // window.addEventListener("resize", function () {
    //   if (window.innerWidth > 600) {
    //     toggleIsBigScreen(true)
    //   } else {
    //     toggleIsBigScreen(false)
    //   }
    // })
    if (!this.props.initialized) {
      return <Preloader />;
    }
    if (!this.props.isAuth) {
      return (
        <div className="loginPage">
          <Redirect to="/login/" />
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" render={() => <Registration />} />
        </div>
      );
    } else {
      return (
        <>
          <div className={s.appWrapper}>
            <Header
              isBigScreen={this.isBigScreen}
              handleChange={this.handleChange}
              index={this.props.index}
              theme={"adasd"}
            />
            <div
              className={
                s.loaderBlock + " " + (this.props.isLoader && s.loaderActive)
              }
            >
              <img className={s.loader} src={loaderWhite} alt="loader" />
            </div>
            {this.props.isBigPictures && (
              <BigPictures
                selectPost={this.props.selectPost}
                setIsBigPictures={this.props.setIsBigPictures}
                imgUrl={this.props.imgUrl}
              />
            )}
            {this.props.isUpdatePost ? (
              <UpdatePost
                setIsUpdatePost={this.props.setIsUpdatePost}
                isUpdatePost={this.props.isUpdatePost}
                profile={this.props.updatePostData.author}
                valueText={this.props.updatePostData.body}
                valueTitle={this.props.updatePostData.title}
                valueImages={this.props.updatePostData.attachments}
                postId={this.props.updatePostData.id}
                setDropdownMenus={this.props.setDropdownMenus}
                translate={
                  this.props.index == 0
                    ? "0%"
                    : this.props.index == 1
                    ? "-100%"
                    : this.props.index == 2 && "-200%"
                }
                updatePost={this.props.isUpdatePost}
                // addPostActionCreator={props.addPostActionCreator}
                updatePost={this.props.updatePost}
              />
            ) : (
              ""
            )}
            <div
              className={
                s.appWrapperContent +
                " " +
                (this.props.index != 0 ? s.up : " ") +
                " " +
                (this.props.editMode ? s.appWrapperContentEditMode : " ")
              }
              id="appWraperContent"
            >
              {/* {this.props.dropdownMenus && <DropdownMenus />} */}

              {(this.props.location.pathname === "/news") |
              (this.props.location.pathname.substr(0, 8) === "/profile") |
              (this.props.location.pathname === "/posts") |
              (this.props.location.pathname === "/users") |
              (window.innerWidth < 900 &&
                this.props.location.pathname === "/menu") |
              (this.props.location.pathname.substr(0, 11) === "/followings") ? (
                <SwipeableViews
                  index={this.props.index}
                  enableMouseEvents
                  onChangeIndex={this.handleChangeIndex}
                  className={s.swipeableViews}
                >
                  <Route
                    path="/news"
                    render={() => (
                      <NewsContainer
                        changeIndex={this.changeIndex}
                        strUrl={this.str}
                      />
                    )}
                  />
                  <Route
                    path="/profile/:login?"
                    render={() => (
                      <ProfileContainer
                        changeIndex={this.changeIndex}
                        strUrl={this.str}
                      />
                    )}
                  />
                  <Route
                    path="/posts"
                    render={() => (
                      <MyPostsContainer
                        changeIndex={this.changeIndex}
                        strUrl={this.str}
                      />
                    )}
                  />
                  <Route
                    path="/users"
                    render={() => (
                      <UsersContainer
                        changeIndex={this.changeIndex}
                        strUrl={this.str}
                      />
                    )}
                  />
                  <Route
                    path="/followings/:login?"
                    render={() => (
                      <FollowingsContainer
                        changeIndex={this.changeIndex}
                        strUrl={this.str}
                      />
                    )}
                  />
                  {window.innerWidth < 900 && (
                    <Route
                      path="/menu"
                      render={() => (
                        <MenuContainer
                          changeIndex={this.changeIndex}
                          strUrl={this.str}
                        />
                      )}
                    />
                  )}
                </SwipeableViews>
              ) : (
                <Switch>
                  <Route
                    path="/settings"
                    render={() => <SettingsContainer />}
                  />
                  <Route
                    path="/followers/:login?"
                    render={() => <FollowersContainer />}
                  />
                  <Route render={() => <PageNotFound />} />
                </Switch>
              )}

              {/* <Route path='/login' render={() => <Login />} />
              
              <Route path='/friends' render={() => <FriendsContainer />} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/posts' r  ender={() => <MyPostsContainer />} />
              <Route path='/services' render={() => <ServicesContainer />} /> */}
              {/* <Route path='/' exact render={() => <ProfileContainer />} /> */}
            </div>
            {/* )} */}
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: getInitialized(state),
    isAuth: getIsAuth(state),
    isPostCreation: getIsPostCreation(state),
    // theme: getTheme(state),
    headerBlur: getHeaderBlur(state),
    Height: getInnerHeight(state),
    index: getIndex(state),
    isBigScreen: getIsBigScreen(state),
    profileInfo: getProfileInfo(state),
    editMode: getEditMode(state),
    isMenuActive: getMenuActive(state),
    updatePostData: getUpdatePost(state),
    isUpdatePost: getIsPostUpdate(state),
    dropdownMenus: getDropdownMenus(state),
    isLoader: getIsLoader(state),
    isBigPictures: getIsBigPictures(state),
    selectPost: getSelectedPost(state),
    imgUrl: getImgUrl(state),
    banUser: getBanUser(state),
  };
};

let AppContainer = compose(
  connect(mapStateToProps, {
    initializeApp,
    toggleIsPostCreation,
    setTheme,
    toggleIsHeaderBlur,
    setIndex,
    toggleIsBigScreen,
    setEditMode,
    setMenuActive,
    setUpdatePost,
    setIsUpdatePost,
    updatePost,
    setDropdownMenus,
    setIsBigPictures,
    blockUser,
  }),
  withRouter
)(App);

const SamuraiJSApp = (props) => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};

export default SamuraiJSApp;
