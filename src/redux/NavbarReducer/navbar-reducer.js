import { friendsAPI } from "../../API/api";

const SET_FRIENDS_IN_FRIENDS_BLOCK = 'app/navbar-reducer/SET_FRIENDS_IN_FRIENDS_BLOCK'

let initialState = {
    friendsBlock: null
}

const navbarReducer = (state = initialState, action) => {
        switch (action.type) {
            case SET_FRIENDS_IN_FRIENDS_BLOCK:
                return {
                    ...state,
                    friendsBlock: action.friends.slice(0, 6)
                }
            default:
                return state;
        }
    }
    // Action Creactor

export const setFriends = (friends) => ({ type: SET_FRIENDS_IN_FRIENDS_BLOCK, friends })

// ? Thunk Creator

// export const getAllFriends = () => async(dispatch) => {
//     let data = await friendsAPI.getAllFriends()

//     dispatch(setFriends(data.data.items));
// }


export default navbarReducer;