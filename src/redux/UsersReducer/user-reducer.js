import { usersAPI } from '../../API/api'
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const NEXT_PAGE = 'NEXT_PAGE';
const EARLY_PAGE = 'EARLY_PAGE';
const TOGGLE_IS_FATCHING = 'TOGGLE_IS_FATCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFatching: false,
    followingInProgress: []

};
const usersReducer = (state = initialState, action) => {
        switch (action.type) {
            case FOLLOW:
                return {
                    ...state,
                    users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: true }
                        }
                        return u;
                    })
                }
            case UNFOLLOW:
                return {
                    ...state,
                    users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: false }
                        }
                        return u;
                    })
                }
            case SET_USERS:
                {
                    return {
                        ...state,
                        users: [...action.users]
                    }
                }

            case SET_CURRENT_PAGE:
                {
                    return {
                        ...state,
                        currentPage: action.currentPage
                    }
                }
            case SET_TOTAL_USERS_COUNT:
                {
                    return {
                        ...state,
                        totalUsersCount: action.totalUsersCount
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
            case TOGGLE_IS_FATCHING:
                {
                    return {
                        ...state,
                        isFatching: action.isFatching


                    }
                }
            case TOGGLE_IS_FOLLOWING_PROGRESS:
                {
                    return {
                        ...state,
                        followingInProgress: action.isFatching ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
                    }
                }
            default:
                return state;
        }
    }
    // Action Creater

export const followSuccess = (userId) => ({ type: FOLLOW, userId })

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })

export const setUsers = (users) => ({ type: SET_USERS, users })

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })

export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount })

export const nextPage = () => ({ type: NEXT_PAGE })

export const earlyPage = () => ({ type: EARLY_PAGE })

export const toggleIsFatching = (isFatching) => ({ type: TOGGLE_IS_FATCHING, isFatching })

export const toggleFollowingProgress = (isFatching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFatching, userId })

//Thunk Creater
debugger

export const requestUsers = (currentPage, pageSize, append = '') => {
    return (dispatch) => {
        dispatch(toggleIsFatching(true));
        if (append === 'early') {
            dispatch(earlyPage())
        } else if (append === 'next') {
            dispatch(nextPage())
        }
        dispatch(setCurrentPage(currentPage))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFatching(false))
                dispatch(setUsers(data.items));
                dispatch(setUsersTotalCount(data.totalCount));
            })
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.postFollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.deleteFollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}
export default usersReducer;