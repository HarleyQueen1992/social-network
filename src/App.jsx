import React, { useEffect, useState } from "react";
import s from "./App.module.css";
import "./App.css";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {
  withRouter,
  HashRouter,
  Switch,
  Redirect,
  Route,
  useLocation,
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
import Activation from "./components/Activation/Activation";

const urlIndex = {
  0: "news",
  1: "profile",
  2: "posts",
  3: "users",
  4: "followings",
  5: "menu",
};
let i = NaN;
const App = (props) => {
  let [prevUrl, setPrevUrl] = useState("");
  for (let property in props.theme) {
    document.documentElement.style.setProperty(
      "--" + property,
      props.theme[property]
    );
  }
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 900);
  const [isScrolling, setIsScrolling] = useState(window.scrollY > 0);
  let str = window.location.href;
  let url = window.location.origin + "/social-network/#/";

  let handleChange = (event, value) => {
    for (let key in urlIndex) {
      if (key == value) {
        i = key;
        break;
      }
    }
    window.location = "/social-network/#/" + urlIndex[i];
    props.setIndex(Number(value));
    window.scroll(0, 0);
  };

  let handleChangeIndex = (index) => {
    for (let key in urlIndex) {
      if (key == index) {
        i = key;
        break;
      }
    }

    window.location = "/social-network/#/" + urlIndex[i];
    props.setIndex(Number(index));
    window.scroll(0, 0);
  };

  let changeIndex = (velue, scrollY = 0) => {
    let strUpdate = velue.substr(url.length);
    strUpdate = strUpdate.split("/")[0];

    strUpdate = strUpdate.replace(/[^a-zа-яё]/gi, "");
    for (let key in urlIndex) {
      if (urlIndex[key] == strUpdate) {
        i = key;
        break;
      }
    }

    str = velue;

    props.setIndex(Number(i));
    window.scroll(0, scrollY);
  };

  useEffect(() => {
    let strUpdate = str.substr(url.length);
    let abcd = strUpdate.slice(0, 7);
    if (abcd === "profile") {
      i = 1;
    } else {
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
    }

    props.setIndex(Number(i));
    props.initializeApp();
  }, []);
  // useEffect(() => {
  //   // setIsOnline(status.isOnline);

  // }, [props.theme]);
  window.onresize = () => {
    setSmallScreen(window.innerWidth < 900);
  };
  window.onscroll = function (e) {
    setIsScrolling(window.scrollY > 0); // Value of scroll Y in px
  };
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  useEffect(() => {
    let id = query.get("id");
    let scroll = window.scrollY;
    if (!id) {
      document.querySelector("body").style.cssText = "overflow: scroll;";
      props.setIsBigPictures(false);
      changeIndex(window.location.href, scroll);
    } else {
      props.setIsBigPictures(true);
    }
    setPrevUrl(window.location.href);
  }, [window.location.href]);

  useEffect(() => {
    if (props.location.pathname.length == 1) {
      window.location = "/social-network/#/news";
    }
    let url = props.location.pathname;

    url = url.replace(/[^a-zа-яё]/gi, "");
    if (url == "settings") {
      props.setIndex(Number(5));
    }
  }, [props.location.pathname]);

  if (!props.initialized) {
    return <Preloader />;
  }
  if (!props.isAuth) {
    return (
      <div className="loginPage">
        <Redirect to="/login/" />
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Registration />} />
        <Route path="/activation" render={() => <Activation />} />
      </div>
    );
  } else {
    return (
      <>
        <div className={s.appWrapper}>
          {/* <Route
            path="/photo"
            render={() => <BigPictures selectPost={props.selectPost} />}
          /> */}
          <Header
            // isBigScreen={isBigScreen}
            handleChange={handleChange}
            index={props.index}
            theme={"adasd"}
          />
          <div
            className={s.loaderBlock + " " + (props.isLoader && s.loaderActive)}
          >
            <img className={s.loader} src={loaderWhite} alt="loader" />
          </div>

          <div
            className={
              s.scrollUpArrowBlock +
              " " +
              (smallScreen & isScrolling && s.scrollUpArrowBlockActive)
            }
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <div className={s.scrollUpArrow}></div>
          </div>

          {props.isBigPictures && <BigPictures />}
          {props.isUpdatePost ? (
            <UpdatePost
              setIsUpdatePost={props.setIsUpdatePost}
              isUpdatePost={props.isUpdatePost}
              profile={props.updatePostData.author}
              valueText={props.updatePostData.body}
              valueTitle={props.updatePostData.title}
              valueImages={props.updatePostData.attachments}
              postId={props.updatePostData.id}
              setDropdownMenus={props.setDropdownMenus}
              translate={
                props.index == 0
                  ? "0%"
                  : props.index == 1
                  ? "-100%"
                  : props.index == 2 && "-200%"
              }
              updatePost={props.isUpdatePost}
              // addPostActionCreator={props.addPostActionCreator}
              updatePost={props.updatePost}
            />
          ) : (
            ""
          )}
          <div
            className={
              s.appWrapperContent +
              " " +
              (props.index != 0 ? s.up : " ") +
              " " +
              (props.editMode ? s.appWrapperContentEditMode : " ")
            }
            id="appWraperContent"
          >
            {/* {props.dropdownMenus && <DropdownMenus />} */}

            {(props.location.pathname === "/news") |
            (props.location.pathname.substr(0, 8) === "/profile") |
            (props.location.pathname.substr(0, 6) === "/posts") |
            (props.location.pathname === "/users") |
            (window.innerWidth < 900 && props.location.pathname === "/menu") |
            (props.location.pathname.substr(0, 11) === "/followings") ? (
              <SwipeableViews
                index={props.index}
                enableMouseEvents
                onChangeIndex={handleChangeIndex}
                className={s.swipeableViews}
              >
                <Route
                  path="/news"
                  render={() => (
                    <NewsContainer changeIndex={changeIndex} strUrl={str} />
                  )}
                />
                <Route
                  path="/profile/:login?"
                  render={() => (
                    <ProfileContainer changeIndex={changeIndex} strUrl={str} />
                  )}
                />
                <Route
                  path="/posts/:posts?"
                  render={() => (
                    <MyPostsContainer changeIndex={changeIndex} strUrl={str} />
                  )}
                />
                <Route
                  path="/users"
                  render={() => (
                    <UsersContainer changeIndex={changeIndex} strUrl={str} />
                  )}
                />
                <Route
                  path="/followings/:login?"
                  render={() => (
                    <FollowingsContainer
                      changeIndex={changeIndex}
                      strUrl={str}
                    />
                  )}
                />
                {window.innerWidth < 900 && (
                  <Route
                    path="/menu"
                    render={() => (
                      <MenuContainer changeIndex={changeIndex} strUrl={str} />
                    )}
                  />
                )}
              </SwipeableViews>
            ) : (
              <Switch>
                <Route
                  path="/settings"
                  render={() => {
                    console.log("123");
                  }}
                />
                {/* <Route
                  path="/photo"
                  render={() => <BigPictures selectPost={props.selectPost} />}
                /> */}
                <Route
                  path="/followers/:login?"
                  render={() => <FollowersContainer />}
                />
                <Route render={() => <PageNotFound />} />
              </Switch>
            )}
          </div>
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
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
