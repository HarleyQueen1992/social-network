import React from 'react';
import p from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postElements =
        props.posts.map(p => <Post message={p.message} like={p.like} dislike={p.dislike}/>)

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }
    return (
        <div className={p.PostsBlock}>
            <h3 className={p.myPost}>My posts</h3>
            <div className={p.addNewpost}>
                New post
                <div>
                
                    <textarea
                        value={props.newPostText}
                        ref={newPostElement}
                        cols="25" rows='1'
                        onChange={onPostChange}
                    />
                    <button onClick={addPost} className={p.but}>Add</button>
                </div>
                <div className={p.posts}>
                    {postElements}
                </div>
            </div>
        </div>
    );
}
export default MyPosts;