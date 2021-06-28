import { lightTheme, darkTheme } from "./../../themes"
import { getAuthMe } from "./../AuthReducer/auth-reducer"
const INITIALIZED_SUCCESS = "app/app-reducer/INITIALIZED_SUCCESS"
const IS_POST_CREATION = "app/app-reducer/IS_POST_CREATION"
const SET_THEME = "app/app-reducer/SET_THEME"
const HEADER_BLUR = "app/app-reducer/HEADER_BLUR"
const IS_FETCHING = "app/app-reducer/IS_FETCHING"
const IS_CHANGE = "app/app-reducer/IS_CHANGE"

let initialState = {
  initialized: false,
  isPostCreation: false,
  isChange: false,
  theme: darkTheme,
  headerBlur: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true,
      }
    }
    case IS_POST_CREATION: {
      return {
        ...state,
        isPostCreation: action.isPostCreation,
      }
    }
    case SET_THEME: {
      return {
        ...state,
        theme: action.theme == "light" ? lightTheme : darkTheme,
      }
    }
    case IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    case IS_CHANGE: {
      return {
        ...state,
        isChange: action.isChange,
      }
    }
    case HEADER_BLUR: {
      return {
        ...state,
        headerBlur: action.headerBlur,
      }
    }
    default:
      return state
  }
}

// Action Creator
export const initializedSuccess = () => {
  return { type: INITIALIZED_SUCCESS }
}
export const toggleIsPostCreation = isPostCreation => ({
  type: IS_POST_CREATION,
  isPostCreation,
})

export const toggleIsHeaderBlur = headerBlur => ({
  type: HEADER_BLUR,
  headerBlur,
})

export const toggleIsChange = isChange => ({
  type: IS_CHANGE,
  isChange,
})

export const setTheme = theme => ({ type: SET_THEME, theme })

// Thunk Creator

export const initializeApp = () => dispatch => {
  let promiseGetAuthMe = dispatch(getAuthMe())

  Promise.all([promiseGetAuthMe]).then(() => {
    dispatch(initializedSuccess())
  })
}
export default appReducer
