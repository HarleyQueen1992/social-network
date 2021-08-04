import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirecr } from "../../Hoc/withAuthRedirect";
import {
  getProfileData,
  toggleIsFatching,
  setUserProfile,
  toggleIsFollow,
  updateStatus,
  getFollow,
  setProfileBanner,
  getUsersProfileData,
} from "../../redux/ProfileReducer/profile-reducer";
import {
  deletePost,
  addPostActionCreator,
  addLike,
  getTheLastPost,
} from "./../../redux/PostsReducer/posts-reducer";
import {
  getIsFatching,
  getIsFollow,
  getProfile,
  getIsSavingPhoto,
  getStatus,
  getSubscribers,
  getSubscriptions,
  getTotalSubscriptionsItems,
  getTotalSubscribersItems,
} from "../../redux/ProfileReducer/profile-selectors";
import { savePhoto } from "./../../redux/SettingsReducer/settings-reducer";
import { requestAllFriends } from "./../../redux/FriendsReducer/friends-reducer";
import Profile from "./Profile";
import {
  getLastPost,
  getPosts,
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
    } else {
      this.props.getUsersProfileData(login);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userid !== prevProps.match.params.userid) {
      this.refreshProfile();
    }
  }
  render() {
    return (
      <>
        {this.props.isFatching ? (
          <Preloader />
        ) : (
          <Profile
            {...this.props}
            isOwner={
              !this.props.match.params.userid ||
              this.props.match.params.userid == this.props.profileInfo.userId
            }
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            isFollow={this.props.isFollow}
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
  isFollow: getIsFollow(state),
  isSavingPhoto: getIsSavingPhoto(state),
  isPostCreation: getIsPostCreation(state),
  lastPost: getLastPost(state),
  theme: getTheme(state),
  friends: getAllFriends(state),
  posts: getPosts(state),
  editMode: getEditMode(state),
  isMenuActive: getMenuActive(state),
  subscribers: getSubscribers(state),
  subscriptions: getSubscriptions(state),
  totalSubscriptionsItems: getTotalSubscriptionsItems(state),
  totalSubscribersItems: getTotalSubscribersItems(state),
  // usersListFollowing: getUsersListFollowing(state),
});

export default compose(
  connect(mapStateToProps, {
    updateStatus,
    deletePost,
    follow,
    unfollow,
    toggleIsFollow,
    toggleIsFatching,
    setUserProfile,
    getIsSavingPhoto,
    addPostActionCreator,
    toggleIsPostCreation,
    getTheLastPost,
    addLike,
    requestAllFriends,
    setEditMode,
    setProfileBanner,
    getUsersProfileData,
    updateStatus,
    getProfileData,
    // getUsersListFollowing,
  }),
  withRouter,
  withAuthRedirecr
)(ProfileContainer);
