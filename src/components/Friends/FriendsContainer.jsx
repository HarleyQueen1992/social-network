import React from "react"
import { connect } from "react-redux"
import Friends from "./Friends"
import {
  setFriends,
  toggleIsFatching,
  setFriendsTotalCount,
  nextPage,
  earlyPage,
  requestFriends,
} from "../../redux/FriendsReducer/friends-reducer"
import Preloader from "../common/Preloader/Preloader"
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
    if (event.target.value === "" && this.props.value.length == 1) {
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
  // componentDidMount() {
  //     this.props.requestFriends(this.props.currentPage, this.props.pageSize)
  // }

  // onPageChenged = (pageNumber) => {
  //     this.props.requestFriends(pageNumber, this.props.pageSize)
  // }

  // earlyPageNumber = () => {
  //     this.props.requestFriends(this.props.currentPage - 1, this.props.pageSize, 'early')
  // }

  // increasePageNumber = () => {
  //     debugger
  //     this.props.requestFriends(this.props.currentPage + 1, this.props.pageSize, 'next')
  // }

  render() {
    return (
      <>
        <Friends
          friends={this.props.friends}
          isFatching={this.props.isFatching}
          pageSize={this.props.pageSize}
          totalFriendsCount={this.props.totalFriendsCount}
          currentPage={this.props.currentPage}
          setFriendsTotalCount={this.props.setFriendsTotalCount}
          setFriends={this.props.setFriends}
          setCurrentPage={this.props.setCurrentPage}
          toggleIsFatching={this.props.toggleIsFatching}
          onPageChenged={this.onPageChenged}
          earlyPageNumber={this.earlyPageNumber}
          increasePageNumber={this.increasePageNumber}
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
  setFriends,
  setCurrentPage,
  toggleIsFatching,
  nextPage,
  earlyPage,
  requestFriends,
  requestForFriends,
  setValue,
  setCurrentPage,
  clearUsers,
  toggleIsFatchingSearch,
})(FriendsContainer)
