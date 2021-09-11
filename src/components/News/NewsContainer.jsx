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
  getQ,
} from "../../redux/PostsReducer/posts-selectors";
import {
  clearPosts,
  setUploadPost,
  setPageSelection,
} from "./../../redux/PostsReducer/posts-reducer";
import { getProfileInfo } from "./../../redux/AuthReducer/auth-selectors";
import News from "./News";
import Preloader from "../common/Preloader/Preloader";
import {
  getNews,
  getPageNumber,
  getTotalItems,
} from "../../redux/NewsPeducer/news-selectors";
import { requestNews } from "./../../redux/NewsPeducer/news-reducer";
import { withAuthRedirecr } from "../../Hoc/withAuthRedirect";
class NewsContainer extends React.Component {
  componentDidMount() {
    this.props.clearPosts();
    this.props.setPageSelection("news");
    this.props.requestNews(1);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.uploadPosts && !this.props.loadingPosts) {
      this.props.requestNews(this.props.postsPage, this.props.q);
    }
  }
  componentWillUnmount() {
    this.props.clearPosts();
  }
  render() {
    return this.props.loadingPosts ? (
      <Preloader />
    ) : (
      <News
        posts={this.props.posts}
        theme={this.props.theme}
        profile={this.props.profile}
        strUrlPrev={this.props.strUrl}
        changeIndex={this.props.changeIndex}
        totalPostsItems={this.props.totalPostsItems}
        setUploadPost={this.props.setUploadPost}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: getNews(state),
    theme: getTheme(state),
    profile: getProfileInfo(state),
    uploadPosts: getUploadPosts(state),
    loadingPosts: getLoadingPosts(state),
    totalPostsItems: getTotalItems(state),
    postsPage: getPageNumber(state),
    q: getQ(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    clearPosts,
    requestNews,
    setUploadPost,
    setPageSelection,
  }),
  withAuthRedirecr
)(NewsContainer);
