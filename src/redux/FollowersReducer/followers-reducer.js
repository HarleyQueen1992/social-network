import { followersAPI } from "../../API/api"
// import { toggleIsFetching } from "../AppReducer/app-reducer"
const SET_FOLLOWERS = "app/friends-reducer/SET_FOLLOWERS"
const SET_CURRENT_PAGE_FOLLOWERS = "app/friends-reducer/SET_CURRENT_PAGE_FOLLOWERS"
const SET_TOTAL_FOLLOWERS_COUNT = "app/friends-reducer/SET_TOTAL_FOLLOWERS_COUNT"
const TOGGLE_IS_FATCHING = "app/friends-reducer/TOGGLE_IS_FATCHING"
const TOGGLE_IS_FETCHING = "app/friends-reducer/TOGGLE_IS_FETCHING"
const NEXT_PAGE = "app/friends-reducer/NEXT_PAGE"
const CLEAR_FOLLOWERS = "app/friends-reducer/CLEAR_FOLLOWERS"
const EARLY_PAGE = "app/friends-reducer/EARLY_PAGE"
const DELETE_FOLLOWER = "app/friends-reducer/DELETE_FOLLOWER"

let initialState = {
  followers: [],
  pageSize: 40,
  totalFollowersCount: 20,
  currentPage: 1,
  isFatching: true,
  isFetching: false,
}
const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWERS: {
      return {
        ...state,
        followers: [...state.followers, ...action.followers],
      }
    }

    case SET_CURRENT_PAGE_FOLLOWERS: {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case SET_TOTAL_FOLLOWERS_COUNT: {
      return {
        ...state,
        totalFollowersCount: action.totalFollowersCount,
      }
    }
    case CLEAR_FOLLOWERS: {
      return {
        ...state,
        followers: [],
      }
    }
    case DELETE_FOLLOWER: {
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
    default:
      return state
  }
}

// Action Creator

export const setFollowers = followers => ({ type: SET_FOLLOWERS, followers })

export const clearFollowers = () => ({ type: CLEAR_FOLLOWERS })

export const deleteFollower = id => ({
  type: DELETE_FOLLOWER,
  id,
})

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE_FOLLOWERS,
  currentPage,
})

export const setFollowersTotalCount = totalFollowersCount => ({
  type: SET_TOTAL_FOLLOWERS_COUNT,
  totalFollowersCount,
})

export const toggleIsFatching = isFatching => ({
  type: TOGGLE_IS_FATCHING,
  isFatching,
})

export const toggleIsFetching = isFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})

export const nextPage = () => ({ type: NEXT_PAGE })

export const earlyPage = () => ({ type: EARLY_PAGE })

// Thunk Creator
export const requestFollowers = currentPage => async dispatch => {
    if (currentPage === 1) {
      dispatch(toggleIsFetching(true))
    }

    // dispatch(toggleIsFatching(true))
    let data = await followersAPI.followers(currentPage, initialState.pageSize)
      dispatch(toggleIsFatching(false))
      dispatch(setFollowers(data.items))
      dispatch(setCurrentPage(currentPage + 1))
      dispatch(setFollowersTotalCount(data.totalItems))
      dispatch(toggleIsFetching(false))
    
  
      
}
export const requestUserFollowers = (login, currentPage) => async dispatch => {
  if (currentPage === 1) {
    dispatch(toggleIsFetching(true))
  }
  // dispatch(toggleIsFatching(true))
  let data = await followersAPI.userFollowers(login, currentPage, initialState.pageSize)

  dispatch(toggleIsFatching(false))
  dispatch(setFollowers(data.items))
  dispatch(setCurrentPage(currentPage + 1))
  dispatch(setFollowersTotalCount(data.totalItems))
  dispatch(toggleIsFetching(false))
  

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