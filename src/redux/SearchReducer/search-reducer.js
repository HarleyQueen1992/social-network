import { usersAPI } from "./../../API/api"
const SET_USERS = "app/search-reducer/SET_USERS"
const SET_TOTAL_USERS_COUNT = "app/search-reducer/SET_TOTAL_USERS_COUNT"
const SET_VALUE = "app/search-reducer/SET_VALUE"
const SET_CURRENT_PAGE = "app/search-reducer/SET_CURRENT_PAGE"
const TOGGLE_IS_FATCHING = "app/search-reducer/TOGGLE_IS_FATCHING"

let initialState = {
  usersSearch: [],
  pageSize: 15,
  totalUsersCount: null,
  currentPage: 1,
  isFatching: true,
  value: "",
  isFatchingSearch: true,
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VALUE: {
      return {
        ...state,
        value: action.value,
      }
    }
    case SET_USERS:
      return {
        ...state,
        usersSearch: [...action.users],
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case TOGGLE_IS_FATCHING:
      return {
        ...state,
        isFatchingSearch: action.isFatching,
      }
    default:
      return state
  }
}
// Action Creactor

export const setUsers = users => ({ type: SET_USERS, users })
export const setTotalUsersCount = count => ({
  type: SET_TOTAL_USERS_COUNT,
  count,
})
export const setValue = value => ({ type: SET_VALUE, value })
export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage,
})
export const toggleIsFatchingSearch = isFatching => ({
  type: TOGGLE_IS_FATCHING,
  isFatching,
})

// ? Thunk Creator

export const requestForUsers = (term, currentPage) => {
  return dispatch => {
    usersAPI.searchUsers(term, initialState.currentPage).then(response => {
      dispatch(toggleIsFatchingSearch(false))
      dispatch(setUsers(response.items))
      dispatch(setTotalUsersCount(response.totalCount))
      if (initialState.usersSearch.length < initialState.totalUsersCount) {
        dispatch(setCurrentPage(currentPage + 1))
      }
    })
  }
}
// export const getAllFriends = () => async(dispatch) => {
//     let data = await friendsAPI.getAllFriends()

//     dispatch(setFriends(data.data.items));
// }

export default searchReducer
