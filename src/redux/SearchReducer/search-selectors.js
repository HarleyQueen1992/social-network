export const getValue = state => {
  return state.search.value
}
export const getUsersSearch = state => {
  return state.search.usersSearch
}
export const getCurrentPageSearch = state => {
  return state.search.currentPage
}
export const getTotalUsersCountSearch = state => {
  return state.search.totalUsersCount
}

export const getIsFatchingSearch = state => {
  return state.search.isFatchingSearch
}

export const getIsReceipt = state => {
  return state.search.isReceipt
}
