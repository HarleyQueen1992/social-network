import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router";
import {
  getCurrentPage,
  getFollowers,
  getIsFatching,
  getIsFetching,
  getTotalFollowersCount,
} from "../../redux/FollowersReducer/Followers-selectors";
import {
  requestFollowers,
  requestUserFollowers,
  clearFollowers,
  setCurrentPage,
  toggleIsFatching,
} from "../../redux/FollowersReducer/followers-reducer";
import {
  requestForFollowers,
  setValue,
  clearUsersSearch,
  setCurrentPageSearch,
  toggleIsFatchingSearch,
  requestForUserFollowers,
} from "../../redux/SearchReducer/search-reducer";
import {
  getCurrentPageSearch,
  getIsFatchingSearch,
  getIsReceipt,
  getTotalUsersCountSearch,
  getUsersSearch,
  getValue,
} from "../../redux/SearchReducer/search-selectors";
import { getProfileInfo } from "../../redux/AuthReducer/auth-selectors";
import Preloader from "../common/Preloader/Preloader";
import { Icons } from "../../utils/Icons/Icons";
import { NavLink } from "react-router-dom";
import userPhoto from "./../../assets/images/user.png";
import Followers from "./Followers";
import s from "./Followers.module.css";
import { getTheme } from "../../redux/AppReducer/app-selectors";

class FollowersContainer extends React.Component {
  refreshFollowings = () => {
    let login = this.props.match.params.login;
    if (!login) {
      login = this.props.profileInfo.login;
      this.props.requestFollowers(this.props.currentPage);
    } else {
      this.props.requestUserFollowers(login, this.props.currentPage);
    }
  };
  componentDidMount() {
    this.refreshFollowings();
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
        this.props.requestForUserFollowers(login, event.target.value, 1);
      } else {
        this.props.requestForFollowers(event.target.value, 1);
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
        this.props.requestForUserFollowers(
          login,
          this.props.value,
          this.props.currentPageSearch
        );
      } else {
        this.props.requestForFollowers(
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
        this.props.requestUserFollowers(login, this.props.currentPage);
      } else {
        this.props.requestFollowers(this.props.currentPage);
      }
    }
  }

  componentWillUnmount() {
    this.props.clearFollowers();
    this.props.setCurrentPage(1);
    this.props.setValue("");
  }
  render() {
    return this.props.isFetching ? (
      <Preloader />
    ) : (
      <Followers
        theme={this.props.theme}
        followersSearch={this.props.followersSearch}
        toggleIsFatchingSearch={this.props.toggleIsFatchingSearch}
        toggleIsFatching={this.props.toggleIsFatching}
        followers={this.props.followers}
        totalFollowersCount={this.props.totalFollowersCount}
        totalFollowersCountSearch={this.props.totalFollowersCountSearch}
        handleChange={this.handleChange}
        value={this.props.value}
        resetSearchUsers={this.resetSearchUsers}
        isReceipt={this.props.isReceipt}
      />
    );
  }
}
let mapStateToProps = (state) => {
  return {
    profileInfo: getProfileInfo(state),
    followers: getFollowers(state),
    isFatching: getIsFatching(state),
    isFetching: getIsFetching(state),
    totalFollowersCount: getTotalFollowersCount(state),
    currentPage: getCurrentPage(state),
    theme: getTheme(state),
    value: getValue(state),
    followersSearch: getUsersSearch(state),
    currentPageSearch: getCurrentPageSearch(state),
    totalFollowersCountSearch: getTotalUsersCountSearch(state),
    isFatchingSearch: getIsFatchingSearch(state),
    isReceipt: getIsReceipt(state),
  };
};
export default compose(
  connect(mapStateToProps, {
    requestFollowers,
    requestUserFollowers,
    requestForFollowers,
    toggleIsFatching,
    setValue,
    clearFollowers,
    clearUsersSearch,
    setCurrentPage,
    setCurrentPageSearch,
    toggleIsFatchingSearch,
    requestForUserFollowers,
  }),
  withRouter
)(FollowersContainer);
