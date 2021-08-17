import { postsAPI } from "../../API/api"

const ADD_POST = "app/posts-reducer/ADD-POST"
const SET_SEARCH_POSTS = 'app/posts-reducer/SET_SEARCH_POSTS'
const ADD_POSTS = "app/posts-reducer/ADD-POSTS"
const ADD_LIKES = "app/posts-reducer/ADD_LIKES"
const DELETE_POST = "app/posts-reducer/DELETE_POST"
const GET_LAST_POST = "app/posts-reducer/GET_LAST_POST"
const SET_PAGE = "app/posts-reducer/SET_PAGE"
const UPLOAD_POSTS = "app/posts-reducer/UPLOAD_POSTS"
const SET_TOTAL_ITEMS = 'app/posts-reducer/SET_TOTAL_ITEMS'
const SET_LOADING_POSTS = 'app/post-reducer/SET_LOADING_POSTS'
const CLEAR_POSTS = 'app/post-reducer/CLEAR_POSTS'
const SET_PAGE_SELECTION = 'app/post-reducer/SET_PAGE_SELECTION';
const SET_Q = 'app/post-reducer/SET_Q'

let initialState = {
  posts: [
  ],
  newPostText: "mops.com",
  lastPost: null,
  limit:5,
  totalItems: null,
  page: 1,  
  uploadPosts: true,
  loadingPosts: false,
  pageSelection: 'posts',
  q: ''
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [action.post, ...state.posts, ],
      }
    }
    case ADD_POSTS: {
      return {
        ...state,
        posts: [...state.posts, ...action.posts, ]
      }
    }
    case SET_SEARCH_POSTS: {
      return {
        ...state,
        posts: [...action.posts]
      }
    }
    case UPLOAD_POSTS: {
      return {
        ...state,
        uploadPosts: action.uploadPosts
      }
    }
    case SET_PAGE_SELECTION:
      return {
        ...state,
        pageSelection: action.pageSelection,
      }
      case SET_Q:
        return {
          ...state,
          q: action.q
        }
    case SET_TOTAL_ITEMS: {
      return {
        ...state,
        totalItems: action.totalItems
      }
    }
    case CLEAR_POSTS: {
      return {
      ...state,
      posts: []
      }
    }
    case SET_LOADING_POSTS: {
      return {
        ...state,
        loadingPosts: action.loadingPosts
      }
    }
    case ADD_LIKES:
      return {
        ...state,
        posts: state.posts.map(p => {
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
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.pId),
      }
    case GET_LAST_POST:
      return {
        ...state,
        lastPost: state.posts[state.posts.length - 1],
      }
    default:
      return state
  }
}
// Action Creactor

export const addPostActionCreator = (post) => {
  return {
    type: ADD_POST,
    post
  }
}
export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page
  }
}
export const setPosts = (posts) => {
  return {
    type: ADD_POSTS,
    posts
  }
}
export const setSearchPosts = (posts) => {
  return {
    type: SET_SEARCH_POSTS,
    posts
  }
}
export const addLike = postId => {
  return {
    type: ADD_LIKES,
    postId,
  }
}
export const deletePostAC = pId => {
  return {
    type: DELETE_POST,
    pId,
  }
}
export const getTheLastPost = () => ({
  type: GET_LAST_POST,
})

export const setUploadPost = (uploadPosts) => ({
  type: UPLOAD_POSTS,
  uploadPosts
})

export const setTotalItems = (totalItems) => ({
  type: SET_TOTAL_ITEMS,
  totalItems
})
export const setLoadingPosts = (loadingPosts) => ({
  type: SET_LOADING_POSTS,
  loadingPosts
})

export const clearPosts = () => ({
  type: CLEAR_POSTS,
})
export const setQ = (q) => ({
  type: SET_Q,
  q
})
export const setPageSelection = (pageSelection) => {
  return { type: SET_PAGE_SELECTION, pageSelection }
}
// ? Thunk Creator

export const requestPosts = (page) => async dispatch => {
  if (page === 1) {
    dispatch(setLoadingPosts(true))
  }
  let response = await postsAPI.getPosts(initialState.limit, page)
  dispatch(setUploadPost(false))
  dispatch(setPosts(response.items))
  dispatch(setPage(page + 1))
  dispatch(setTotalItems(response.totalItems))
  dispatch(setLoadingPosts(false))
}

export const requestAllPosts = (page, q = '') => async (dispatch,getState) => {
  let state = getState()
  dispatch(setQ(q))
  if (page === 1) {
    dispatch(setLoadingPosts(true))
  }
  let response = await postsAPI.getAllPosts(initialState.limit, page, q)
  dispatch(setUploadPost(false))
  if (q === '' && state.posts.q !== '') {
    dispatch(setSearchPosts(response.items))
    
  } else if (q == '' || q == state.posts.q) {
    dispatch(setPosts(response.items))
  } else {
    dispatch(setSearchPosts(response.items))
  }
  
  dispatch(setPage(page + 1))
  dispatch(setTotalItems(response.totalItems))
  dispatch(setLoadingPosts(false))
}

export const requestUserPosts = (login, page) => async dispatch => {
  if (page === 1) {
    dispatch(setLoadingPosts(true))
  }
  let response = await postsAPI.getUserPosts(login,  initialState.limit, page)
  dispatch(setUploadPost(false))
  dispatch(setPosts(response.items))
  dispatch(setPage(page + 1))
  dispatch(setTotalItems(response.totalItems))
  dispatch(setLoadingPosts(false))
}

export const createPost = (title, body, attachments) => async dispatch => {

  let response = await postsAPI.createPost(title, body, attachments)
  dispatch(addPostActionCreator(response))
}

export const deletePost = (id) => async dispatch => {
  let response = await postsAPI.deletePost(id)
    dispatch(deletePostAC(id))
    dispatch(setTotalItems(initialState.totalItems - 1))
  
}
export const likePost = (id) => async dispatch => {
  let response = await postsAPI.likePost(id)
    dispatch(addLike(id))
  
}
export const unlikePost = (id) => async dispatch => {
  let response = await postsAPI.unlikePost(id)
    dispatch(addLike(id))
  
}
export default postsReducer
