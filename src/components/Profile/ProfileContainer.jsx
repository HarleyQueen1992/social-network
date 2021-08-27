import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirecr } from "../../Hoc/withAuthRedirect";
import {
  getProfileData,
  toggleIsFatching,
  setUserProfile,
  updateStatus,
  getFollow,
  savePhoto,
  setProfileBanner,
  getUsersProfileData,
  subscribe,
  unsubscribe,
  blockUser,
  unblockUser,
} from "../../redux/ProfileReducer/profile-reducer";
import {
  deletePost,
  addPostActionCreator,
  addLike,
  getTheLastPost,
  requestPosts,
  setUploadPost,
  clearPosts,
  requestUserPosts,
  setPageSelection,
} from "./../../redux/PostsReducer/posts-reducer";
import {
  getIsFatching,
  getIsFollowed,
  getProfile,
  getIsSavingPhoto,
  getStatus,
  getSubscribers,
  getSubscriptions,
  getTotalSubscriptionsItems,
  getTotalSubscribersItems,
  getAvatarIsLoading,
  getBannerIsLoading,
  getBanUser,
} from "../../redux/ProfileReducer/profile-selectors";
import { requestAllFriends } from "./../../redux/FriendsReducer/friends-reducer";
import Profile from "./Profile";
import {
  getLastPost,
  getLoadingPosts,
  getPagePosts,
  getPosts,
  getTotalPostsItems,
  getUploadPosts,
} from "./../../redux/PostsReducer/posts-selectors";
import {
  getIsAuth,
  getProfileInfo,
  getUserId,
} from "../../redux/AuthReducer/auth-selectors";
import Preloader from "../common/Preloader/Preloader";
import {
  toggleIsPostCreation,
  setEditMode,
} from "./../../redux/AppReducer/app-reducer";
import {
  follow,
  unfollow,
  getUsersListFollowing,
} from "../../redux/UsersReducer/user-reducer";
import {
  getEditMode,
  getIsPostCreation,
  getMenuActive,
  getTheme,
} from "../../redux/AppReducer/app-selectors";
import { getAllFriends } from "../../redux/FriendsReducer/friends-selectors";
import s from "./Profile.module.css";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let login = this.props.match.params.login;

    // this.props.getUsersListFollowing(this.props.profileInfo.login);

    if (!login || login == this.props.profileInfo.login) {
      login = this.props.profileInfo.login;
      this.props.getProfileData(login);
      this.props.requestPosts(1);
    } else {
      this.props.setPageSelection("userPosts");
      this.props.getUsersProfileData(login);
      this.props.requestUserPosts(login, 1);
    }
  }
  unSubscribe = (login) => {
    this.props.unsubscribe(login);
  };
  Subscribe = (login) => {
    this.props.subscribe(login);
  };
  componentDidMount() {
    this.props.clearPosts();
    this.refreshProfile();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.uploadPosts && !this.props.loadingPosts) {
      if (this.props.match.params.login) {
        this.props.requestUserPosts(
          this.props.match.params.login,
          this.props.postsPage
        );
      } else {
        this.props.requestPosts(this.props.postsPage);
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
            status={this.props.status}
            profileInfo={this.props.profileInfo}
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            isFollowed={this.props.isFollowed}
            isSavingPhoto={this.props.isSavingPhoto}
            friends={this.props.friends}
            isPostCreation={this.props.isPostCreation}
            toggleIsPostCreation={this.props.toggleIsPostCreation}
            lastPost={this.props.lastPost}
            theme={this.props.theme}
            posts={this.props.posts}
            addLike={this.props.addLike}
            strUrlPrev={this.props.strUrl}
            changeIndex={this.props.changeIndex}
            editMode={this.props.editMode}
            setEditMode={this.props.setEditMode}
            setProfileBanner={this.props.setProfileBanner}
            isMenuActive={this.props.isMenuActive}
            usersListFollowing={this.props.usersListFollowing}
            subscribers={this.props.subscribers}
            subscriptions={this.props.subscriptions}
            totalSubscriptionsItems={this.props.totalSubscriptionsItems}
            totalSubscribersItems={this.props.totalSubscribersItems}
            unSubscribe={this.unSubscribe}
            Subscribe={this.Subscribe}
            totalPostsItems={this.props.totalPostsItems}
            setUploadPost={this.props.setUploadPost}
            avatarIsLoading={this.props.avatarIsLoading}
            bannerIsLoading={this.props.bannerIsLoading}
            blockUser={this.props.blockUser}
            banUser={this.props.banUser}
            unblockUser={this.props.unblockUser}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: getProfile(state),
  isAuth: getIsAuth(state),
  isFatching: getIsFatching(state),
  status: getStatus(state),
  profileInfo: getProfileInfo(state),
  userId: getUserId(state),
  isFollowed: getIsFollowed(state),
  isSavingPhoto: getIsSavingPhoto(state),
  isPostCreation: getIsPostCreation(state),
  lastPost: getLastPost(state),
  theme: getTheme(state),
  posts: getPosts(state),
  editMode: getEditMode(state),
  isMenuActive: getMenuActive(state),
  subscribers: getSubscribers(state),
  subscriptions: getSubscriptions(state),
  totalSubscriptionsItems: getTotalSubscriptionsItems(state),
  totalSubscribersItems: getTotalSubscribersItems(state),
  uploadPosts: getUploadPosts(state),
  loadingPosts: getLoadingPosts(state),
  totalPostsItems: getTotalPostsItems(state),
  postsPage: getPagePosts(state),
  avatarIsLoading: getAvatarIsLoading(state),
  bannerIsLoading: getBannerIsLoading(state),
  banUser: getBanUser(state),
  // usersListFollowing: getUsersListFollowing(state),
});

export default compose(
  connect(mapStateToProps, {
    updateStatus,
    deletePost,
    follow,
    unfollow,
    toggleIsFatching,
    setUserProfile,
    getIsSavingPhoto,
    getTheLastPost,
    setEditMode,
    setProfileBanner,
    getUsersProfileData,
    updateStatus,
    getProfileData,
    subscribe,
    unsubscribe,
    requestPosts,
    setUploadPost,
    clearPosts,
    requestUserPosts,
    savePhoto,
    setPageSelection,
    blockUser,
    unblockUser,
    // getUsersListFollowing,
  }),
  withRouter,
  withAuthRedirecr
)(ProfileContainer);
