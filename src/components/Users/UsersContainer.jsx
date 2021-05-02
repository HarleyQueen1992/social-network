import React from "react"
import { connect } from "react-redux"
import {
  requestUsers,
  follow,
  setUsers,
  unfollow,
  toggleIsFatching,
  toggleFollowingProgress,
  setValue,
  requestForUsers,
} from "../../redux/UsersReducer/user-reducer"
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
  getValue,
  getUsersSearch,
} from "../../redux/UsersReducer/users-selectors"
class UsersC extends React.Component {
  componentDidMount() {
    if (this.props.isFatching) {
      this.props.requestUsers(this.props.currentPage)
    }
  }
  handleChange = event => {
    this.props.setValue(event.target.value)
    this.props.requestForUsers(event.target.value)
  }

  componentDidUpdate() {
    if (this.props.isFatching) {
      this.props.requestUsers(this.props.currentPage)
    }
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
        />
      </>
    )
  }
}

let mapStateToProps = state => {
  return {
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    isFatching: getIsFatching(state),
    followingInProgress: getFollowingInProgress(state),
    value: getValue(state),
    usersSearch: getUsersSearch(state),
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
  }),
  withAuthRedirecr
)(UsersC)
