import { profileAPI } from '../../API/api'
const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const ADD_LIKES = 'ADD_LIKES'

let initialState = {
    posts: [
        { id: 0, message: 'Hi, my name is Artem', like: 50, dislike: 100, isDisable: false },
        { id: 1, message: 'Hi, my name is Artem', like: 52, dislike: 99, isDisable: false }
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
            // case ADD_LIKES:
            //     {
            //         const post = state.posts.filter(post => post.id === action.postId);

            //         post.like += 1

            //         post[action.postId]

            //         return {
            //             ...state,
            //             posts:

            //         }
            //     }
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
export const addLike = (postId) => {
    return {
        type: ADD_LIKES,
        postId
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