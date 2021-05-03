import { stopSubmit } from "redux-form"
import { profileAPI, followAPI } from "../../API/api"
import { Redirect } from "react-router-dom"
import { getAuthMe, setProfilePhoto } from "../AuthReducer/auth-reducer"
const ADD_POST = "ADD-POST"
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = "app/profile-reducer/SET_USER_PROFILE"
const SET_STATUS = "app/profile-reducer/SET_STATUS"
const ADD_LIKES = "app/profile-reducer/ADD_LIKES"
const DELETE_POST = "app/profile-reducer/DELETE_POST"
const SAVE_PHOTO_SUCCESS = "app/profile-reducer/SAVE_PHOTO_SUCCESS"
const TOGGLE_IS_FATCHING = "app/profile-reducer/TOGGLE_IS_FATCHING"
const TOGGLE_IS_FOLLOW = "app/profile-reducer/TOGGLE_IS_FOLLOW"
const SAVE_PROFILE_SUCCESS = "app/profile-reducer/SAVE_PROFILE_SUCCESS"
const SAVING_IN_PHOTO_PROGRESS = "app/profile-reducer/SAVING_IN_PHOTO_PROGRESS"
const GET_LAST_POST = "app/profile-reducer/GET_LAST_POST"

let initialState = {
  posts: [
    {
      id: 0,
      message:
        "React изначально был спроектирован так, чтобы его можно было внедрять постепенно. Другими словами, вы можете начать с малого и использовать только ту функциональность React, которая необходима вам в данный момент. Информация в этом разделе будет полезна в любой ситуации: при первом знакомстве с React, при создании простой динамической HTML-страницы и даже при проектировании сложного React-приложения.",
      like: 50,
      dislike: 100,
      isDisable: false,
    },
    {
      id: 1,
      message:
        "This property is applied by first translating the element by the value of the property, then applying the element's transform, then translating by the negated property value. This means, this definition",
      like: 52,
      dislike: 99,
      isDisable: false,
    },
  ],
  newPostText: "mops.com",
  isFatching: false,
  isSavingPhoto: false,
  lastPost: null,
  profile: null,
  status: null,
  isFollow: null,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: state.posts.length,
        message: action.newPostText,
        like: 0,
        dislike: 0,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    }
    case ADD_LIKES:
      return {
        ...state,
        posts: state.posts.map(p => {
          if (p.id === action.postId) {
            if (p.isDisable === true) {
              let likes = p.like - 1
              p.isDisable = false
              return { ...p, like: likes }
            } else {
              let likes = p.like + 1
              p.isDisable = true
              return { ...p, like: likes }
            }
          }

          return p
        }),
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }
    case GET_LAST_POST:
      return {
        ...state,
        lastPost: state.posts[state.posts.length - 1],
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.pId),
      }

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photo: action.photo },
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
    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
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
// Action Creator
export const addPostActionCreator = newPostText => {
  return {
    type: ADD_POST,
    newPostText,
  }
}
export const addLike = postId => {
  return {
    type: ADD_LIKES,
    postId,
  }
}

export const toggleIsFatching = isFatching => ({
  type: TOGGLE_IS_FATCHING,
  isFatching,
})

export const getTheLastPost = () => ({
  type: GET_LAST_POST,
})

export const toggleIsFollow = isFollow => ({ type: TOGGLE_IS_FOLLOW, isFollow })

export const saveProfileSuccess = profile => ({
  type: SAVE_PROFILE_SUCCESS,
  profile,
})

export const isSavePhoto = isSaving => ({
  type: SAVING_IN_PHOTO_PROGRESS,
  isSaving,
})

export const deletePost = pId => {
  return {
    type: DELETE_POST,
    pId,
  }
}

export const setUserProfile = profile => {
  return {
    type: SET_USER_PROFILE,
    profile,
  }
}

export const setStatus = status => {
  return {
    type: SET_STATUS,
    status,
  }
}

export const savePhotoSuccess = photo => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photo,
  }
}

// Thunk Creator

export const getUserProfile = userId => async dispatch => {
  dispatch(toggleIsFatching(true))
  let response = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
  let resp = await profileAPI.getStatus(userId)
  dispatch(setStatus(resp.data))
  dispatch(getTheLastPost())
  dispatch(toggleIsFatching(false))
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

export const savePhoto = file => async dispatch => {
  dispatch(isSavePhoto(true))
  let response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photo))
    dispatch(setProfilePhoto(response.data.data.photo))
  }
  dispatch(isSavePhoto(false))
}
export const saveProfileInfo = profileData => async dispatch => {
  let response = await profileAPI.saveProfileInfo(profileData)
  if (response.data.resultCode === 0) {
    dispatch(saveProfileSuccess(profileData))
    ;<Redirect to='/profile' />
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }))
    return Promise.reject(response.data.messages[0])
  }
}

export const getFollow = id => async dispatch => {
  let response = await followAPI.getFollow(id)
  dispatch(toggleIsFollow(response.data))
}
export default profileReducer
