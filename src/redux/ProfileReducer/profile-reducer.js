import { profileAPI } from '../../API/api'
import { getAuthMe } from '../AuthReducer/auth-reducer';
const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'app/profile-reducer/SET_USER_PROFILE';
const SET_STATUS = 'app/profile-reducer/SET_STATUS';
const ADD_LIKES = 'app/profile-reducer/ADD_LIKES';
const DELETE_POST = 'app/profile-reducer/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'app/profile-reducer/SAVE_PHOTO_SUCCESS'
const TOGGLE_IS_FATCHING = 'app/profile-reducer/TOGGLE_IS_FATCHING';
const TOGGLE_IS_FOLLOW = 'app/profile-reducer/TOGGLE_IS_FOLLOW';

let initialState = {
    posts: [
        { id: 0, message: 'Hi, my name is Artem', like: 50, dislike: 100, isDisable: false },
        { id: 1, message: 'Hi, my name is Artem', like: 52, dislike: 99, isDisable: false }
    ],
    newPostText: 'mops.com',
    isFatching: false,
    profile: null,
    status: null,
    isFollow: null

}

const profileReducer = (state = initialState, action) => {
        switch (action.type) {
            case ADD_POST:
                {
                    const newPost = {
                        id: state.posts.length,
                        message: action.newPostText,
                        like: 0,
                        dislike: 0,

                    };
                    return {
                        ...state,
                        posts: [...state.posts, newPost],

                    };
                }
            case ADD_LIKES:
                return {
                    ...state,
                    posts: state.posts.map(p => {
                        if (p.id === action.postId) {
                            if (p.isDisable === true) {
                                let likes = p.like - 1;
                                p.isDisable = false;
                                return {...p, like: likes }
                            } else {
                                let likes = p.like + 1;
                                p.isDisable = true;
                                return {...p, like: likes }
                            }
                        }
                        return p;
                    })
                }
            case SET_USER_PROFILE:
                return {
                    ...state,
                    profile: action.profile
                }
            case DELETE_POST:
                return {
                    ...state,
                    posts: state.posts.filter(p => p.id !== action.pId)
                }

            case SET_STATUS:
                return {
                    ...state,
                    status: action.status
                }
            case SAVE_PHOTO_SUCCESS:
                return {
                    ...state,
                    profile: {...state.profile, photos: action.photos }
                }
            case TOGGLE_IS_FATCHING:
                return {
                    ...state,
                    isFatching: action.isFatching
                }
            case TOGGLE_IS_FOLLOW:
                return {
                    ...state,
                    isFollow: action.isFollow
                }
            default:
                return state;
        }
    }
    // Action Creator
export const addPostActionCreator = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText
    }
}
export const addLike = (postId) => {
    return {
        type: ADD_LIKES,
        postId
    }
}

export const toggleIsFatching = (isFatching) => ({ type: TOGGLE_IS_FATCHING, isFatching })

export const toggleIsFollow = (isFollow) => ({ type: TOGGLE_IS_FOLLOW, isFollow })

export const deletePost = (pId) => {
    return {
        type: DELETE_POST,
        pId
    }
}

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}

export const savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    }
}

// Thunk Creator

export const getUserProfile = (userId) => async(dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
    let resp = await profileAPI.getStatus(userId)
    dispatch(setStatus(resp.data));

}


// export const requestStatus = (userId) => async(dispatch) => {
//     let response = await profileAPI.getStatus(userId)
//     dispatch(setStatus(response.data));

// }


export const updateStatus = (status) => async(dispatch) => {
    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }

}


export const savePhoto = (file) => async(dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
        dispatch(getAuthMe())
    }

}

export const getFollow = (id) => async(dispatch) => {
    let response = await profileAPI.getFollow(id)
    dispatch(toggleIsFollow(response.data))

}
export default profileReducer;