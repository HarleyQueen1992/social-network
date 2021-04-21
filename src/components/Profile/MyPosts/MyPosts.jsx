import React, { useState } from 'react';
import p from './MyPosts.module.css'
import Post from "./Post/Post";
import AddPostFormRedux from './AddPost/AddPostFormRedux';
import PostCreation from './PostCreation/PostCreation'

const MyPosts = (props) => {


    let postElements =
        props.posts.map(post => <Post profile={props.profile} login={props.login} deletePost={props.deletePost} addLike={props.addLike} id={post.id} message={post.message} like={post.like} dislike={post.dislike} isDisable={post.isDisable}/>)

    let addPost = (values) => {
        props.addPostActionCreator(values.newPostText)
    }

    return (
        <div className={p.PostsBlock}>
            <div className={p.addNewpost}>
                <div className={p.createPost} >
                    
                    {/* <PostCreation/> */}
                    <div className={p.createPostBlock} onClick={() => {props.toggleIsPostCreation(true)}}  >
                        <span>Create post</span>
                      </div>

                    
                    
                </div>
                <AddPostFormRedux onSubmit={addPost} />
                <div className={p.posts}>
                    {postElements}
                </div>
            </div>
        </div>
    );
}

export default MyPosts;
