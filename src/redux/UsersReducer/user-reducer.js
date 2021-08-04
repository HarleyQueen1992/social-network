import { usersAPI, followAPI } from "../../API/api"
import { deleteFriend } from "../FriendsReducer/friends-reducer"
// import { toggleIsFetching } from "../AppReducer/app-reducer"
import { toggleIsFollow } from "../ProfileReducer/profile-reducer"
const FOLLOW = "app/user-reducer/FOLLOW"
const UNFOLLOW = "app/user-reducer/UNFOLLOW"
const SET_USERS = "app/user-reducer/SET_USERS"
const CLEAR_USERS = "app/user-reducer/CLEAR_USERS"
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
const TOGGLE_IS_FETCHING = "app/user-reducer/TOGGLE_IS_FETCHING"
const USERS_LISTS_FOLLOWING = "app/user-reducer/USERS_LISTS_FOLLOWING"

let initialState = {
  users: [],
  usersListFollowing: null,
  pageSize: 40,
  totalUsersCount: 20,
  currentPage: 1,
  isFatching: true,
  isFetching: false,
  followingInProgress: [],
  value: "",
}
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.login === action.login) {
            return { ...u, isFollowed: true }
          }
          return u
        }),
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.login === action.login) {
            return { ...u, isFollowed: false }
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
    case USERS_LISTS_FOLLOWING: {
      return {
        ...state,
        usersListFollowing: action.users
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
    case CLEAR_USERS: {
      return {
        ...state,
        users: [],
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
    case TOGGLE_IS_FATCHING: {
      return {
        ...state,
        isFatching: action.isFatching,
      }
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
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

export const followSuccess = login => ({ type: FOLLOW, login })

export const setValue = value => ({ type: SET_VALUE, value })

export const clearUsers = () => ({ type: CLEAR_USERS })

export const clearValue = () => ({ type: CLEAR_VALUE })

export const setWindowMode = isWindow => ({ type: SET_WINDOW_MODE, isWindow })

export const unfollowSuccess = login => ({ type: UNFOLLOW, login })

export const setUsersFollowing = users => ({ type: USERS_LISTS_FOLLOWING, users})

// export const setUserSearching = searchUsers => ({
//   type: SET_SEARCH_USERS,
//   searchUsers,
// })

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

export const toggleIsFetching = isFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})

export const toggleFollowingProgress = (isFatching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFatching,
  userId,
})

//!Thunk Creater

export const requestUsers = currentPage => async dispatch => {
  if (currentPage === 1) {
    dispatch(toggleIsFetching(true))
  }
  let response = await usersAPI.getUsers(currentPage, initialState.pageSize)
  dispatch(toggleIsFatching(false))
  dispatch(setUsers(response.items))
  dispatch(setCurrentPage(currentPage + 1))
  dispatch(setUsersTotalCount(response.totalItems))
  dispatch(toggleIsFetching(false))
}

export const follow = login => async dispatch => {
    dispatch(toggleFollowingProgress(true, login))
    let response = followAPI.subscribe(login)
    dispatch(followSuccess(login))
    
    dispatch(toggleFollowingProgress(false, login))
    
  
}

export const getUsersListFollowing = login => async dispatch => {
  let response = usersAPI.getUsersFollowingAll(login)
  dispatch(setUsersFollowing(response.items))
}




export const unfollow = login => async dispatch => {
    dispatch(toggleFollowingProgress(true, login))
    let response = await followAPI.unsubscribe(login)
    dispatch(unfollowSuccess(login))
    dispatch(deleteFriend(login))
    dispatch(toggleFollowingProgress(false, login))
    
  
}
export default usersReducer
