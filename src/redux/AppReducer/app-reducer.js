import { lightTheme, darkTheme } from "./../../themes"
import { getAuthMe } from "./../AuthReducer/auth-reducer"
const INITIALIZED_SUCCESS = "app/app-reducer/INITIALIZED_SUCCESS"
const IS_POST_CREATION = "app/app-reducer/IS_POST_CREATION"
const SET_THEME = "app/app-reducer/SET_THEME"

let initialState = {
  initialized: false,
  isPostCreation: false,
  theme: darkTheme,
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
        theme: action.theme === "light" ? lightTheme : darkTheme,
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

export const setTheme = theme => ({ type: SET_THEME, theme })

// Thunk Creator

export const initializeApp = () => dispatch => {
  let promiseGetAuthMe = dispatch(getAuthMe())
  // let promiseRequestUsers = dispatch(requestUsers())
  // let promiseRequestFriends = dispatch(requestFriends())
  // let promiseGetFriends = dispatch(getFriends())
  // let promiseGetAllFriends = dispatch(getAllFriends())
  // let promiseGetUserProfile = dispatch(getUserProfile())

  Promise.all([promiseGetAuthMe]).then(() => {
    dispatch(initializedSuccess())
  })
}
export default appReducer
