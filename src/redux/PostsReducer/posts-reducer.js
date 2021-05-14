const ADD_POST = "app/posts-reducer/ADD-POST"
const ADD_LIKES = "app/posts-reducer/ADD_LIKES"
const DELETE_POST = "app/posts-reducer/DELETE_POST"
const GET_LAST_POST = "app/posts-reducer/GET_LAST_POST"

let initialState = {
  posts: [
    {
      id: 0,
      message:
        "React изначально был спроектирован так, чтобы его можно было внедрять постепенно. Другими словами, вы можете начать с малого и использовать только ту функциональность React, которая необходима вам в данный момент. Информация в этом разделе будет полезна в любой ситуации: при первом знакомстве с React, при создании простой динамической HTML-страницы и даже при проектировании сложного React-приложения.",
      like: 50,
      dislike: 100,
      isDisable: false,
    },
    {
      id: 1,
      message:
        "This property is applied by first translating the element by the value of the property, then applying the element's transform, then translating by the negated property value. This means, this definition",
      like: 52,
      dislike: 99,
      isDisable: false,
    },
  ],
  newPostText: "mops.com",
  lastPost: null,
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: state.posts.length,
        message: action.newPostText,
        like: 0,
        dislike: 0,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
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

export const addPostActionCreator = newPostText => {
  return {
    type: ADD_POST,
    newPostText,
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

// ? Thunk Creator

// export const getAllFriends = () => async(dispatch) => {
//     let data = await friendsAPI.getAllFriends()

//     dispatch(setFriends(data.data.items));
// }

export default postsReducer
