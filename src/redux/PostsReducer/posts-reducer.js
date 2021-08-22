import { postsAPI } from "../../API/api"
import { setIsLoader } from "../AppReducer/app-reducer"

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
const UPDATE_POST = 'app/posts-reducer/UPDATE_POST'
const DROPDOWN_MENUS = 'app/posts-reducer/DROPDOWN_MENUS'
const DROPDOWN_MENUS_POST_ID = 'app/posts-reducer/DROPDOWN_MENUS_POST_ID'
const TOTAL_PAGE_COUNT = 'app/posts-reducer/TOTAL_PAGE_COUNT'
const LEAVE_POSTS = 'app/posts-reducer/LEAVE_POSTS'

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
  q: '',
  dropdownMenus: false,
  dropdownMenusPostId: null,
  totalPageCount: 1
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [action.post, ...state.posts],
      }
    }
    case ADD_POSTS: {
      return {
        ...state,
        posts: [...state.posts, ...action.posts, ]
      }
    }
    case UPDATE_POST: {
      return {
        ...state,
        posts: state.posts.map(p => {
          if (p.id === action.post.id) {
            return { ...action.post}
          }

          return p
        })
      }
    }
    case SET_SEARCH_POSTS: {
      return {
        ...state,
        posts: [...action.posts]
      }
    }
    case TOTAL_PAGE_COUNT: {
      return {
        ...state,
        totalPageCount: action.totalPageCount
      }
    }
    case DROPDOWN_MENUS_POST_ID: {
      return {
        ...state,
        dropdownMenusPostId: action.postId
      }
    }
    case DROPDOWN_MENUS: {
      return {
        ...state,
        dropdownMenus: action.dropdownMenus
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
        q: ''
      }
    case SET_Q:
      return {
        ...state,
        q: action.q
      }
    case LEAVE_POSTS:
      return {
        ...state,
        posts: state.posts.slice(0, (action.pageDeletePost) * 5)
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
export const setDropdownMenus = (dropdownMenus) => {
  return {
    type: DROPDOWN_MENUS,
    dropdownMenus
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
export const updatePostAC = (post) => {
  return { type: UPDATE_POST, post }
}
export const setDropdownMenusPostId = (postId) => {
  return { type: DROPDOWN_MENUS_POST_ID, postId }
}
export const setTotalPageCount = (totalPageCount) => {
  return { type: TOTAL_PAGE_COUNT, totalPageCount }
}
export const setLeavePosts = (pageDeletePost) => {
  return { type: LEAVE_POSTS, pageDeletePost }
}
// ? Thunk Creator

export const requestPosts = (page, q = '') => async (dispatch, getState) => {
  let state = getState()
  dispatch(setQ(q))
  if (page === 1) {
    dispatch(setLoadingPosts(true))
  }
  if (page <= state.posts.totalPageCount && !state.app.isLoader ) {
  
    let response = await postsAPI.getPosts(initialState.limit, page, q)
    dispatch(setUploadPost(false))
    dispatch(setTotalPageCount(response.totalPages))
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
  dispatch(setIsLoader(true))
  let response = await postsAPI.createPost(title, body, attachments)
  dispatch(addPostActionCreator(response))
  dispatch(setIsLoader(false))
}


export const updatePost = (title, body, attachments, id) => async dispatch => {
  dispatch(setIsLoader(true))
  let response = await postsAPI.updatePost(title, body, attachments, id)
  dispatch(updatePostAC(response))
  dispatch(setIsLoader(false))
}

export const deletePost = (id, method) => async (dispatch,getState) => {
  dispatch(setIsLoader(true))
  let state = getState()
  // let posts = state.posts.posts
  // let postsLength = posts.length
  // let postsPage = postsLength / 5
  // let index = posts.findIndex(p => p.id == id)
  // let pageDeletePost = Math.floor((index / 5))
  // dispatch(setLeavePosts(pageDeletePost))
  
  // let list = posts.slice(0, index)
  // let leavePosts = posts.slice(0, (pageDeletePost) * 5)
  // let page = pageDeletePost + 1
  let response = await postsAPI.deletePost(id)
  let data
  if (state.posts.pageSelection == 'posts') {
    data = await postsAPI.getPosts(initialState.limit, state.posts.page - 1, '')

  } else {
    data = await postsAPI.getAllPosts(initialState.limit, state.posts.page - 1, '')

  }
  if (data.items.length === 5) {
    let lastPost = [data.items[4]]
    dispatch(setPosts(lastPost))
    dispatch(setTotalPageCount(data.totalPages))
    dispatch(setTotalItems(data.totalItems))
  }


  // for (let i = 0; i <state.posts.page - page ; i++ ) {
  //   if (page+i <= state.posts.totalPageCount) {
  //     let response = await postsAPI.getPosts(initialState.limit, page+i, '')
  //     dispatch(setUploadPost(false))
  //     dispatch(setPosts(response.items))
  //     dispatch(setTotalPageCount(response.totalPages))
  //     dispatch(setTotalItems(response.totalItems))
  //     dispatch(setLoadingPosts(false))
  //   }
    
  // }
  dispatch(deletePostAC(id))
  
  dispatch(setIsLoader(false))
  
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
