import React from "react";
import { connect } from "react-redux";
import Friends from "./Friends";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  toggleIsFatching,
  setFriendsTotalCount,
  requestFollowings,
  clearFriends,
  setCurrentPage,
  requestUserFollowings,
} from "../../redux/FriendsReducer/friends-reducer";
import {
  requestForFollowings,
  setValue,
  clearUsersSearch,
  setCurrentPageSearch,
  toggleIsFatchingSearch,
  requestForUserFollowings,
} from "./../../redux/SearchReducer/search-reducer";
import {
  getCurrentPage,
  getFriends,
  getIsFatching,
  getIsFetching,
  getPageSize,
  getTotalFriendsCount,
} from "../../redux/FriendsReducer/friends-selectors";
import {
  getCurrentPageSearch,
  getIsFatchingSearch,
  getIsReceipt,
  getTotalUsersCountSearch,
  getUsersSearch,
  getValue,
} from "../../redux/SearchReducer/search-selectors";
import { unfollow } from "./../../redux/UsersReducer/user-reducer";
import Preloader from "../common/Preloader/Preloader";
import { getTheme } from "../../redux/AppReducer/app-selectors";
import { getProfileInfo } from "../../redux/AuthReducer/auth-selectors";

class FriendsContainer extends React.Component {
  refreshFollowings() {
    let login = this.props.match.params.login;
    // this.props.getUsersListFollowing(this.props.profileInfo.login);

    if (!login || login == this.props.profileInfo.login) {
      login = this.props.profileInfo.login;
      this.props.requestFollowings(this.props.currentPage);
    } else {
      this.props.requestUserFollowings(login, this.props.currentPage);
    }
  }
  componentDidMount() {
    this.refreshFollowings();
    // if (this.props.isFatching) {
    // this.props.requestFollowings(this.props.currentPage);
    // this.props.requesUserFollowings(login, this.props.currentPage);

    // }
  }
  resetSearchUsers = () => {
    this.props.clearUsersSearch();
    this.props.setCurrentPageSearch(1);
    this.props.setValue("");
  };

  handleChange = (event) => {
    let login = this.props.match.params.login;
    if (event.target.value === "" && this.props.value.length === 1) {
      this.resetSearchUsers();
    } else {
      this.props.clearUsersSearch();
      this.props.setCurrentPageSearch(1);
      this.props.setValue(event.target.value);
      if (login) {
        this.props.requestForUserFollowings(login, event.target.value, 1);
      } else {
        this.props.requestForFollowings(event.target.value, 1);
      }
    }
  };
  componentDidUpdate() {
    let login = this.props.match.params.login;
    if (
      this.props.isFatchingSearch &&
      this.props.value !== "" &&
      !this.props.isReceipt
    ) {
      if (login) {
        this.props.requestForUserFollowings(
          login,
          this.props.value,
          this.props.currentPageSearch
        );
      } else {
        this.props.requestForFollowings(
          this.props.value,
          this.props.currentPageSearch
        );
      }
    }
    if (
      this.props.isFatching &&
      this.props.value === "" &&
      !this.props.isFetching
    ) {
      if (login) {
        this.props.requestUserFollowings(login, this.props.currentPage);
      } else {
        this.props.requestFollowings(this.props.currentPage);
      }
    }
  }
  componentWillUnmount() {
    this.props.clearFriends();
    this.props.setCurrentPage(1);
    this.props.setValue("");
  }
  render() {
    return (
      <>
        {" "}
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Friends
            friends={this.props.friends}
            isFatching={this.props.isFatching}
            totalFriendsCount={this.props.totalFriendsCount}
            toggleIsFatching={this.props.toggleIsFatching}
            handleChange={this.handleChange}
            value={this.props.value}
            friendsSearch={this.props.friendsSearch}
            isFatchingSearch={this.props.isFatchingSearch}
            totalFriendsCountSearch={this.props.totalFriendsCountSearch}
            toggleIsFatchingSearch={this.props.toggleIsFatchingSearch}
            isReceipt={this.props.isReceipt}
            resetSearchUsers={this.resetSearchUsers}
            strUrlPrev={this.props.strUrl}
            changeIndex={this.props.changeIndex}
            unfollow={this.props.unfollow}
            theme={this.props.theme}
          />
        )}
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profileInfo: getProfileInfo(state),
    friends: getFriends(state),
    isFatching: getIsFatching(state),
    isFetching: getIsFetching(state),
    pageSize: getPageSize(state),
    totalFriendsCount: getTotalFriendsCount(state),
    currentPage: getCurrentPage(state),
    theme: getTheme(state),
    value: getValue(state),
    friendsSearch: getUsersSearch(state),
    currentPageSearch: getCurrentPageSearch(state),
    totalFriendsCountSearch: getTotalUsersCountSearch(state),
    isFatchingSearch: getIsFatchingSearch(state),
    isReceipt: getIsReceipt(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    setFriendsTotalCount,
    requestUserFollowings,
    toggleIsFatching,
    requestFollowings,
    clearFriends,
    requestForFollowings,
    setValue,
    unfollow,
    setCurrentPageSearch,
    setCurrentPage,
    requestForUserFollowings,
    clearUsersSearch,
    toggleIsFatchingSearch,
  }),
  withRouter
)(FriendsContainer);
