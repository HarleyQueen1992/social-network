import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { compose } from "redux"
import { withAuthRedirecr } from "../../Hoc/withAuthRedirect"
import {
  getUserProfile,
  toggleIsFatching,
  setUserProfile,
  setStatus,
  toggleIsFollow,
  updateStatus,
  getFollow,
} from "../../redux/ProfileReducer/profile-reducer"
import {
  deletePost,
  addPostActionCreator,
  addLike,
  getTheLastPost,
} from "./../../redux/PostsReducer/posts-reducer"
import {
  getIsFatching,
  getIsFollow,
  getProfile,
  getIsSavingPhoto,
  getStatus,
} from "../../redux/ProfileReducer/profile-selectors"
import { savePhoto } from "./../../redux/SettingsReducer/settings-reducer"
import { requestAllFriends } from "./../../redux/FriendsReducer/friends-reducer"
import Profile from "./Profile"
import { getLastPost } from "./../../redux/PostsReducer/posts-selectors"
import {
  getIsAuth,
  getProfileInfo,
  getUserId,
} from "../../redux/AuthReducer/auth-selectors"
import Preloader from "../common/Preloader/Preloader"
import { toggleIsPostCreation } from "./../../redux/AppReducer/app-reducer"
import { follow, unfollow } from "../../redux/UsersReducer/user-reducer"
import {
  getIsPostCreation,
  getTheme,
} from "../../redux/AppReducer/app-selectors"
import { getAllFriends } from "../../redux/FriendsReducer/friends-selectors"

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userid = this.props.match.params.userid
    this.props.requestAllFriends()

    if (!userid || userid == this.props.userId) {
      userid = this.props.userId
      this.props.getUserProfile(userid)
    } else {
      this.props.getUserProfile(userid)

      this.props.getFollow(userid)
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userid !== prevProps.match.params.userid) {
      this.refreshProfile()
    }
  }
  render() {
    return (
      <>
        {this.props.isFatching || !this.props.userId ? (
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
            addLike={this.props.addLike}
          />
        )}
      </>
    )
  }
}
const mapStateToProps = state => ({
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
})

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    updateStatus,
    deletePost,
    savePhoto,
    follow,
    getFollow,
    unfollow,
    toggleIsFollow,
    toggleIsFatching,
    setUserProfile,
    setStatus,
    getIsSavingPhoto,
    addPostActionCreator,
    toggleIsPostCreation,
    getTheLastPost,
    addLike,
    requestAllFriends,
  }),
  withRouter,
  withAuthRedirecr
)(ProfileContainer)
