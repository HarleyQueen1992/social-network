import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getTheme } from "./../../redux/AppReducer/app-selectors";
import {
  getPosts,
  getUploadPosts,
  getLoadingPosts,
  getPagePosts,
  getTotalPostsItems,
} from "../../redux/PostsReducer/posts-selectors";
import {
  requestNews,
  clearPosts,
  setUploadPost,
  setPageSelection,
} from "./../../redux/PostsReducer/posts-reducer";
import { getProfileInfo } from "./../../redux/AuthReducer/auth-selectors";
import News from "./News";

class NewsContainer extends React.Component {
  componentDidMount() {
    this.props.setPageSelection("news");
    this.props.requestNews(1);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.uploadPosts && !this.props.loadingPosts) {
      this.props.requestNews(this.props.postsPage);
    }
  }
  componentWillUnmount() {
    this.props.clearPosts();
  }
  render() {
    return (
      <>
        <News
          posts={this.props.posts}
          theme={this.props.theme}
          profile={this.props.profile}
          strUrlPrev={this.props.strUrl}
          changeIndex={this.props.changeIndex}
          totalPostsItems={this.props.totalPostsItems}
          setUploadPost={this.props.setUploadPost}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: getPosts(state),
    theme: getTheme(state),
    profile: getProfileInfo(state),
    uploadPosts: getUploadPosts(state),
    loadingPosts: getLoadingPosts(state),
    totalPostsItems: getTotalPostsItems(state),
    postsPage: getPagePosts(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    clearPosts,
    requestNews,
    setUploadPost,
    setPageSelection,
  })
)(NewsContainer);
