import { stopSubmit } from "redux-form"
import { profileAPI, authAPI } from "../../API/api"
import Preloader from "../../components/common/Preloader/Preloader"
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
        profileInfo: { ...state.profileInfo, photo: action.profilePhoto },
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

export const setProfilePhoto = profilePhoto => {
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

  if (data.resultCode === 0) {
    let { id, login, email } = data.data
    dispatch(setAuthUserData(id, login, email, true))
    let respo = await profileAPI.getProfile(id)

    dispatch(setProfileData(respo.data, true))
    // dispatch(isSavePhoto(false))
  }
}

export const loginIn = (email, password, rememberMe) => async dispatch => {
  let data = await authAPI.loginIn(email, password, rememberMe)
  if (data.data.resultCode === 0) {
    dispatch(getAuthMe())
    // let respo = await profileAPI.getProfile(data.data.data.userId)

    // dispatch(setProfileData(respo.data, true))
    // dispatch(getFriends())
    // let history = useHistory()
    // return useHistory().push("/profile")
  } else {
    let message =
      data.data.messages.length > 0 ? data.data.messages[0] : "Some error"
    dispatch(stopSubmit("login", { _error: message }))
  }
}

export const logOut = () => async dispatch => {
  let data = await authAPI.logOut()
  if (data.data.resultCode === 0) {
    let { userId, login, email } = { userId: null, login: null, email: null }
    dispatch(setAuthUserData(userId, login, email, false))
    dispatch(setProfileData(null, false))
  }
}

export default authReducer
