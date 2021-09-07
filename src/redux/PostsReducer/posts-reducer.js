import { newsAPI, postsAPI } from "../../API/api"
import { setIsLoader } from "../AppReducer/app-reducer"
import { addLikeNews, deletePostNews, setNews, setPageNumber, setTotalItemsNews, setTotalPages, updatePostNews } from "../NewsPeducer/news-reducer"

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
const SET_SELECTED_POST = 'app/posts-reducer/SET_SELECTED_POST'
const SET_IS_BIG_PICTURES = 'app/posts-reducer/SET_IS_BIG_PICTURES'
const SET_IMG_URL = 'app/posts-reducer/SET_IMG_URL'
const SET_PAGE_SIZE = 'app/posts-reducer/SET_PAGE_SIZE'
const SET_SPECIFIED_POST = 'app/posts-reducer/SET_SPECIFIED_POST'
const CLEAR_SPECIFIED_POST = 'app/posts-reducer/CLEAR_SPECIFIED_POST'
const SET_OREDERING = 'app/posts-reducer/SET_OREDERING'

let initialState = {
  posts: [
  ],
  newPostText: "mops.com",
  lastPost: null,
  selectedPost: null,
  isBigPictures: false,
  limit:5,
  totalItems: null,
  page: 1,  
  uploadPosts: true,
  specifiedPost: null,
  loadingPosts: false,
  pageSelection: 'posts',
  q: '',
  dropdownMenus: false,
  dropdownMenusPostId: null,
  totalPageCount: 1,
  imgUrl: null,
  pageSize: null,
  ordering: '-createdAt'
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
    case SET_OREDERING: {
      return {
        ...state,
        ordering: action.ordering
      }
    }
    case SET_SELECTED_POST: {
      return {
        ...state,
        selectedPost: action.post
      }
    }
    case SET_IS_BIG_PICTURES: {
      return {
        ...state,
        isBigPictures: action.isBigPictures
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
      posts: [],
      loadingPosts: false
      }
    }
    case SET_LOADING_POSTS: {
      return {
        ...state,
        loadingPosts: action.loadingPosts
      }
    }
    case SET_SPECIFIED_POST: {
      return {
        ...state,
        specifiedPost: action.post
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
    case CLEAR_SPECIFIED_POST:
      return {
        ...state,
        specifiedPost: null
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      }
      case SET_PAGE_SIZE:
        return {
          ...state,
          pageSize: action.pageSize
        }
    case SET_IMG_URL:
      return {
        ...state,
        imgUrl: action.imgUrl
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
export const setSpecifiedPost = (post) => {
  return {type: SET_SPECIFIED_POST, post}
}
export const setTotalPageCount = (totalPageCount) => {
  return { type: TOTAL_PAGE_COUNT, totalPageCount }
}
export const setLeavePosts = (pageDeletePost) => {
  return { type: LEAVE_POSTS, pageDeletePost }
}
export const setSelectedPost = (post) => {
  return {type: SET_SELECTED_POST, post}
}
export const setIsBigPictures = (isBigPictures) => {
  return {type: SET_IS_BIG_PICTURES, isBigPictures}
}
export const setImgUrl = (imgUrl) => {
  return {type: SET_IMG_URL, imgUrl}
}
export const setPageSize = (pageSize) => {
  return {type: SET_PAGE_SIZE, pageSize}
}
export const clearSpecifiedPost = () => {
  return {type: CLEAR_SPECIFIED_POST}
}
export const setOrdering = (ordering) => {
  return {type: SET_OREDERING, ordering}
}
// ? Thunk Creator

export const requestPosts = (page, q = '', ordering = initialState.ordering) => async (dispatch, getState) => {
console.log('upload')
  let state = getState()
  dispatch(setQ(q))
  if (page === 1) {
    dispatch(setLoadingPosts(true))
  }
  if (page <= state.posts.totalPageCount && !state.app.isLoader && !state.posts.loadingPosts ) {
    let response = await postsAPI.getPosts(initialState.limit, page, q, ordering)
    dispatch(setUploadPost(false))
    dispatch(setTotalPageCount(response.totalPages))
    
    if (q === '' && state.posts.q !== '') {
      dispatch(setSearchPosts(response.items))
      
    } else if (q == '' || q == state.posts.q ) {
      if (page === 1) {
        dispatch(setSearchPosts(response.items))
      } else {
        dispatch(setPosts(response.items))
      }
      
    } else {
      dispatch(setSearchPosts(response.items))
    }
    dispatch(setPageSize(response.pageSize))
    dispatch(setPage(page + 1))
    dispatch(setTotalItems(response.totalItems))
    dispatch(setLoadingPosts(false))
  }
}

export const requestAllPosts = (page, q = '', ordering = initialState.ordering) => async (dispatch,getState) => {
  let state = getState()
  dispatch(setQ(q))
  if (page === 1) {
    dispatch(setLoadingPosts(true))
  }
  
    let response = await postsAPI.getAllPosts(initialState.limit, page, q, ordering)
    dispatch(setUploadPost(false))
    
    if (q === '' && state.posts.q !== '') {
      dispatch(setSearchPosts(response.items))
      
    } else if (q == '' || q == state.posts.q) {
      if (page === 1) {
        dispatch(setSearchPosts(response.items))
      } else {
        dispatch(setPosts(response.items))
      }
    } else {
      dispatch(setSearchPosts(response.items))
    }
    
    dispatch(setPageSize(response.pageSize))
    dispatch(setPage(page + 1))
    dispatch(setTotalPageCount(response.totalPages))
    dispatch(setTotalItems(response.totalItems))
    dispatch(setLoadingPosts(false))
  
  
}

export const requestUserPosts = (login, page, ordering = initialState.ordering) => async dispatch => {
  if (page === 1) {
    dispatch(setLoadingPosts(true))
  }
  let response = await postsAPI.getUserPosts(login,  initialState.limit, page, ordering)
  if (response.code !== 'notFound') {
    dispatch(setUploadPost(false))
    if (page === 1) {
      dispatch(setSearchPosts(response.items))
    } else {
      dispatch(setPosts(response.items))
    }
    dispatch(setPage(page + 1))
    dispatch(setPageSize(response.pageSize))
    dispatch(setTotalPageCount(response.totalPages))
    dispatch(setTotalItems(response.totalItems))
    dispatch(setLoadingPosts(false))
  } else {
    
  }
  
}

export const createPost = (title, body, attachments) => async (dispatch, getState) => {
    let state = getState()
  dispatch(setIsLoader(true))
  let response = await postsAPI.createPost(title, body, attachments)
   if (state.posts.pageSelection != 'news') {
    dispatch(addPostActionCreator(response))
   }
  
  dispatch(setIsLoader(false))
}

export const requestSpecifiedPost = (postId) => async (dispatch) => {
  let response = await postsAPI.getSpecifiedPost(postId)
  dispatch(setSpecifiedPost(response))
}

export const updatePost = (title, body, attachments, id) => async (dispatch, getState) => {
  dispatch(setIsLoader(true))
  let state = getState()
  let response = await postsAPI.updatePost(title, body, attachments, id)
  if (state.posts.pageSelection == 'news') {
    dispatch(updatePostNews(response))
  } else {
    dispatch(updatePostAC(response))
  }
  
  
  dispatch(setIsLoader(false))
}

export const deletePost = (id, login = '') => async (dispatch,getState) => {
  dispatch(setIsLoader(true))
  let state = getState()
  let response = await postsAPI.deletePost(id)
  if (state.posts.pageSelection == 'news') {
    dispatch(deletePostNews(id))
  } else {
    dispatch(deletePostAC(id))
  }
  

let data
  if (state.posts.pageSelection == 'news') {
    if (state.news.pageNumber - 1 < state.news.totalPages) {
      data = await newsAPI.getNews(initialState.limit, state.news.pageNumber - 1, '')
      let lastPost = [data.items[4]]
      dispatch(setTotalPages(data.totalPages))
      dispatch(setNews(lastPost))
      dispatch(setTotalItemsNews(data.totalItems))
    }
  } else {
    if (state.posts.page - 1 < state.posts.totalPageCount) {
  
      if (state.posts.pageSelection == 'posts') {
        data = await postsAPI.getPosts(initialState.limit, state.posts.page - 1, '')
      } else if (state.posts.pageSelection == 'allPosts') {
        data = await postsAPI.getAllPosts(initialState.limit, state.posts.page - 1, '')
      } else {
        data = await postsAPI.getUserPosts(initialState.limit, state.posts.page - 1, '')
    
      }
      let lastPost = [data.items[4]]
      dispatch(setPosts(lastPost))
      dispatch(setTotalItems(data.totalItems))
      dispatch(setTotalPageCount(data.totalPages))
    }
  }

  dispatch(setIsLoader(false))

}
export const likePost = (id) => async (dispatch, getState) => {
  let state = getState()
  let response = await postsAPI.likePost(id)
  if (state.posts.pageSelection === 'news') {
    dispatch(addLikeNews(id))
  } else {
    dispatch(addLike(id))
  }
    
  
}
export const unlikePost = (id) => async (dispatch,getState) => {
  let state = getState()
  let response = await postsAPI.unlikePost(id)
  if (state.posts.pageSelection === 'news') {
    dispatch(addLikeNews(id))
  } else {
    dispatch(addLike(id))
  }
  
}
export default postsReducer
