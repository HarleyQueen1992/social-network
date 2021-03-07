import { friendsAPI } from '../../API/api'
const SET_FRIENDS = 'SET_FRIENDS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_FRIENDS_COUNT = 'SET_TOTAL_FRIENDS_COUNT';
const TOGGLE_IS_FATCHING = 'TOGGLE_IS_FATCHING';
const NEXT_PAGE = 'NEXT_PAGE';
const EARLY_PAGE = 'EARLY_PAGE';

let initialState = {
    friends: [],
    pageSize: 5,
    totalFriendsCount: 20,
    currentPage: 1,
    isFatching: false,


};
const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIENDS:
            {
                return {
                    ...state,
                    friends: [...action.friends]
                }
            }

        case SET_CURRENT_PAGE:
            {
                return {
                    ...state,
                    currentPage: action.currentPage
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
        case NEXT_PAGE:
            {
                return {
                    ...state,
                    currentPage: state.currentPage + 1
                }
            }
        case EARLY_PAGE:
            {
                return {
                    ...state,
                    currentPage: state.currentPage - 1
                }
            }
        default:
            return state;
    }
}

// Action Creator

export const setFriends = (friends) => ({ type: SET_FRIENDS, friends })

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })

export const setFriendsTotalCount = (totalFriendsCount) => ({ type: SET_TOTAL_FRIENDS_COUNT, totalFriendsCount })

export const toggleIsFatching = (isFatching) => ({ type: TOGGLE_IS_FATCHING, isFatching })

export const nextPage = () => ({ type: NEXT_PAGE })

export const earlyPage = () => ({ type: EARLY_PAGE })


// Thunk Creator

export const requestFriends = (currentPage, pageSize, append = '') => {
    return (dispatch) => {
        dispatch(toggleIsFatching(true));
        if (append === 'early') {
            dispatch(earlyPage())
        } else if (append === 'next') {
            dispatch(nextPage())
        }
        dispatch(setCurrentPage(currentPage))
        friendsAPI.getFriends(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFatching(false))
                dispatch(setFriends(data.items));
                dispatch(setFriendsTotalCount(data.totalCount));
            })
    }
}
export default friendsReducer;