import { friendsAPI } from "../../API/api";

const SEND_MESSAGE = 'SEND-MESSAGE';
const SET_CURRENT_FRIEND = 'SET_CURRENT_FRIEND';
const SET_TOTAL_FRIENDS_COUNT = 'SET_TOTAL_FRIENDS_COUNT';
const TOGGLE_IS_FATCHING = 'TOGGLE_IS_FATCHING';
const NEXT_FRIEND = 'NEXT_FRIEND';
const EARLY_FRIEND = 'EARLY_FRIEND';
const SET_FRIENDS = 'SET_FRIENDS';

// const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'adasds' },
        { id: 4, message: 'Hi' },
        { id: 5, message: 'adasds' },


    ],
    // dialogs: [
    //     { id: 1, name: 'Dimych' },
    //     { id: 2, name: 'Sveta' },
    //     { id: 3, name: 'Andrew' },
    //     { id: 4, name: 'Sasha' },
    //     { id: 5, name: 'Vicotr' },
    //     { id: 6, name: 'Artem' },
    // ],
    currentFriend: 1,
    friends: [],
    pageSize: 7,
    totalFriendsCount: 20,
    isFatching: false,

}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: action.newMessageText }]

            }
        case SET_FRIENDS:
            {
                return {
                    ...state,
                    friends: [...action.friends]
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

export const setFriends = (friends) => ({ type: SET_FRIENDS, friends })

export const setFriendsTotalCount = (totalFriendsCount) => ({ type: SET_TOTAL_FRIENDS_COUNT, totalFriendsCount })

export const toggleIsFatching = (isFatching) => ({ type: TOGGLE_IS_FATCHING, isFatching })

export const nextFriend = () => ({ type: NEXT_FRIEND })

export const earlyFriend = () => ({ type: EARLY_FRIEND })

export const sendMessageActionCreator = (newMessageText) => ({ type: SEND_MESSAGE, newMessageText })

export const setCurrentFriend = (currentFriend) => ({ type: SET_CURRENT_FRIEND, currentFriend })


// export const updateNewMessageTextActionCreator = (body) => {
//     return {
//         type: UPDATE_NEW_MESSAGE_TEXT,
//         newText: body
//     }
// }

export const requestFriends = (currentFriend, pageSize, append = '') => {
    return (dispatch) => {
        dispatch(toggleIsFatching(true));
        if (append === 'early') {
            dispatch(earlyFriend())
        } else if (append === 'next') {
            dispatch(nextFriend())
        }
        dispatch(setCurrentFriend(currentFriend))
        friendsAPI.getFriends(currentFriend, pageSize)
            .then(data => {
                dispatch(toggleIsFatching(false))
                dispatch(setFriends(data.items));
                dispatch(setFriendsTotalCount(data.totalCount));
            })
    }
}
export default dialogsReducer;