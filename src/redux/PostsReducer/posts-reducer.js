const SET_POSTS = 'app/posts-reducer/SET_POSTS'

let initialState = {
    posts: [{ id: 0, authorId: 0, body: 'Мой новый пост!', like: 1, }]
}

const postsReducer = (state = initialState, action) => {
        switch (action.type) {
            case SET_POSTS:
                return {
                    ...state,
                    posts: action.post
                }
            default:
                return state;
        }
    }
    // Action Creactor

export const setPosts = (post) => ({ type: SET_POSTS, post })

// ? Thunk Creator

// export const getAllFriends = () => async(dispatch) => {
//     let data = await friendsAPI.getAllFriends()

//     dispatch(setFriends(data.data.items));
// }


export default postsReducer;