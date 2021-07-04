import React from "react"
import { connect } from "react-redux"
import Friends from "./Friends"
import {
  toggleIsFatching,
  setFriendsTotalCount,
  requestFriends,
  clearFriends,
  setCurrentPage,
} from "../../redux/FriendsReducer/friends-reducer"
import {
  requestForFriends,
  setValue,
  clearUsersSearch,
  setCurrentPageSearch,
  toggleIsFatchingSearch,
} from "./../../redux/SearchReducer/search-reducer"
import {
  getCurrentPage,
  getFriends,
  getIsFatching,
  getIsFetching,
  getPageSize,
  getTotalFriendsCount,
} from "../../redux/FriendsReducer/friends-selectors"
import {
  getCurrentPageSearch,
  getIsFatchingSearch,
  getIsReceipt,
  getTotalUsersCountSearch,
  getUsersSearch,
  getValue,
} from "../../redux/SearchReducer/search-selectors"
import { unfollow } from "./../../redux/UsersReducer/user-reducer"
import Preloader from "../common/Preloader/Preloader"
import { getTheme } from "../../redux/AppReducer/app-selectors"

class FriendsContainer extends React.Component {
  componentDidMount() {
    // if (this.props.isFatching) {
    this.props.requestFriends(this.props.currentPage)
    // }
  }
  resetSearchUsers = () => {
    this.props.clearUsersSearch()
    this.props.setCurrentPageSearch(1)
    this.props.setValue("")
  }

  handleChange = event => {
    if (event.target.value === "" && this.props.value.length === 1) {
      this.resetSearchUsers()
    } else {
      this.props.clearUsersSearch()
      this.props.setCurrentPageSearch(1)
      this.props.setValue(event.target.value)
      this.props.requestForFriends(event.target.value, 1)
    }
  }
  componentDidUpdate() {
    if (
      this.props.isFatchingSearch &&
      this.props.value !== "" &&
      !this.props.isReceipt
    ) {
      this.props.requestForFriends(
        this.props.value,
        this.props.currentPageSearch
      )
    }
    if (
      this.props.isFatching &&
      this.props.value === "" &&
      !this.props.isFetching
    ) {
      this.props.requestFriends(this.props.currentPage)
    }
  }
  componentWillUnmount() {
    this.props.clearFriends()
    this.props.setCurrentPage(1)
    this.props.setValue("")
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
    )
  }
}

let mapStateToProps = state => {
  return {
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
  }
}

export default connect(mapStateToProps, {
  setFriendsTotalCount,
  toggleIsFatching,
  requestFriends,
  clearFriends,
  requestForFriends,
  setValue,
  unfollow,
  setCurrentPageSearch,
  setCurrentPage,
  clearUsersSearch,
  toggleIsFatchingSearch,
})(FriendsContainer)
