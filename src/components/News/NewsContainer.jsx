import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getTheme } from "./../../redux/AppReducer/app-selectors"
import { getPosts } from "../../redux/PostsReducer/posts-selectors"
import { deletePost, addLike } from "./../../redux/PostsReducer/posts-reducer"
import News from "./News"
import { getProfile } from "../../redux/ProfileReducer/profile-selectors"

class NewsContainer extends React.Component {
  render() {
    return (
      <>
        <News
          posts={this.props.posts}
          theme={this.props.theme}
          profile={this.props.profile}
          deletePost={this.props.deletePost}
          addLike={this.props.addLike}
          strUrlPrev={this.props.strUrl}
          changeIndex={this.props.changeIndex}
        />
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    posts: getPosts(state),
    theme: getTheme(state),
    profile: getProfile(state),
  }
}

export default compose(connect(mapStateToProps, { deletePost, addLike }))(
  NewsContainer
)
