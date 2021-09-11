import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

//? Reducer imports
import {
  getUsersProfileData,
  getProfileData,
} from "../../redux/ProfileReducer/profile-reducer";
import {
  requestPosts,
  setUploadPost,
  clearPosts,
  requestUserPosts,
  setPageSelection,
} from "./../../redux/PostsReducer/posts-reducer";

//? Selectors imports
import {
  getIsFatching,
  getProfile,
} from "../../redux/ProfileReducer/profile-selectors";

import {
  getLoadingPosts,
  getPagePosts,
  getPosts,
  getTotalPostsItems,
  getUploadPosts,
  getOrdering,
} from "./../../redux/PostsReducer/posts-selectors";
import { getProfileInfo } from "../../redux/AuthReducer/auth-selectors";

//? Components
import Profile from "./Profile";
import Preloader from "../common/Preloader/Preloader";

//? Css
import s from "./Profile.module.css";
import { withAuthRedirecr } from "../../Hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let login = this.props.match.params.login;

    if (!login || login == this.props.profileInfo.login) {
      this.props.setPageSelection("posts");
      login = this.props.profileInfo.login;
      this.props.getProfileData(login);
      this.props.requestPosts(1);
    } else {
      this.props.setPageSelection("userPosts");
      this.props.getUsersProfileData(login);
      this.props.requestUserPosts(login, 1);
    }
  }
  componentDidMount() {
    this.props.clearPosts();
    this.refreshProfile();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.ordering !== this.props.ordering) {
      if (this.props.match.params.login) {
        this.props.requestUserPosts(
          this.props.match.params.login,
          1,
          this.props.ordering
        );
      } else {
        this.props.requestPosts(1, "", this.props.ordering);
      }
    }
    if (this.props.uploadPosts && !this.props.loadingPosts) {
      if (this.props.match.params.login) {
        this.props.requestUserPosts(
          this.props.match.params.login,
          this.props.postsPage,
          this.props.ordering
        );
      } else {
        this.props.requestPosts(this.props.postsPage, "", this.props.ordering);
      }
    }
    if (this.props.match.params.login !== prevProps.match.params.login) {
      this.props.clearPosts();
      this.refreshProfile();
    }
  }
  componentWillUnmount() {
    this.props.clearPosts();
  }

  render() {
    return (
      <>
        {this.props.isFatching ? (
          <Preloader />
        ) : this.props.profile == "notFound" ? (
          <div className={s.userIsNotFound}>
            <span>User is not found</span>
          </div>
        ) : (
          <Profile
            {...this.props}
            isOwner={
              !this.props.match.params.login ||
              this.props.match.params.login == this.props.profileInfo.login
            }
            profile={this.props.profile}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: getProfile(state),
  isFatching: getIsFatching(state),
  profileInfo: getProfileInfo(state),
  posts: getPosts(state),
  uploadPosts: getUploadPosts(state),
  loadingPosts: getLoadingPosts(state),
  totalPostsItems: getTotalPostsItems(state),
  postsPage: getPagePosts(state),
  ordering: getOrdering(state),
});

export default compose(
  connect(mapStateToProps, {
    getUsersProfileData,
    getProfileData,
    requestPosts,
    setUploadPost,
    clearPosts,
    requestUserPosts,
    setPageSelection,
  }),
  withRouter,
  withAuthRedirecr
)(ProfileContainer);
