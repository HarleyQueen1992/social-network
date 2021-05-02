import { usersAPI, followAPI } from "../../API/api"
import { getFriends } from "../DialogsReducer/dialogs-reducer"
import { toggleIsFollow } from "../ProfileReducer/profile-reducer"
const FOLLOW = "app/user-reducer/FOLLOW"
const UNFOLLOW = "app/user-reducer/UNFOLLOW"
const SET_USERS = "app/user-reducer/SET_USERS"
const SET_CURRENT_PAGE_USERS = "app/user-reducer/SET_CURRENT_PAGE_USERS"
const SET_TOTAL_USERS_COUNT = "app/user-reducer/SET_TOTAL_USERS_COUNT"
const NEXT_PAGE = "app/user-reducer/NEXT_PAGE"
const EARLY_PAGE = "app/user-reducer/EARLY_PAGE"
const TOGGLE_IS_FATCHING = "app/user-reducer/TOGGLE_IS_FATCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS =
  "app/user-reducer/TOGGLE_IS_FOLLOWING_PROGRESS"
const SET_SEARCH_USERS = "app/user-reducer/SET_SEARCH_USERS"
const SET_VALUE = "app/user-reducer/SET_VALUE"
const CLEAR_VALUE = "app/user-reducer/CLEAR_VALUE"
const SET_WINDOW_MODE = "app/user-reducer/SET_WINDOW_MODE"

let initialState = {
  users: [],
  usersSearch: null,
  pageSize: 15,
  totalUsersCount: 20,
  currentPage: 1,
  isFatching: true,
  followingInProgress: [],
  value: "",
  windowMode: false,
}
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: true }
          }
          return u
        }),
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: false }
          }
          return u
        }),
      }
    case SET_USERS: {
      return {
        ...state,
        users: [...state.users, ...action.users],
      }
    }

    case SET_CURRENT_PAGE_USERS: {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case SET_VALUE: {
      return {
        ...state,
        value: action.value,
        windowMode: true,
      }
    }
    case SET_WINDOW_MODE: {
      return {
        ...state,
        windowMode: action.isWindow,
      }
    }
    case CLEAR_VALUE: {
      return {
        ...state,
        value: "",
      }
    }
    case SET_SEARCH_USERS: {
      return {
        ...state,
        usersSearch: [...action.searchUsers],
      }
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }
    }
    case NEXT_PAGE: {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      }
    }
    case EARLY_PAGE: {
      return {
        ...state,
        currentPage: state.currentPage - 1,
      }
    }
    case TOGGLE_IS_FATCHING: {
      return {
        ...state,
        isFatching: action.isFatching,
      }
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFatching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId),
      }
    }
    default:
      return state
  }
}
// Action Creater

export const followSuccess = userId => ({ type: FOLLOW, userId })

export const setValue = value => ({ type: SET_VALUE, value })

export const clearValue = () => ({ type: CLEAR_VALUE })

export const setWindowMode = isWindow => ({ type: SET_WINDOW_MODE, isWindow })

export const unfollowSuccess = userId => ({ type: UNFOLLOW, userId })

export const setUserSearching = searchUsers => ({
  type: SET_SEARCH_USERS,
  searchUsers,
})

export const setUsers = users => ({ type: SET_USERS, users })

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE_USERS,
  currentPage,
})

export const setUsersTotalCount = totalUsersCount => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
})

export const nextPage = () => ({ type: NEXT_PAGE })

export const earlyPage = () => ({ type: EARLY_PAGE })

export const toggleIsFatching = isFatching => ({
  type: TOGGLE_IS_FATCHING,
  isFatching,
})

export const toggleFollowingProgress = (isFatching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFatching,
  userId,
})

//!Thunk Creater

export const requestUsers = currentPage => {
  return dispatch => {
    // dispatch(toggleIsFatching(true))
    usersAPI.getUsers(currentPage, initialState.pageSize).then(data => {
      dispatch(toggleIsFatching(false))
      dispatch(setUsers(data.items))
      dispatch(setCurrentPage(currentPage + 1))
      dispatch(setUsersTotalCount(data.totalCount))
    })
  }
}

// export const requestUsers = (currentPage, pageSize, append = '') => {
//     return (dispatch) => {
//         dispatch(toggleIsFatching(true));
//         if (append === 'early') {
//             dispatch(earlyPage())
//         } else if (append === 'next') {
//             dispatch(nextPage())
//         }
//         dispatch(setCurrentPage(currentPage))
//         return usersAPI.getUsers(currentPage, pageSize)
//             .then(data => {
//                 dispatch(toggleIsFatching(false))
//                 dispatch(setUsers(data.items));
//                 dispatch(setUsersTotalCount(data.totalCount));
//                 dispatch(setCurrentPage(currentPage))
//             })
//     }
// }

export const follow = userId => {
  return dispatch => {
    dispatch(toggleFollowingProgress(true, userId))
    followAPI.postFollow(userId).then(response => {
      if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId))
      }
      dispatch(getFriends())
      dispatch(toggleIsFollow(true))
      dispatch(toggleFollowingProgress(false, userId))
    })
  }
}

export const unfollow = userId => {
  return dispatch => {
    dispatch(toggleFollowingProgress(true, userId))
    followAPI.deleteFollow(userId).then(response => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
      }
      dispatch(getFriends())
      dispatch(toggleIsFollow(false))
      dispatch(toggleFollowingProgress(false, userId))
    })
  }
}

export const requestForUsers = term => {
  return dispatch => {
    usersAPI.searchUsers(term).then(response => {
      dispatch(setUserSearching(response.items))
    })
  }
}
export default usersReducer
