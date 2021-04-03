import { createSelector } from "reselect";

const getUsersSelector = (state) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)
})
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}
export const getIsFatching = (state) => {
    return state.usersPage.isFatching;
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}
export const getValue = (state) => {
    return state.usersPage.value;
}
export const getUsersSearch = (state) => {
    return state.usersPage.usersSearch;
}
export const getWindowMode = (state) => {
    return state.usersPage.windowMode;
}