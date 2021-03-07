import React from 'react';
import {addPostActionCreator} from '../../../redux/ProfileReducer/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPostText: (newPostText) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}
let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;