import React from "react";
import { connect } from "react-redux";
import {
  requestUsers,
  follow,
  unfollow,
  toggleIsFatching,
  toggleFollowingProgress,
  setCurrentPage,
  setUsers,
  clearUsers,
} from "../../redux/UsersReducer/user-reducer";
import {
  requestForUsers,
  setValue,
  setUsersSearch,
  toggleIsFatchingSearch,
  setCurrentPageSearch,
  clearUsersSearch,
} from "./../../redux/SearchReducer/search-reducer";
import {
  getCurrentPageSearch,
  getTotalUsersCountSearch,
  getValue,
  getUsersSearch,
  getIsFatchingSearch,
  getIsReceipt,
} from "./../../redux/SearchReducer/search-selectors";
import Users from "./Users";
import { withAuthRedirecr } from "../../Hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getUsers,
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getIsFatching,
  getFollowingInProgress,
  getIsFetching,
} from "../../redux/UsersReducer/users-selectors";
import Preloader from "../common/Preloader/Preloader";
import { getTheme } from "../../redux/AppReducer/app-selectors";
import { getProfileInfo } from "../../redux/AuthReducer/auth-selectors";
class UsersC extends React.Component {
  componentDidMount() {
    this.props.clearUsers();
    this.props.setCurrentPage(1);
    // if (this.props.isFatching) {
    this.props.requestUsers(this.props.currentPage);
    // }
  }

  resetSearchUsers = () => {
    this.props.clearUsersSearch();
    this.props.setCurrentPageSearch(1);
    this.props.setValue("");
  };
  handleChange = async (event) => {
    if (event.target.value === "" && this.props.value.length === 1) {
      this.resetSearchUsers();
    } else {
      this.props.clearUsersSearch();
      this.props.setCurrentPageSearch(1);
      this.props.setValue(event.target.value);
      this.props.requestForUsers(event.target.value, 1);
    }
  };

  componentDidUpdate() {
    if (
      this.props.isFatchingSearch &&
      this.props.value !== "" &&
      !this.props.isReceipt
    ) {
      this.props.requestForUsers(
        this.props.value,
        this.props.currentPageSearch
      );
    }
    if (
      this.props.isFatching &&
      this.props.value === "" &&
      !this.props.isFetching
    ) {
      this.props.requestUsers(this.props.currentPage);
    }
  }
  componentWillUnmount() {
    // this.props.setUsers([])
    this.props.clearUsers();
    this.props.setCurrentPage(1);
    this.props.setValue("");
  }
  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            profileInfo={this.props.profileInfo}
            totalUsersCount={this.props.totalUsersCount}
            currentPage={this.props.currentPage}
            pageSize={this.props.pageSize}
            users={this.props.users}
            follow={this.props.follow}
            isFetching={this.props.isFetching}
            isFatching={this.props.isFatching}
            unfollow={this.props.unfollow}
            onPageChenged={this.onPageChenged}
            increasePageNumber={this.increasePageNumber}
            earlyPageNumber={this.earlyPageNumber}
            toggleIsFatching={this.props.toggleIsFatching}
            followingInProgress={this.props.followingInProgress}
            toggleFollowingProgress={this.props.toggleFollowingProgress}
            scrollHandler={this.props.scrollHandler}
            handleChange={this.handleChange}
            value={this.props.value}
            setValue={this.props.setValue}
            resetSearchUsers={this.resetSearchUsers}
            usersSearch={this.props.usersSearch}
            totalUsersCountSearch={this.props.totalUsersCountSearch}
            toggleIsFatchingSearch={this.props.toggleIsFatchingSearch}
            isReceipt={this.props.isReceipt}
            strUrlPrev={this.props.strUrl}
            changeIndex={this.props.changeIndex}
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
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    currentPageSearch: getCurrentPageSearch(state),
    pageSize: getPageSize(state),
    theme: getTheme(state),
    totalUsersCount: getTotalUsersCount(state),
    totalUsersCountSearch: getTotalUsersCountSearch(state),
    isFatching: getIsFatching(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    value: getValue(state),
    usersSearch: getUsersSearch(state),
    isFatchingSearch: getIsFatchingSearch(state),
    isReceipt: getIsReceipt(state),
  };
};

// let withRedirect = withAuthRedirecr(UsersC)

// export default connect(mapStateToProps,
//     {
//         follow, unfollow, setUsers,
//         toggleFollowingProgress, getUsers
//     }) (withRedirect);

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setUsersSearch,
    toggleFollowingProgress,
    requestUsers,
    toggleIsFatching,
    setUsers,
    setValue,
    requestForUsers,
    toggleIsFatchingSearch,
    setCurrentPage,
    setCurrentPageSearch,
    clearUsers,
    clearUsersSearch,
  }),
  withAuthRedirecr
)(UsersC);
