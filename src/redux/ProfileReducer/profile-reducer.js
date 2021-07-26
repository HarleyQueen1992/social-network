import { profileAPI, followAPI } from "../../API/api"
import { toggleIsFetching } from "../AppReducer/app-reducer"
import { getTheLastPost } from "./../PostsReducer/posts-reducer"
const SET_USER_PROFILE = "app/profile-reducer/SET_USER_PROFILE"
const SET_STATUS = "app/profile-reducer/SET_STATUS"
const SAVE_PHOTO_SUCCESS = "app/profile-reducer/SAVE_PHOTO_SUCCESS"
const UPDATE_PROFILE_BANNER = "app/profile-reducer/UPDATE_PROFILE_BANNER"
const TOGGLE_IS_FATCHING = "app/profile-reducer/TOGGLE_IS_FATCHING"
const TOGGLE_IS_FOLLOW = "app/profile-reducer/TOGGLE_IS_FOLLOW"

const SAVING_IN_PHOTO_PROGRESS = "app/profile-reducer/SAVING_IN_PHOTO_PROGRESS"

let initialState = {
  isFatching: true,
  isSavingPhoto: false,
  profile: null,
  status: null,
  isFollow: null,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
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
    case TOGGLE_IS_FOLLOW:
      return {
        ...state,
        isFollow: action.isFollow,
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

export const toggleIsFollow = isFollow => ({ type: TOGGLE_IS_FOLLOW, isFollow })

export const isSavePhoto = isSaving => ({
  type: SAVING_IN_PHOTO_PROGRESS,
  isSaving,
})

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

export const setStatus = status => {
  return {
    type: SET_STATUS,
    status,
  }
}

// Thunk Creator

export const getUserProfile = userId => async dispatch => {
  dispatch(toggleIsFatching(true))
  // dispatch(toggleIsFetching(true))
  
  let response = await profileAPI.getProfile()
  dispatch(setUserProfile(response))
  dispatch(toggleIsFatching(false))
  // dispatch(toggleIsFetching(false))
}

export const setProfileBanner = file => async dispatch => {
  let response = await profileAPI.updateProfileBanner(file)
  dispatch(updateProfileBanner(response.banner))
}
// export const requestStatus = (userId) => async(dispatch) => {
//     let response = await profileAPI.getStatus(userId)
//     dispatch(setStatus(response.data));

// }

export const updateStatus = status => async dispatch => {
  let response = await profileAPI.updateStatus(status)

  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export const getFollow = id => async dispatch => {
  let response = await followAPI.getFollow(id)
  dispatch(toggleIsFollow(response.data))
}
export default profileReducer
