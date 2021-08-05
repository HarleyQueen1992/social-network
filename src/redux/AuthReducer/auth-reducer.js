import { stopSubmit } from "redux-form"
import { profileAPI, authAPI } from "../../API/api"
import { setIndex } from "../AppReducer/app-reducer"
const SET_USER_DATA = "app/auth-reducer/SET_USER_DATA"
const SET_PROFILE_DATA = "app/auth-reducer/SET_PROFILE_DATA"
const SET_PROFILE_PHOTO = "app/auth-reducer/SET_PROFILE_PHOTO"
const SET_IS_AUTH = "app/auth-reducer/SET_IS_AUTH"

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  profileInfo: null,
}

// ? utils

const setData = (state, action) => {
  return {
    ...state,
    ...action.data,
  }
}

// ! Reducer

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return setData(state, action)
    }
    case SET_PROFILE_DATA: {
      return setData(state, action)
    }
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      }
    case SET_PROFILE_PHOTO: {
      return {
        ...state,
        profileInfo: { ...state.profileInfo, avatar: action.profilePhoto },
      }
    }
    default:
      return state
  }
}

// Action Creator

export const setAuthUserData = (userId, login, email, isAuth) => {
  return {
    type: SET_USER_DATA,
    data: { userId, login, email, isAuth },
   }
}

export const setProfileData = (profileInfo, isAuth) => {
  return {
    type: SET_PROFILE_DATA,
    data: { profileInfo, isAuth },
  }
}

export const setProfileInfoPhoto = profilePhoto => {
  return {
    type: SET_PROFILE_PHOTO,
    profilePhoto,
  }
}
export const setIsAuth = isAuth => {
  return { type: SET_IS_AUTH, isAuth }
}
// Thunk Creator

export const getAuthMe = () => async dispatch => {
  let data = await authAPI.getAuthMe()
  if (data.code !== 'notAuthenticated') {
    dispatch(setProfileData(data, true))
    // dispatch(isSavePhoto(false))
  } else {
    dispatch(setIsAuth( false))
  }
}

export const loginIn = (email, password, rememberMe) => async dispatch => {
  let data = await authAPI.loginIn(email, password)
  if (data.code !== "invalid") {
    window.location = '/social-network#/news';
    dispatch(setIndex(0))
    dispatch(setProfileData(data, true))
  } else {
    let message =
      data.messages.length > 0 ? data.messages[0] : "Some error"
    dispatch(stopSubmit("login", { _error: message }))
  }
}
export const register = (email, login, password1, password2, aboutMe, birthday, location) => async dispatch => {

  let response = await authAPI.register(email, login, password1, password2, aboutMe, birthday, location)

  if (response.code == "invalid") {
    let message =
    response.messages.length > 0 ? response.messages[0] : "Some error"

    dispatch(stopSubmit("register", { _error: message }))
  }
}

export const logOut = () => async dispatch => {
  let data = await authAPI.logOut()
    dispatch(setProfileData(null, false))
  
}
export default authReducer
