import { profileAPI } from '../../API/api'
const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        { message: 'Hi, my name is Artem', like: 50, dislike: 100 },
        { message: 'Hi, my name is Artem', like: 52, dislike: 99 },
        { message: 'Hi, my name is Artem', like: 51, dislike: 56 },
        { message: 'Hi, my name is Artem', like: 9, dislike: 13 },
        { message: 'Hi, my name is Artem', like: 51, dislike: 9 },
    ],
    newPostText: 'mops.com',
    profile: null,
    status: null

}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            {
                const newPost = {
                    message: action.newPostText,
                    like: 0,
                    dislike: 0
                };
                return {
                    ...state,
                    posts: [...state.posts, newPost],

                };
            }
            // case UPDATE_NEW_POST_TEXT:
            //     return {
            //         ...state,
            //         newPostText: action.newText
            //     }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => {
        return {
            type: ADD_POST,
            newPostText
        }
    }
    // export const updateNewPostTextActionCreator = (text) => {
    //     return {
    //         type: UPDATE_NEW_POST_TEXT,
    //         newText: text
    //     }
    // }

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

export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            })
    }
}

export const requestStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                debugger
                dispatch(setStatus(response.data));
            })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
                debugger

            })
    }
}

export default profileReducer;