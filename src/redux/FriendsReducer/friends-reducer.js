import { friendsAPI } from '../../API/api'
const SET_FRIENDS = 'app/friends-reducer/SET_FRIENDS';
const SET_CURRENT_PAGE_FRIEND = 'app/friends-reducer/SET_CURRENT_PAGE_FRIEND';
const SET_TOTAL_FRIENDS_COUNT = 'app/friends-reducer/SET_TOTAL_FRIENDS_COUNT';
const TOGGLE_IS_FATCHING = 'app/friends-reducer/TOGGLE_IS_FATCHING';
const NEXT_PAGE = 'app/friends-reducer/NEXT_PAGE';
const EARLY_PAGE = 'app/friends-reducer/EARLY_PAGE';

let initialState = {
    friends: [],
    pageSize: 9,
    totalFriendsCount: 20,
    currentPage: 1,
    isFatching: true,


};
const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIENDS:
            {
                return {
                    ...state,
                    friends: [...state.friends, ...action.friends]
                }
            }

        case SET_CURRENT_PAGE_FRIEND:
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

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE_FRIEND, currentPage })

export const setFriendsTotalCount = (totalFriendsCount) => ({ type: SET_TOTAL_FRIENDS_COUNT, totalFriendsCount })

export const toggleIsFatching = (isFatching) => ({ type: TOGGLE_IS_FATCHING, isFatching })

export const nextPage = () => ({ type: NEXT_PAGE })

export const earlyPage = () => ({ type: EARLY_PAGE })


// Thunk Creator
export const requestFriends = (currentPage) => {
        return (dispatch) => {
            // dispatch(toggleIsFatching(true))
            friendsAPI.getFriends(currentPage, initialState.pageSize)
                .then(data => {
                    dispatch(toggleIsFatching(false))
                    dispatch(setFriends(data.data.items))
                    dispatch(setCurrentPage(currentPage + 1))
                    dispatch(setFriendsTotalCount(data.data.totalCount))
                })

        }
    }
    // export const requestFriends = (currentPage, pageSize, append = '') => async(dispatch) => {
    //     dispatch(toggleIsFatching(true));
    //     if (append === 'early') {
    //         dispatch(earlyPage())
    //     } else if (append === 'next') {
    //         dispatch(nextPage())
    //     }
    //     dispatch(setCurrentPage(currentPage))
    //     let data = await friendsAPI.getFriends(currentPage, pageSize)

//     dispatch(toggleIsFatching(false))
//     dispatch(setFriends(data.data.items));
//     dispatch(setFriendsTotalCount(data.data.totalCount));
//     dispatch(setCurrentPage(currentPage))

// }

export default friendsReducer;