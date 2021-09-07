import React from "react";
import {
  addPostActionCreator,
  addLike,
  deletePost,
  requestPosts,
  setUploadPost,
  clearPosts,
  setPageSelection,
  requestAllPosts,
} from "../../../redux/PostsReducer/posts-reducer";
import {
  getPosts,
  getUploadPosts,
  getLoadingPosts,
  getPagePosts,
  getTotalPostsItems,
  getPageSelection,
  getQ,
  getOrdering,
} from "../../../redux/PostsReducer/posts-selectors";
import { withRouter } from "react-router-dom";
import { withAuthRedirecr } from "./../../../Hoc/withAuthRedirect";
import {
  getNewPostText,
  getIsFatching,
} from "../../../redux/ProfileReducer/profile-selectors";
import { setIsOpenFilters } from "./../../../redux/ProfileReducer/profile-reducer";
import {
  toggleIsPostCreation,
  toggleIsHeaderBlur,
} from "../../../redux/AppReducer/app-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import {
  getLogin,
  getProfileInfo,
} from "../../../redux/AuthReducer/auth-selectors";
import { compose } from "redux";
import Preloader from "../../common/Preloader/Preloader";
import {
  getHeaderBlur,
  getIsPostCreation,
  getTheme,
} from "../../../redux/AppReducer/app-selectors";
import s from "./MyPosts.module.css";

class MyPostsContainer extends React.Component {
  componentDidMount() {
    this.props.clearPosts();
    let posts = this.props.match.params.posts;

    if (posts == "all") {
      this.props.setPageSelection("allPosts");
    } else if (posts == "my" || posts == undefined) {
      this.props.setPageSelection("posts");
      this.props.requestPosts(1);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ordering != this.props.ordering) {
      if (this.props.pageSelection === "posts") {
        this.props.requestPosts(1, "", this.props.ordering);
      } else {
        this.props.requestAllPosts(1, "", this.props.ordering);
      }
    }
    let currentUrl = window.location.hash.replace(/^#/, "");
    if (prevProps.location.pathname !== currentUrl) {
      if (currentUrl == "/posts/my" || currentUrl == "/posts") {
        this.props.setPageSelection("posts");
      } else if (currentUrl == "/posts/all") {
        this.props.setPageSelection("allPosts");
      }
    }
    if (prevProps.pageSelection !== this.props.pageSelection) {
      if (this.props.pageSelection === "posts") {
        this.props.clearPosts();
        this.props.requestPosts(1, "", this.props.ordering);
      } else {
        this.props.clearPosts();
        this.props.requestAllPosts(1, "", this.props.ordering);
      }
    } else {
      if (this.props.uploadPosts && !this.props.loadingPosts) {
        if (this.props.pageSelection === "posts") {
          this.props.requestPosts(
            this.props.postsPage,
            this.props.q,
            this.props.ordering
          );
        } else {
          this.props.requestAllPosts(
            this.props.postsPage,
            this.props.q,
            this.props.ordering
          );
        }
      }
    }
  }
  componentWillUnmount() {
    this.props.clearPosts();
  }
  render() {
    return (
      <div className={s.newsPage}>
        {this.props.profile === null ? (
          <Preloader />
        ) : (
          <MyPosts
            theme={this.props.theme}
            deletePost={this.props.deletePost}
            addPostActionCreator={this.props.addPostActionCreator}
            addLike={this.props.addLike}
            posts={this.props.posts}
            newPostText={this.props.newPostText}
            login={this.props.login}
            profile={this.props.profile}
            isPostCreation={this.props.isPostCreation}
            toggleIsPostCreation={this.props.toggleIsPostCreation}
            toggleIsHeaderBlur={this.props.toggleIsHeaderBlur}
            headerBlur={this.props.headerBlur}
            changeIndex={this.props.changeIndex}
            strUrl={this.props.str}
            totalPostsItems={this.props.totalPostsItems}
            setUploadPost={this.props.setUploadPost}
            setPageSelection={this.props.setPageSelection}
            loadingPosts={this.props.loadingPosts}
            pageSelection={this.props.pageSelection}
            setIsOpenFilters={this.props.setIsOpenFilters}
          />
        )}
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    posts: getPosts(state),
    newPostText: getNewPostText(state),
    login: getLogin(state),
    profile: getProfileInfo(state),
    isFatching: getIsFatching(state),
    headerBlur: getHeaderBlur(state),
    isPostCreation: getIsPostCreation(state),
    theme: getTheme(state),
    uploadPosts: getUploadPosts(state),
    loadingPosts: getLoadingPosts(state),
    totalPostsItems: getTotalPostsItems(state),
    postsPage: getPagePosts(state),
    pageSelection: getPageSelection(state),
    q: getQ(state),
    ordering: getOrdering(state),
  };
};
export default compose(
  connect(mapStateToProps, {
    deletePost,
    addLike,
    addPostActionCreator,
    toggleIsPostCreation,
    toggleIsHeaderBlur,
    clearPosts,
    requestPosts,
    setUploadPost,
    setPageSelection,
    requestAllPosts,
    setIsOpenFilters,
  }),
  withRouter,
  withAuthRedirecr
)(MyPostsContainer);
