import { profileAPI } from "../../API/api"
import { light, dark } from "./../../themes"
import { getAuthMe, setProfileData } from "./../AuthReducer/auth-reducer"
const INITIALIZED_SUCCESS = "app/app-reducer/INITIALIZED_SUCCESS"
const IS_POST_CREATION = "app/app-reducer/IS_POST_CREATION"
const SET_THEME = "app/app-reducer/SET_THEME"
const HEADER_BLUR = "app/app-reducer/HEADER_BLUR"
const IS_FETCHING = "app/app-reducer/IS_FETCHING"
const SET_INDEX = "app/app-reducer/SET_INDEX"
const TOGGLE_IS_BIG_SCREEN = "app/app-reducer/TOGGLE_IS_BIG_SCREEN"
const SET_EDITMODE = "app/app-reducer/SET_EDITMODE"
const IS_MENU_ACTIVE = 'app/app-reducer/IS_MENU_ACTIVE'
const IS_PASSWORD = 'app/app-reducer/IS_PASSWORD'
const SET_THEME_STYLE = 'app/app-reducer/SET_THEME_STYLE'
const SET_UPDATE_POST = 'app/app-reducer/SET_UPDATEPOST'
const SET_IS_UPDATE_POST = 'app/app-reducer/SET_IS_UPDATE_POST'
const SET_IS_LOADER = 'app/app-reducer/SET_IS_LOADER'

let initialState = {
  initialized: false,
  isPostCreation: false,
  updatePostData: null,
  isUpdatePost: false,
  index: null,
  isLoader: false,
  theme: localStorage.getItem('theme') == "light" ? light : dark,
  headerBlur: false,
  editMode: false,
  isMenuActive: false,
  isBigScreen: window.innerWidth > 600,
  isPassword: false,
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
    case SET_UPDATE_POST: {
      return {
        ...state,
        updatePostData: action.updatePost
      }
    }
    case SET_IS_LOADER: {
      return {
        ...state,
        isLoader: action.isLoader
      }
    }
    case SET_IS_UPDATE_POST: {
      return {
        ...state,
        isUpdatePost: action.isUpdatePost
      }
    }
    case IS_PASSWORD: {
      return {
        ...state,
        isPassword: action.isPassword
      }
    }
    case SET_THEME: {

      return {
        ...state,
        theme: action.theme == "light" ? light : dark,
      }
      
    }
    case SET_THEME_STYLE: {
      for (let property in state.theme) {
        document.documentElement.style.setProperty(
          "--" + property,
          state.theme[property]
        );
      }
      return {
        ...state
      }
      
    }
    case TOGGLE_IS_BIG_SCREEN: {
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

export const setIsPassword = isPassword => ({
  type: IS_PASSWORD,
  isPassword
})
export const setIsUpdatePost = isUpdatePost => ({
  type: SET_IS_UPDATE_POST,
  isUpdatePost
})

export const setUpdatePost = updatePost => ({
  type: SET_UPDATE_POST,
  updatePost
})
export const setTheme = theme => ({ type: SET_THEME, theme })

export const setThemeStyle = theme => ({ type: SET_THEME_STYLE })
export const setIsLoader = isLoader => ({ type: SET_IS_LOADER,isLoader })

// Thunk Creator

export const initializeApp = () => dispatch => {
  let promiseGetAuthMe = dispatch(getAuthMe())

  Promise.all([promiseGetAuthMe]).then(() => {
    dispatch(initializedSuccess())
    
  })
}
export const updateTheme = theme => async (dispatch,getState) => {
  let state = getState()
  if (!state.app.isLoader) {
    dispatch(setIsLoader(true))
  
    dispatch(setTheme(state.auth.profileInfo.theme == 'light' ? 'dark' : 'light'))
  
    let response = await profileAPI.updateTheme(theme)
    // dispatch(setTheme(response.theme))
    dispatch(setProfileData(response, true))
    dispatch(setIsLoader(false))
  }
  
  // debugger
}
export default appReducer
