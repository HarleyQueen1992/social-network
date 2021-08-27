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
} from "../../../redux/PostsReducer/posts-selectors";
import { withRouter } from "react-router-dom";
import { withAuthRedirecr } from "./../../../Hoc/withAuthRedirect";
import {
  getNewPostText,
  getIsFatching,
} from "../../../redux/ProfileReducer/profile-selectors";
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
      this.props.requestAllPosts(1);
    } else if (posts == "my" || posts == undefined) {
      this.props.setPageSelection("posts");
      this.props.requestPosts(1);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pageSelection !== this.props.pageSelection) {
      this.props.clearPosts();
      if (this.props.pageSelection === "posts") {
        this.props.requestPosts(1);
      } else {
        this.props.requestAllPosts(1);
      }
    } else {
      if (this.props.uploadPosts && !this.props.loadingPosts) {
        if (this.props.pageSelection === "posts") {
          this.props.requestPosts(this.props.postsPage, this.props.q);
        } else {
          this.props.requestAllPosts(this.props.postsPage, this.props.q);
        }
      }
    }
    // if (this.props.uploadPosts && !this.props.loadingPosts) {
    //   this.props.requestPosts(this.props.postsPage);
    // }
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
  }),
  withRouter,
  withAuthRedirecr
)(MyPostsContainer);
