import { profileAPI } from "../../API/api"
import { stopSubmit } from "redux-form"
import { savePhotoSuccess } from "./../ProfileReducer/profile-reducer"
// import { toggleIsFetching } from "./../AppReducer/app-reducer"
const SET_PROFILE_DATA = "app/settings-reducer/SET_PROFILE_DATA"
const SET_PROFILE_PHOTO = "app/settings-reducer/SET_PROFILE_PHOTO"
const SAVE_PROFILE_SUCCESS = "app/settings-reducer/SAVE_PROFILE_SUCCESS"
const TOGGLE_IS_FETCHING = "app/settings-reducer/TOGGLE_IS_FETCHING"
const CLEAR_PROFILE_INFO = "app/settings-reducer/CLEAR_PROFILE_INFO"
const TOGGLE_IS_FETCHING_SUCCESS =
  "app/settings-reducer/TOGGLE_IS_FETCHING_SUCCESS"

let initialState = {
  profileInfo: null,
  isFetching: true,
  isFetchingSuccess: false,
}

// ? utils

// ! Reducer

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_DATA: {
      return {
        ...state,
        profileInfo: action.profileInfo,
      }
    }
    case SET_PROFILE_PHOTO: {
      return {
        ...state,
        profileInfo: { ...state.profileInfo, photo: action.profilePhoto },
      }
    }
    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        profileInfo: action.profile,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case CLEAR_PROFILE_INFO:
      return {
        ...state,
        profileInfo: null,
      }
    case TOGGLE_IS_FETCHING_SUCCESS:
      return {
        ...state,
        isFetchingSuccess: action.isFetching,
      }
    default:
      return state
  }
}

// Action Creator

export const setProfileData = profileInfo => {
  return {
    type: SET_PROFILE_DATA,
    profileInfo,
  }
}
export const saveProfileSuccess = profile => ({
  type: SAVE_PROFILE_SUCCESS,
  profile,
})

export const toggleIsFetching = isFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})
export const toggleIsFetchingSuccess = isFetching => ({
  type: TOGGLE_IS_FETCHING_SUCCESS,
  isFetching,
})

export const clearProfileInfo = () => ({
  type: CLEAR_PROFILE_INFO,
})

export const setProfilePhoto = profilePhoto => {
  return {
    type: SET_PROFILE_PHOTO,
    profilePhoto,
  }
}
//! Thunk Creator

export const receiveProfileInfo = id => async dispatch => {
  dispatch(toggleIsFetching(true))
  let respo = await profileAPI.getProfile(id)

  dispatch(setProfileData(respo.data))
  dispatch(toggleIsFetching(false))
}

export const saveProfileInfo = profileData => async dispatch => {
  dispatch(toggleIsFetchingSuccess(true))
  let response = await profileAPI.saveProfileInfo(profileData)
  if (response.data.resultCode === 0) {
    dispatch(saveProfileSuccess(profileData))
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }))
    return Promise.reject(response.data.messages[0])
  }
  dispatch(toggleIsFetchingSuccess(false))
}
export const savePhoto = file => async dispatch => {
  dispatch(toggleIsFetchingSuccess(true))
  let response = await profileAPI.updateProfileAvatar(file)
  // if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.avatar))
  // }
  dispatch(toggleIsFetchingSuccess(false))
}

export default settingsReducer
