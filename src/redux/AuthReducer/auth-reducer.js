import { stopSubmit } from "redux-form"
import { profileAPI, authAPI, axiosInstance } from "../../API/api"
import { setIndex, setTheme, setThemeStyle } from "../AppReducer/app-reducer"
const SET_USER_DATA = "app/auth-reducer/SET_USER_DATA"
const SET_PROFILE_DATA = "app/auth-reducer/SET_PROFILE_DATA"
const SET_PROFILE_PHOTO = "app/auth-reducer/SET_PROFILE_PHOTO"
const SET_IS_AUTH = "app/auth-reducer/SET_IS_AUTH"
const SET_ERROR_ACTIVATE = "app/auth-reducer/SET_ERROR_ACTIVATE"

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  profileInfo: null,
  errorActivate: null
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
    case SET_ERROR_ACTIVATE:
      return {
        ...state,
        errorActivate: action.error
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

export const setErrorActivate = (error) => {
  return {
    type: SET_ERROR_ACTIVATE,
    error,
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

export const getAuthMe = () => async (dispatch, getState) => {
  let state = getState()
  for (let property in state.app.theme) {
    document.documentElement.style.setProperty(
      "--" + property,
      state.app.theme[property]
    );
    }
  let data = await authAPI.getAuthMe()
  if (!data.code) {
    dispatch(setProfileData(data, true))
    dispatch(setTheme(data.theme))
    localStorage.setItem("theme", data.theme);
    // dispatch(setThemeStyle())
    // dispatch(isSavePhoto(false))
  } else {
    dispatch(setIsAuth(false))
  }
}

export const loginIn = (email, password, rememberMe) => async dispatch => {
  let data = await authAPI.loginIn(email, password)
  if (!data.code) {
    
    
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + data.access
    let response = await profileAPI.getProfile()

    dispatch(setProfileData(response, true))

    dispatch(setIndex(0))
    window.location = '#/news'
    // localStorage.setItem("theme", data.theme);
    
  } else if (data.code === "inactiveProfile") {
    window.location = '/social-network/#/activation';
  }else {
    let message =
      data.messages.length > 0 ? data.messages[0] : "Some error"
    dispatch(stopSubmit("login", { _error: message }))
  }
}
export const register = (email, login, password1, password2, aboutMe, birthday, location) => async dispatch => {

  let response = await authAPI.register(email, login, password1, password2, aboutMe, birthday, location)

  if (response.code) {
    
    let message =
    response.messages.length > 0 ? response.messages[0] : "Some error"

    dispatch(stopSubmit("register", { _error: message }))
    
  } else {
    localStorage.setItem("email", email);
    setTimeout(() => {
      localStorage.removeItem('email')
    }, 900000);
    window.location = '/social-network/#/activation'; 
  }
}

export const Verification = (code) => async dispatch => {
  let response = await authAPI.verification(code)
  if (response.code) {
    dispatch(setErrorActivate(true))
    dispatch(stopSubmit("activation", { _error: true }))
  } else {
    dispatch(setErrorActivate(false))
    localStorage.removeItem('email')
    dispatch(stopSubmit("activation", { _error: true }))
  }
}
export const logOut = () => async dispatch => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  delete axiosInstance.defaults.headers['Authorization']
    dispatch(setProfileData(null, false))
  
}

export default authReducer
