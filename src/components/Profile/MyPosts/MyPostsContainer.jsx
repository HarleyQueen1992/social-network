import React from 'react';
import {addPostActionCreator, addLike, deletePost} from '../../../redux/ProfileReducer/profile-reducer';
import {getNewPostText, getPosts} from '../../../redux/ProfileReducer/profile-selectors'
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { getLogin } from '../../../redux/AuthReducer/auth-selectors';

let mapStateToProps = (state) => {
    return {
        posts: getPosts(state),
        newPostText: getNewPostText(state),
        login: getLogin(state)

    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPostText: (newPostText) => {
            dispatch(addPostActionCreator(newPostText))
        },
        addLike: (postId) => {
            dispatch(addLike(postId))
        },
        deletePost: (postId) => {
            dispatch(deletePost(postId))
        }
    }
}
let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;