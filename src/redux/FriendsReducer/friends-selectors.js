export const getFriends = state => {
  return state.friendsPage.friends
}
export const getIsFatching = state => {
  return state.friendsPage.isFatching
}
export const getIsFetching = state => {
  return state.friendsPage.isFetching
}
export const getPageSize = state => {
  return state.friendsPage.pageSize
}
export const getTotalFriendsCount = state => {
  return state.friendsPage.totalFriendsCount
}
export const getCurrentPage = state => {
  return state.friendsPage.currentPage
}
export const getAllFriends = state => {
  return state.friendsPage.allFriends
}
