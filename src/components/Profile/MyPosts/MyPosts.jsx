import React from 'react';
import p from './MyPosts.module.css'
import Post from "./Post/Post";
import AddPostFormRedux from './AddPost/AddPostFormRedux';

const MyPosts = (props) => {

    console.log("RENDER  YO")

    let postElements =
        props.posts.map(post => <Post login={props.login} deletePost={props.deletePost} addLike={props.addLike} id={post.id} message={post.message} like={post.like} dislike={post.dislike} isDisable={post.isDisable}/>)

    let addPost = (values) => {
        props.addPostText(values.newPostText)
    }

    return (
        <div className={p.PostsBlock}>
            <div className={p.addNewpost}>
                <AddPostFormRedux onSubmit={addPost} />
                <div className={p.posts}>
                    {postElements}
                </div>
            </div>
        </div>
    );
}

export default MyPosts;