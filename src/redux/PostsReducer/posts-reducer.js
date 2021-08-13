import { postsAPI } from "../../API/api"

const ADD_POST = "app/posts-reducer/ADD-POST"
const ADD_POSTS = "app/posts-reducer/ADD-POSTS"
const ADD_LIKES = "app/posts-reducer/ADD_LIKES"
const DELETE_POST = "app/posts-reducer/DELETE_POST"
const GET_LAST_POST = "app/posts-reducer/GET_LAST_POST"
const SET_PAGE = "app/posts-reducer/SET_PAGE"
const UPLOAD_POSTS = "app/posts-reducer/UPLOAD_POSTS"
const SET_TOTAL_ITEMS = 'app/posts-reducer/SET_TOTAL_ITEMS'
const SET_LOADING_POSTS = 'app/post-reducer/SET_LOADING_POSTS'

let initialState = {
  posts: [
  ],
  newPostText: "mops.com",
  lastPost: null,
  limit:2,
  totalItems: null,
  page: 1,  
  uploadPosts: true,
  loadingPosts: false
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [...state.posts, action.post],
      }
    }
    case ADD_POSTS: {
      return {
        ...state,
        posts: [...state.posts, ...action.posts]
      }
    }
    case UPLOAD_POSTS: {
      return {
        ...state,
        uploadPosts: action.uploadPosts
      }
    }
    case SET_TOTAL_ITEMS: {
      return {
        ...state,
        totalItems: action.totalItems
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
            if (p.isDisable === true) {
              let likes = p.like - 1
              p.isDisable = false
              return { ...p, like: likes }
            } else {
              let likes = p.like + 1
              p.isDisable = true
              return { ...p, like: likes }
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
export const addLike = postId => {
  return {
    type: ADD_LIKES,
    postId,
  }
}
export const deletePost = pId => {
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

export
 const createPost = (title, body) => async dispatch => {
  let response = await postsAPI.createPost(title, body)
  dispatch(addPostActionCreator(response))
  debugger
}

export default postsReducer
