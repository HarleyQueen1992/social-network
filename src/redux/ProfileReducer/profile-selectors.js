export const getProfile = (state) => {
    return state.profilePage.profile;
}
export const getStatus = (state) => {
    return state.profilePage.status;
}
export const getNewPostText = (state) => {
    return state.profilePage.newPostText;
}
export const getPosts = (state) => {
    return state.profilePage.posts;
}
export const getIsFatching = (state) => {
    return state.profilePage.isFatching;
}
export const getIsFollow = (state) => {
    return state.profilePage.isFollow;
}