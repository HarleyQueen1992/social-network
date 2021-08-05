import { friendsAPI } from "../../API/api"
// import { toggleIsFetching } from "../AppReducer/app-reducer"
const SET_FRIENDS = "app/friends-reducer/SET_FRIENDS"
const SET_CURRENT_PAGE_FRIEND = "app/friends-reducer/SET_CURRENT_PAGE_FRIEND"
const SET_TOTAL_FRIENDS_COUNT = "app/friends-reducer/SET_TOTAL_FRIENDS_COUNT"
const TOGGLE_IS_FATCHING = "app/friends-reducer/TOGGLE_IS_FATCHING"
const TOGGLE_IS_FETCHING = "app/friends-reducer/TOGGLE_IS_FETCHING"
const NEXT_PAGE = "app/friends-reducer/NEXT_PAGE"
const CLEAR_FRIENDS = "app/friends-reducer/CLEAR_FRIENDS"
const EARLY_PAGE = "app/friends-reducer/EARLY_PAGE"
const SET_ALL_FRIENDS = "app/friends-reducer/SET_ALL_FRIENDS"
const DELETE_FRIEND = "app/friends-reducer/DELETE_FRIEND"

let initialState = {
  friends: [],
  allFriends: [],
  pageSize: 20,
  totalFriendsCount: 20,
  currentPage: 1,
  isFatching: true,
  isFetching: false,
}
const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIENDS: {
      return {
        ...state,
        friends: [...state.friends, ...action.friends],
      }
    }

    case SET_CURRENT_PAGE_FRIEND: {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case SET_TOTAL_FRIENDS_COUNT: {
      return {
        ...state,
        totalFriendsCount: action.totalFriendsCount,
      }
    }
    case CLEAR_FRIENDS: {
      return {
        ...state,
        friends: [],
      }
    }
    case DELETE_FRIEND: {
      return {
        ...state,
        friends: state.friends.filter(f => f.id != action.id),
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
    case SET_ALL_FRIENDS: {
      return {
        ...state,
        allFriends: [...action.friends],
      }
    }
    default:
      return state
  }
}

// Action Creator

export const setFriends = friends => ({ type: SET_FRIENDS, friends })

export const clearFriends = () => ({ type: CLEAR_FRIENDS })

export const deleteFriend = id => ({
  type: DELETE_FRIEND,
  id,
})

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE_FRIEND,
  currentPage,
})

export const setFriendsTotalCount = totalFriendsCount => ({
  type: SET_TOTAL_FRIENDS_COUNT,
  totalFriendsCount,
})

export const toggleIsFatching = isFatching => ({
  type: TOGGLE_IS_FATCHING,
  isFatching,
})

export const toggleIsFetching = isFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})
export const setAllFriends = friends => ({ type: SET_ALL_FRIENDS, friends })

export const nextPage = () => ({ type: NEXT_PAGE })

export const earlyPage = () => ({ type: EARLY_PAGE })

// Thunk Creator
export const requestFriends = currentPage => async dispatch => {
    if (currentPage === 1) {
      dispatch(toggleIsFetching(true))
    }

    // dispatch(toggleIsFatching(true))
    let data = await friendsAPI.getFriends(currentPage, initialState.pageSize)
      dispatch(toggleIsFatching(false))
      dispatch(setFriends(data.items))
      dispatch(setCurrentPage(currentPage + 1))
      dispatch(setFriendsTotalCount(data.totalItems))
      dispatch(toggleIsFetching(false))
    
  
}
export const requestAllFriends = () => {
  return dispatch => {
    // dispatch(toggleIsFatching(true))
    friendsAPI.getAllFriends().then(data => {
      dispatch(setAllFriends(data.data.items))
    })
  }
}
// export const requestFriends = (currentPage, pageSize, append = '') => async(dispatch) => {
//     dispatch(toggleIsFatching(true));
//     if (append === 'early') {
//         dispatch(earlyPage())
//     } else if (append === 'next') {
//         dispatch(nextPage())
//     }
//     dispatch(setCurrentPage(currentPage))
//     let data = await friendsAPI.getFriends(currentPage, pageSize)

//     dispatch(toggleIsFatching(false))
//     dispatch(setFriends(data.data.items));
//     dispatch(setFriendsTotalCount(data.data.totalCount));
//     dispatch(setCurrentPage(currentPage))

// }

export default friendsReducer