import React from 'react';
import p from './MyPosts.module.css'
import Post from "./Post/Post";
import AddPostFormRedux from './AddPost/AddPostFormRedux';

const MyPosts = (props) => {

    let postElements =
        props.posts.map(p => <Post message={p.message} like={p.like} dislike={p.dislike}/>)

    let addPost = (values) => {
        props.addPostText(values.newPostText)
    }

    return (
        <div className={p.PostsBlock}>
            <h3 className={p.myPost}>My posts</h3>
            <div className={p.addNewpost}>
                New post
                <AddPostFormRedux onSubmit={addPost} />
                <div className={p.posts}>
                    {postElements}
                </div>
            </div>
        </div>
    );
}

export default MyPosts;