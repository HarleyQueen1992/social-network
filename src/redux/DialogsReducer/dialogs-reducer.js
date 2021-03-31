import { friendsAPI } from "../../API/api";

const SEND_MESSAGE = 'SEND-MESSAGE';
const SET_CURRENT_FRIEND = 'SET_CURRENT_FRIEND';
const SET_TOTAL_FRIENDS_COUNT = 'SET_TOTAL_FRIENDS_COUNT';
const TOGGLE_IS_FATCHING = 'TOGGLE_IS_FATCHING';
const NEXT_FRIEND = 'NEXT_FRIEND';
const EARLY_FRIEND = 'EARLY_FRIEND';
const SET_FRIENDS_IN_DIALOGS = 'SET_FRIENDS_IN_DIALOGS';

// const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'adasds' },
        { id: 4, message: 'Hi' },
        { id: 5, message: 'adasds' },


    ],
    currentFriend: 1,
    friendsInDialogs: [],
    pageSize: 7,
    totalFriendsCount: 20,
    isFatching: true,

}

// Reducer

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: action.newMessageText }]

            }
        case SET_FRIENDS_IN_DIALOGS:
            {
                return {
                    ...state,
                    friendsInDialogs: [...action.friends]
                }
            }
        case SET_CURRENT_FRIEND:
            {
                return {
                    ...state,
                    currentFriend: action.currentFriend
                }
            }
        case SET_TOTAL_FRIENDS_COUNT:
            {
                return {
                    ...state,
                    totalFriendsCount: action.totalFriendsCount
                }
            }
        case TOGGLE_IS_FATCHING:
            {
                return {
                    ...state,
                    isFatching: action.isFatching


                }
            }
        case NEXT_FRIEND:
            {
                return {
                    ...state,
                    currentFriend: state.currentFriend + 1
                }
            }
        case EARLY_FRIEND:
            {
                return {
                    ...state,
                    currentFriend: state.currentFriend - 1
                }
            }
        default:
            return state;
    }
}

// Action Creator

export const setFriendsInDialogs = (friends) => ({ type: SET_FRIENDS_IN_DIALOGS, friends })

export const toggleIsFatching = (isFatching) => ({ type: TOGGLE_IS_FATCHING, isFatching })

export const sendMessageActionCreator = (newMessageText) => ({ type: SEND_MESSAGE, newMessageText })


// Thunk Creator

export const getFriends = () => {
    return (dispatch) => {
        return friendsAPI.getAllFriends()
            .then(response => {
                dispatch(setFriendsInDialogs(response.data.items))
                dispatch(toggleIsFatching(false))
            })
    }
}

export default dialogsReducer;