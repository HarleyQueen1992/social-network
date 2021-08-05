import { friendsAPI, usersAPI } from "./../../API/api"
const SET_USERS = "app/search-reducer/SET_USERS"
const SET_TOTAL_USERS_COUNT = "app/search-reducer/SET_TOTAL_USERS_COUNT"
const SET_VALUE = "app/search-reducer/SET_VALUE"
const SET_CURRENT_PAGE = "app/search-reducer/SET_CURRENT_PAGE"
const TOGGLE_IS_FATCHING = "app/search-reducer/TOGGLE_IS_FATCHING"
const CLEAR_USERS = "app/search-reducer/CLEAR_USERS"
const TOGGLE_IS_RECEIPT = "app/search-reducer/TOGGLE_IS_RECEIPT"
const SET_LOADING = "app/search-reducer/SET_LOADING"

let initialState = {
  usersSearch: [],
  pageSize:40,
  totalUsersCount: null,
  currentPage: 1,
  value: "",
  isReceipt: false,
  isFatchingSearch: false,
  loading: false,
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
        usersSearch: [...state.usersSearch, ...action.users],
      }
    case CLEAR_USERS:
      return {
        ...state,
        usersSearch: [],
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
    case TOGGLE_IS_RECEIPT:
      return {
        ...state,
        isReceipt: action.isReceipt,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    default:
      return state
  }
}
// Action Creactor

export const setUsersSearch = users => ({ type: SET_USERS, users })
export const setTotalUsersCount = count => ({
  type: SET_TOTAL_USERS_COUNT,
  count,
})
export const setValue = value => ({ type: SET_VALUE, value })
export const clearUsersSearch = () => ({ type: CLEAR_USERS })
export const setCurrentPageSearch = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage,
})
export const toggleIsFatchingSearch = isFatching => ({
  type: TOGGLE_IS_FATCHING,
  isFatching,
})
export const setLoading = loading => ({
  type: SET_LOADING,
  loading,
})

export const setIsFatching = isReceipt => ({
  type: TOGGLE_IS_RECEIPT,
  isReceipt,
})

// ? Thunk Creator

export const requestForUsers = (term, currentPage) => async dispatch => {
  dispatch(setLoading(false))
  if (currentPage === 1) {
    dispatch(setIsFatching(true))
  }
  let response = await usersAPI.searchUsers(term, currentPage)
  if (response !== undefined) {
    dispatch(toggleIsFatchingSearch(false))
    dispatch(setUsersSearch(response.items))
    dispatch(setTotalUsersCount(response.totalItems))
    if (initialState.usersSearch.length < response.totalItems) {
      dispatch(setCurrentPageSearch(currentPage + 1))
    }
    dispatch(setIsFatching(false))
  }

  dispatch(setLoading(false))
}

export const requestForFollowings = (term, currentPage) => async dispatch => {
  if (currentPage === 1) {
    dispatch(setIsFatching(true))
  }
  let response = await friendsAPI.searchFriends(term, currentPage, initialState.pageSize)
  if (response !== undefined) { 
  dispatch(toggleIsFatchingSearch(false))
    dispatch(setUsersSearch(response.items))
    dispatch(setTotalUsersCount(response.totalItems))
    if (initialState.usersSearch.length < response.totalItems) {
      dispatch(setCurrentPageSearch(currentPage + 1))
    }
    dispatch(setIsFatching(false))
  }}
  export const requestForUserFollowings = (login, term, currentPage) => async dispatch => {
    if (currentPage === 1) {
      dispatch(setIsFatching(true))
    }
    let response = await friendsAPI.searchUserFollowings(login,currentPage, initialState.pageSize, term,  )
    if (response !== undefined) { 
    dispatch(toggleIsFatchingSearch(false))
      dispatch(setUsersSearch(response.items))
      dispatch(setTotalUsersCount(response.totalItems))
      if (initialState.usersSearch.length < response.totalItems) {
        dispatch(setCurrentPageSearch(currentPage + 1))
      }
      dispatch(setIsFatching(false))
    }}
// export const getAllFriends = () => async(dispatch) => {
//     let data = await friendsAPI.getAllFriends()

//     dispatch(setFriends(data.data.items));
// }

export default searchReducer
