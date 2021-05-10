import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { compose } from "redux"
import { withAuthRedirecr } from "../../Hoc/withAuthRedirect"
import {
  getUserProfile,
  addPostActionCreator,
  getTheLastPost,
  toggleIsFatching,
  saveProfileInfo,
  setUserProfile,
  setStatus,
  toggleIsFollow,
  updateStatus,
  deletePost,
  getFollow,
  addLike,
} from "../../redux/ProfileReducer/profile-reducer"
import {
  getIsFatching,
  getIsFollow,
  getProfile,
  getIsSavingPhoto,
  getStatus,
  getLastPost,
} from "../../redux/ProfileReducer/profile-selectors"
import { savePhoto } from "./../../redux/SettingsReducer/settings-reducer"
import { requestAllFriends } from "./../../redux/FriendsReducer/friends-reducer"
import Profile from "./Profile"
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
      // this.props.requestStatus(userid)
    } else {
      this.props.getUserProfile(userid)

      // this.props.requestStatus(userid)
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
  // componentWillUnmount() {
  //   this.props.toggleIsFollow(null)
  //   this.props.setUserProfile(null)
  //   this.props.setStatus(null)
  // }
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
            deletePost={this.props.deletePost}
            savePhoto={this.props.savePhoto}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            isFollow={this.props.isFollow}
            isSavingPhoto={this.props.isSavingPhoto}
            friends={this.props.friends}
            isPostCreation={this.props.isPostCreation}
            addPostActionCreator={this.props.addPostActionCreator}
            toggleIsPostCreation={this.props.toggleIsPostCreation}
            lastPost={this.props.lastPost}
            addLike={this.props.addLike}
            theme={this.props.theme}
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

// let withRedirect = withAuthRedirecr(ProfileContainer)

// let WithUrlDataContainerComponent = withRouter(withRedirect)

// export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);

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
