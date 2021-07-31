import { lightTheme, darkTheme } from "./../../themes"
import { getAuthMe } from "./../AuthReducer/auth-reducer"
const INITIALIZED_SUCCESS = "app/app-reducer/INITIALIZED_SUCCESS"
const IS_POST_CREATION = "app/app-reducer/IS_POST_CREATION"
const SET_THEME = "app/app-reducer/SET_THEME"
const HEADER_BLUR = "app/app-reducer/HEADER_BLUR"
const IS_FETCHING = "app/app-reducer/IS_FETCHING"
const SET_INDEX = "app/app-reducer/SET_INDEX"
const TOGGLE_IS_BIG_SCREEN = "app/app-reducer/TOGGLE_IS_BIG_SCREEN"
const SET_EDITMODE = "app/app-reducer/SET_EDITMODE"
const IS_MENU_ACTIVE = 'app/app-reducer/IS_MENU_ACTIVE'

let initialState = {
  initialized: false,
  isPostCreation: false,
  index: null,
  theme: darkTheme,
  headerBlur: false,
  editMode: false,
  isMenuActive: false,
  isBigScreen: window.innerWidth > 600,
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
    case IS_MENU_ACTIVE: {
      return {
        ...state,
        isMenuActive: action.isMenuActive,
      }
    }
    case SET_THEME: {
      return {
        ...state,
        theme: action.theme == "light" ? lightTheme : darkTheme,
      }
    }
    case TOGGLE_IS_BIG_SCREEN: {
      debugger
      return {
        ...state,
        isBigScreen: action.isBigScreen,
      }
    }
    case IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    case SET_INDEX: {
      return {
        ...state,
        index: action.index,
      }
    }
    case HEADER_BLUR: {
      return {
        ...state,
        headerBlur: action.headerBlur,
      }
    }
    case SET_EDITMODE: {
      return {
        ...state,
        editMode: action.editMode,
        
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
export const setEditMode = editMode => {
  return { type: SET_EDITMODE, editMode }
}
export const toggleIsPostCreation = isPostCreation => ({
  type: IS_POST_CREATION,
  isPostCreation,
})

export const setMenuActive = isMenuActive => ({
  type: IS_MENU_ACTIVE,
  isMenuActive,
})
export const toggleIsHeaderBlur = headerBlur => ({
  type: HEADER_BLUR,
  headerBlur,
})

export const setIndex = index => ({
  type: SET_INDEX,
  index,
})
export const toggleIsBigScreen = isBigScreen => ({
  type: TOGGLE_IS_BIG_SCREEN,
  isBigScreen,
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
