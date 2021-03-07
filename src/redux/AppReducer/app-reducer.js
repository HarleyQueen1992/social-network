import { stopSubmit } from 'redux-form';
import { profileAPI, authAPI } from '../../API/api'
import { getAuthMe } from './../AuthReducer/auth-reducer';
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false


}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            {
                return {
                    ...state,
                    initialized: true

                };
            }
        default:
            return state;
    }
}

// Action Creator
export const initializedSuccess = () => {
    return { type: INITIALIZED_SUCCESS }
}

// Thunk Creator

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthMe())

    promise.then(() => {
        dispatch(initializedSuccess());
    })
}
export default appReducer;