export const getNewPostText = state => {
  return state.posts.newPostText
}
export const getPosts = state => {
  return state.posts.posts
}
export const getLastPost = state => {
  return state.posts.lastPost
}
export const getUploadPosts = state => {
  return state.posts.uploadPosts
}
export const getLoadingPosts = state => {
  return state.posts.loadingPosts
}
export const getTotalPostsItems = state => {
  return state.posts.totalItems
}
export const getPagePosts = state => {
  return state.posts.page
}
export const getPageSelection = state => {
    return state.posts.pageSelection
  }
  export const getQ = state => {
    return state.posts.q
  }
  export const getDropdownMenus = state => {
    return state.posts.dropdownMenus
  }