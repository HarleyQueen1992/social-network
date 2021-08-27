import { newsAPI } from "../../API/api";
import { setLoadingPosts, setQ, setUploadPost } from "../PostsReducer/posts-reducer";

const SET_NEWS = 'app/news-reducer/SET_NEWS';
const SET_SEARCH_NEWS = 'app/news-reducer/SET_SEARCH_NEWS';
const SET_TOTAL_ITEMS = 'app/news-reducer/SET_TOTAL_ITEMS';
const SET_TOTAL_PAGES = 'app/news-reducer/SET_TOTAL_PAGES';
const SET_PAGE_NUMBER = 'app/news-reducer/SET_PAGE_NUMBER';
const SET_Q ='app/news-reducer/Q';
const DELETE_POST = 'app/news-reducer/DELETE_POST'
const UPDATE_POST = 'app/news-reducer/UPDATE_POST'
const ADD_LIKES = 'app/news-reducer/ADD_LIKES'



let initialState = {
  news:[],
  totalItems: null,
  totalPages: 1,
  pageSize: 5,
  pageNumber: null,
  q:''
}

// ! Reducer

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: [...state.news, ...action.news],
      }
    case SET_SEARCH_NEWS:
      return {
        ...state,
        news: [...action.news]
      }
    case SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.totalItems,
      }
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.totalPages,
      }
    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber,
      }
    case SET_Q:
      return {
        ...state,
        q: action.q,
      }
    case DELETE_POST:
      return {
        ...state,
        news: state.news.filter(p => p.id !== action.pId),
      }
    case UPDATE_POST: {
      return {
        ...state,
        news: state.news.map(p => {
          if (p.id === action.post.id) {
            return { ...action.post}
          }

          return p
        })
      }
    }
    case ADD_LIKES:
      return {
        ...state,
        news: state.news.map(p => {
          if (p.id === action.postId) {
            if (p.isLiked === true) {
              let likes = p.likes - 1
              return { ...p, isLiked: false, likes: likes }
            } else {
              let likes = p.likes + 1
              return { ...p, isLiked: true, likes: likes  }
            }
          }

          return p
        }),
      }
    default:
      return state
  }
}

// Action Creator

export const setNews = (news) => {
  return { type: SET_NEWS, news }
}
export const setTotalItemsNews = (totalItems) => {
  return { type: SET_TOTAL_ITEMS, totalItems }
}
export const setTotalPages = (totalPages) => {
  return { type: SET_TOTAL_PAGES, totalPages }
}
export const setPageNumber = (pageNumber) => {
  return { type: SET_PAGE_NUMBER, pageNumber }
}
// export const setQ = (q) => {
//   return { type: SET_Q, q }
// }
export const setSearchNews = (news) => {
  return {type: SET_SEARCH_NEWS, news}
}
export const deletePostNews = (pId) => {
  return {type: DELETE_POST, pId}
}
export const updatePostNews = (post) => {
  return {type: UPDATE_POST, post}
}
export const addLikeNews = postId => {
  return {
    type: ADD_LIKES,
    postId,
  }
}
// Thunk Creator

export const requestNews = (page, q = '') => async (dispatch, getState) => {
  let state = getState()
  dispatch(setQ(q))
  if (page === 1) {
    dispatch(setLoadingPosts(true))
  }
  if (page <= state.news.totalPages && !state.app.isLoader ) {
    let response = await newsAPI.getNews(initialState.pageSize, page, q)
    dispatch(setUploadPost(false))
    dispatch(setTotalPages(response.totalPages))
    if (q === '' && state.posts.q !== '') {
      dispatch(setSearchNews(response.items))
      
    } else if (q == '' || q == state.posts.q && page > 1) {
      if (page === 1) {
        dispatch(setSearchNews(response.items))
      } else {
        dispatch(setNews(response.items))
      }
      
    } else {
      dispatch(setSearchNews(response.items))
    }
    dispatch(setPageNumber(page + 1))
  
    dispatch(setTotalItemsNews(response.totalItems))
    dispatch(setLoadingPosts(false))
  }
}

export default newsReducer
