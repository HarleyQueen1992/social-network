import { compose } from 'redux';
import { stopSubmit } from 'redux-form';
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
                    ...action.data

                };
            }
        case SET_PROFILE_DATA:
            {
                return {
                    ...state,
                    ...action.data
                }
            }
        default:
            return state;
    }
}

// Action Creator
export const setAuthUserData = (userId, login, email, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: { userId, login, email, isAuth }
    }
}

export const setProfileData = (profileInfo, isAuth) => {
    return {
        type: SET_PROFILE_DATA,
        data: { profileInfo, isAuth }
    }
}

// Thunk Creator

export const getAuthMe = () => {
    return (dispatch) => {
        authAPI.getAuthMe()
            .then(data => {
                debugger
                if (data.resultCode === 0) {
                    let { id, login, email } = data.data;
                    profileAPI.getProfile(id)
                        .then(respo => {
                            debugger
                            dispatch(setProfileData(respo.data, true));
                        })
                        // dispatch(setAuthUserData(id, login, email, true));
                }
            })
    }
}

export const loginIn = (email, password) => {
    return (dispatch) => {
        authAPI.loginIn(email, password)
            .then(data => {
                debugger
                if (data.data.resultCode === 0) {
                    // debugger
                    profileAPI.getProfile(data.data.data.userId)
                        .then(respo => {
                            // debugger
                            dispatch(setProfileData(respo.data, true));
                        })
                } else {
                    debugger
                    let message = data.data.messages.length > 0 ? data.data.messages[0] : "Some error"
                    dispatch(stopSubmit("login", { _error: message }))
                }
            })
    }
}

export const logOut = () => {
    return (dispatch) => {
        authAPI.logOut()
            .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(setProfileData(null, false));

                }
            })
    }
}

export default authReducer;