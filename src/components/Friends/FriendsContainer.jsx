import React from "react"
import { connect } from "react-redux"
import Friends from "./Friends"
import {
  toggleIsFatching,
  setFriendsTotalCount,
  requestFriends,
} from "../../redux/FriendsReducer/friends-reducer"
import {
  requestForFriends,
  setValue,
  clearUsers,
  setCurrentPage,
  toggleIsFatchingSearch,
} from "./../../redux/SearchReducer/search-reducer"
import {
  getCurrentPage,
  getFriends,
  getIsFatching,
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

class FriendsContainer extends React.Component {
  componentDidMount() {
    if (this.props.isFatching) {
      this.props.requestFriends(this.props.currentPage)
    }
  }
  handleChange = event => {
    if (event.target.value === "" && this.props.value.length === 1) {
      this.props.clearUsers()
      this.props.setCurrentPage(1)
      this.props.setValue(event.target.value)
    } else {
      this.props.clearUsers()
      this.props.setCurrentPage(1)
      this.props.setValue(event.target.value)
      this.props.requestForFriends(event.target.value, 1)
    }
  }
  componentDidUpdate() {
    if (this.props.isFatchingSearch && this.props.value !== "") {
      this.props.requestForFriends(
        this.props.value,
        this.props.currentPageSearch
      )
    }
    if (this.props.isFatching && this.props.value === "") {
      this.props.requestFriends(this.props.currentPage)
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
        />
      </>
    )
  }
}

let mapStateToProps = state => {
  return {
    friends: getFriends(state),
    isFatching: getIsFatching(state),
    pageSize: getPageSize(state),
    totalFriendsCount: getTotalFriendsCount(state),
    currentPage: getCurrentPage(state),
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
  requestForFriends,
  setValue,
  setCurrentPage,
  clearUsers,
  toggleIsFatchingSearch,
})(FriendsContainer)
