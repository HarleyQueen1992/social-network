import { profileAPI, followAPI } from "../../API/api"
import { stopSubmit } from "redux-form"
import { setIsPassword, toggleIsFetching } from "../AppReducer/app-reducer"
import { getTheLastPost } from "./../PostsReducer/posts-reducer"
const SET_USER_PROFILE = "app/profile-reducer/SET_USER_PROFILE"
const SET_STATUS = "app/profile-reducer/SET_STATUS"
const SAVE_PHOTO_SUCCESS = "app/profile-reducer/SAVE_PHOTO_SUCCESS"
const UPDATE_PROFILE_BANNER = "app/profile-reducer/UPDATE_PROFILE_BANNER"
const TOGGLE_IS_FATCHING = "app/profile-reducer/TOGGLE_IS_FATCHING"
const TOGGLE_IS_FOLLOWED = "app/profile-reducer/TOGGLE_IS_FOLLOWED"
const SET_SUBSCRIBERS = 'app/profile-reducer/SET_SUBSCRIBERS'
const SET_SUBSCRIPTIONS = 'app/profile-reducer/SET_SUBSCRIPTIONS'
const SAVING_IN_PHOTO_PROGRESS = "app/profile-reducer/SAVING_IN_PHOTO_PROGRESS"
const SET_TOTAL_SUBSCRIBERS_ITEMS = "app/profile-reducer/SET_TOTAL_SUBSCRIBERS_ITEMS"
const SET_TOTAL_SUBSCRIPTIONS_ITEMS = "app/profile-reducer/SET_TOTAL_SUBSCRIPTIONS_ITEMS"
const SET_PAGE_SUBSCRIBERS = 'app/profile-reducer/SET_PAGE_SUBSCRIBERS'
const SET_PAGE_SUBSCRIPTIONS = 'app/profile-reducer/SET_PAGE_SUBSCRIPTIONS'
const IS_SUCCESSFUL_PASSWORD_CHANGE = 'app/profile-reducer/IS_SUCCESSFUL_PASSWORD_CHANGE'

let initialState = {
  isFatching: true,
  isSavingPhoto: false,
  profile: null,
  pageSize: 8,
  subscriptions: null,
  totalSubscriptionsItems: null,
  subscribers: null,
  totalSubscribersItems: null,
  isFollowed: null,
  isSuccessfulPasswordChange: false,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }
    case SET_TOTAL_SUBSCRIBERS_ITEMS:
      return {
        ...state,
        totalSubscribersItems: action.totalItems,
      }
    case SET_TOTAL_SUBSCRIPTIONS_ITEMS:
      return {
        ...state,
        totalSubscriptionsItems: action.totalItems,
      }
    case SET_PAGE_SUBSCRIBERS:
      return {
        ...state,
        pageSubscribers: action.pageNumber,
      }
      case SET_PAGE_SUBSCRIPTIONS:
      return {
        ...state,
        pageSubscriptions: action.pageNumber,
      }
    case IS_SUCCESSFUL_PASSWORD_CHANGE:
      return {
        ...state,
        isSuccessfulPasswordChange: action.isComplite
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, avatar: action.photo },
      }
    case UPDATE_PROFILE_BANNER:
      return {
        ...state,
        profile: { ...state.profile, banner: action.banner },
      }
    case TOGGLE_IS_FATCHING:
      return {
        ...state,
        isFatching: action.isFatching,
      }
    case TOGGLE_IS_FOLLOWED:
      return {
        ...state,
        isFollowed: action.isFollowed,
      }
    case SET_SUBSCRIBERS:
      return {
        ...state,
        subscribers: action.subscribers

      }
      case SET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.subscriptions

      }
    case SAVING_IN_PHOTO_PROGRESS:
      return {
        ...state,
        isSavingPhoto: action.isSaving,
      }
    default:
      return state
  }
}

export const toggleIsFatching = isFatching => ({
  type: TOGGLE_IS_FATCHING,
  isFatching,
})

export const toggleIsFollowed = isFollowed => ({ type: TOGGLE_IS_FOLLOWED, isFollowed })




export const setTotalSubscribersItems = totalItems => ({ type: SET_TOTAL_SUBSCRIBERS_ITEMS, totalItems })

export const setTotalSubscriptionsItems = totalItems => ({ type: SET_TOTAL_SUBSCRIPTIONS_ITEMS, totalItems })

export const setPageSubscribers = pageNumber => ({ type: SET_PAGE_SUBSCRIBERS, pageNumber })

export const setPageSubscriptions = pageNumber => ({ type: SET_PAGE_SUBSCRIPTIONS, pageNumber })

export const setIsSuccessfulPasswordChange = isComplite => ({type: IS_SUCCESSFUL_PASSWORD_CHANGE, isComplite})


export const isSavePhoto = isSaving => ({
  type: SAVING_IN_PHOTO_PROGRESS,
  isSaving,
})
export const setSubscribers = subscribers => ({
  type: SET_SUBSCRIBERS,
  subscribers,
})

export const setSubscriptions = subscriptions => ({
  type: SET_SUBSCRIPTIONS,
  subscriptions,
})

// export const isSavePhoto = isSaving => ({
//   type: SAVING_IN_PHOTO_PROGRESS,
//   isSaving,
// })

export const setUserProfile = profile => {
  return {
    type: SET_USER_PROFILE,
    profile,
  }
}
export const savePhotoSuccess = photo => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photo,
  }
}
export const updateProfileBanner = banner => {
  return {
    type: UPDATE_PROFILE_BANNER,
    banner,
  }
}


// Thunk Creator

export const getProfileData = login => async dispatch => {
  dispatch(toggleIsFatching(true))
  // dispatch(toggleIsFetching(true))
  let response = await profileAPI.getProfile(login)
  dispatch(setUserProfile(response))

  let responseFollowers = await profileAPI.followers(initialState.pageSize)
  dispatch(setTotalSubscribersItems(responseFollowers.totalItems))
  dispatch(setSubscribers(responseFollowers.items))

  let responseFollowing = await profileAPI.following(initialState.pageSize)
  dispatch(setTotalSubscriptionsItems(responseFollowing.totalItems))
  dispatch(setSubscriptions(responseFollowing.items))
  dispatch(toggleIsFatching(false))
  
  // dispatch(toggleIsFetching(false))
}
export const getUsersProfileData = login => async dispatch => {
  dispatch(toggleIsFatching(true))
  let response = await profileAPI.getUsersProfile(login)
  dispatch(setUserProfile(response))

  let responseFollowers = await profileAPI.usersFollowers(login, initialState.pageSize)
  dispatch(setTotalSubscribersItems(responseFollowers.totalItems))
  dispatch(setSubscribers(responseFollowers.items))

  let responseFollowing = await profileAPI.usersFollowing(login, initialState.pageSize)
  dispatch(setTotalSubscriptionsItems(responseFollowing.totalItems))
  dispatch(setSubscriptions(responseFollowing.items))
  
  let responseIsFollowed = await followAPI.followed(login)
  dispatch(toggleIsFollowed(responseIsFollowed.isFollowed))
  dispatch(toggleIsFatching(false))

}

export const setProfileBanner = file => async dispatch => {
  let response = await profileAPI.updateProfileBanner(file)
  dispatch(updateProfileBanner(response.banner))

}
export const savePhoto = file => async dispatch => {
  let response = await profileAPI.updateProfileAvatar(file)
  dispatch(setUserProfile(response))
}

export const updateProfileInfo = (birthday, location) => async dispatch => {
  let response = await profileAPI.updateProfileInfo(birthday, location)
  dispatch(setUserProfile(response))

}

export const updateAboutMe = aboutMe => async dispatch => {
  let response = await profileAPI.updateAboutMe(aboutMe)
  dispatch(setUserProfile(response))
}


export const updateFullName = fullname => async dispatch => {
  let response = await profileAPI.updateFullName(fullname)
  dispatch(setUserProfile(response))
}

export const updateStatus = status => async dispatch => {
  let response = await profileAPI.updateStatus(status)
  dispatch(setUserProfile(response))
}
export const subscribe = login => async dispatch => {
  
  let response = await followAPI.subscribe(login)
  dispatch(toggleIsFollowed(true))
  
  
}
export const unsubscribe = login => async dispatch => {
 
  let response = await followAPI.unsubscribe(login)
  dispatch(toggleIsFollowed(false))
  
}
export const changePassword = (oldPassword, newPassword1, newPassword2) => async dispatch => {
  let response = await profileAPI.changePassword(oldPassword, newPassword1, newPassword2)
  if (response.code == "invalid") {
    let message =
    response.messages.length > 0 ? response.messages[0] : "Some error"

    dispatch(stopSubmit("password", { _error: message }))
  } else {
    dispatch(setIsPassword(false))
  }
}
// export const getFollow = id => async dispatch => {
//   let response = await followAPI.getFollow(id)
//   dispatch(toggleIsFollow(response.data))
// }
// export const requestSubscribers = () => async dispatch => {
//   let response = await profileAPI.followers(initialState.pageSize)
//   dispatch(setTotalSubscribersItems(response.totalItems))
//   dispatch(setSubscribers(response.items))
// }
// export const requestSubscriptions = () => async dispatch => {
//   let response = await profileAPI.following(initialState.pageSize)
//   dispatch(setTotalSubscriptionsItems(response.totalItems))
//   dispatch(setSubscriptions(response.items))
//   dispatch(toggleIsFatching(false))
// }

export default profileReducer
