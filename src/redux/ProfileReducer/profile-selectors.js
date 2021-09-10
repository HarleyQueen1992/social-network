export const getProfile = state => {
  return state.profilePage.profile
}
export const getStatus = state => {
  return state.profilePage.status
}
export const getNewPostText = state => {
  return state.profilePage.newPostText
}
export const getPosts = state => {
  return state.profilePage.posts
}
export const getIsFatching = state => {
  return state.profilePage.isFatching
}
export const getIsFollowed = state => {
  return state.profilePage.isFollowed
}
export const getIsSavingPhoto = state => {
  return state.profilePage.isSavingPhoto
}
export const getLastPost = state => {
  return state.profilePage.lastPost
}
export const getSubscriptions = state => {
  return state.profilePage.subscriptions
}
export const getSubscribers = state => {
  return state.profilePage.subscribers
}
export const getTotalSubscribersItems = state => {
  return state.profilePage.totalSubscribersItems
}
export const getTotalSubscriptionsItems = state => {
  return state.profilePage.totalSubscriptionsItems
}
export const getBanUser = state => {
  return state.profilePage.userBan
}
export const getIsOpenFilters = state => {
  return state.profilePage.isOpenFilters
}