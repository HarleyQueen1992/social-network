import React from "react"
import {
  addPostActionCreator,
  addLike,
  deletePost,
} from "../../../redux/PostsReducer/posts-reducer"
import { getPosts } from "../../../redux/PostsReducer/posts-selectors"
import {
  getNewPostText,
  getIsFatching,
} from "../../../redux/ProfileReducer/profile-selectors"
import {
  toggleIsPostCreation,
  toggleIsHeaderBlur,
} from "../../../redux/AppReducer/app-reducer"
import MyPosts from "./MyPosts"
import { connect } from "react-redux"
import {
  getLogin,
  getProfileInfo,
} from "../../../redux/AuthReducer/auth-selectors"
import { compose } from "redux"
import Preloader from "../../common/Preloader/Preloader"
import {
  getHeaderBlur,
  getIsPostCreation,
  getTheme,
} from "../../../redux/AppReducer/app-selectors"

class MyPostsContainer extends React.Component {
  render() {
    return (
      <>
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
          />
        )}
      </>
    )
  }
}
let mapStateToProps = state => {
  return {
    posts: getPosts(state),
    newPostText: getNewPostText(state),
    login: getLogin(state),
    profile: getProfileInfo(state),
    isFatching: getIsFatching(state),
    headerBlur: getHeaderBlur(state),
    isPostCreation: getIsPostCreation(state),
    theme: getTheme(state),
  }
}
export default compose(
  connect(mapStateToProps, {
    deletePost,
    addLike,
    addPostActionCreator,
    toggleIsPostCreation,
    toggleIsHeaderBlur,
  })
)(MyPostsContainer)
