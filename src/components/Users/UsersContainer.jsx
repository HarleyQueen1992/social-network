import React from "react"
import { connect } from "react-redux"
import {
  requestUsers,
  follow,
  unfollow,
  toggleIsFatching,
  toggleFollowingProgress,
} from "../../redux/UsersReducer/user-reducer"
import {
  requestForUsers,
  setValue,
  setUsers,
  toggleIsFatchingSearch,
  setCurrentPage,
  clearUsers,
} from "./../../redux/SearchReducer/search-reducer"
import {
  getCurrentPageSearch,
  getTotalUsersCountSearch,
  getValue,
  getUsersSearch,
  getIsFatchingSearch,
} from "./../../redux/SearchReducer/search-selectors"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import { withAuthRedirecr } from "../../Hoc/withAuthRedirect"
import { compose } from "redux"
import {
  getUsers,
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getIsFatching,
  getFollowingInProgress,
} from "../../redux/UsersReducer/users-selectors"
class UsersC extends React.Component {
  componentDidMount() {
    if (this.props.isFatching) {
      this.props.requestUsers(this.props.currentPage)
    }
  }
  handleChange = event => {
    if (event.target.value === "" && this.props.value.length == 1) {
      this.props.clearUsers()
      this.props.setCurrentPage(1)
      this.props.setValue(event.target.value)
    } else {
      this.props.clearUsers()
      this.props.setCurrentPage(1)
      this.props.setValue(event.target.value)
      this.props.requestForUsers(event.target.value, 1)
    }
  }

  componentDidUpdate() {
    if (this.props.isFatchingSearch && this.props.value !== "") {
      this.props.requestForUsers(this.props.value, this.props.currentPageSearch)
    }
    if (this.props.isFatching && this.props.value === "") {
      this.props.requestUsers(this.props.currentPage)
    }
  }
  componentWillUnmount() {
    this.props.clearUsers()
    this.props.setCurrentPage(1)
    this.props.setValue("")
  }
  render() {
    return (
      <>
        <Users
          totalUsersCount={this.props.totalUsersCount}
          currentPage={this.props.currentPage}
          pageSize={this.props.pageSize}
          users={this.props.users}
          follow={this.props.follow}
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
          usersSearch={this.props.usersSearch}
          totalUsersCountSearch={this.props.totalUsersCountSearch}
          toggleIsFatchingSearch={this.props.toggleIsFatchingSearch}
        />
      </>
    )
  }
}

let mapStateToProps = state => {
  return {
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    currentPageSearch: getCurrentPageSearch(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    totalUsersCountSearch: getTotalUsersCountSearch(state),
    isFatching: getIsFatching(state),
    followingInProgress: getFollowingInProgress(state),
    value: getValue(state),
    usersSearch: getUsersSearch(state),
    isFatchingSearch: getIsFatchingSearch(state),
  }
}

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
    setUsers,
    toggleFollowingProgress,
    requestUsers,
    toggleIsFatching,
    setValue,
    requestForUsers,
    toggleIsFatchingSearch,
    setCurrentPage,
    clearUsers,
  }),
  withAuthRedirecr
)(UsersC)
