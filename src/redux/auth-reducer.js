import { profileAPI, authAPI } from '../API/api'
const SET_USER_DATA = 'SET_USER_DATA';
const SET_PROFILE_DATA = 'SET_PROFILE_DATA'

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    profileInfo: null


}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            {
                return {
                    ...state,
                    ...action.data,
                    isAuth: true

                };
            }
        case SET_PROFILE_DATA:
            {
                return {
                    ...state,
                    profileInfo: action.profile,
                    isAuth: true
                }
            }
        default:
            return state;
    }
}

// Action Creator
export const setAuthUserData = (userId, login, email) => {
    return {
        type: SET_USER_DATA,
        data: { userId, login, email }
    }
}

export const setProfileData = (profile) => {
    return {
        type: SET_PROFILE_DATA,
        profile
    }
}

// Thunk Creator

export const getAuthMe = () => {
    return (dispatch) => {
        authAPI.getAuthMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let { id, login, email } = data.data;
                    profileAPI.getProfile(id)
                        .then(respo => {
                            dispatch(setProfileData(respo.data));
                        })
                    dispatch(setAuthUserData(id, login, email));
                }
            })
    }
}

export const loginIn = (email, password) => {
    return (dispatch) => {
        authAPI.loginIn(email, password)
            .then(data => {
                if (data.data.resultCode === 0) {
                    profileAPI.getProfile(data.data.data.userId)
                        .then(respo => {
                            dispatch(setProfileData(respo.data));
                        })
                }
            })
    }
}

export default authReducer;