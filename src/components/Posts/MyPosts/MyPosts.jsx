import React from "react"
import p from "./MyPosts.module.css"
import Post from "./Post/Post"
import PostCreationContainer from "./PostCreation/PostCreationContainer"
import CreatePost from "./../../../assets/images/editWhite.png"
import CreatePostLight from "./../../../assets/images/edit.png"

const MyPosts = props => {
  let postElements = props.posts.map(post => (
    <Post
      border={true}
      key={post.id}
      theme={props.theme}
      profile={props.profile}
      login={props.login}
      deletePost={props.deletePost}
      addLike={props.addLike}
      id={post.id}
      message={post.message}
      like={post.like}
      dislike={post.dislike}
      isDisable={post.isDisable}
      title={post.title}
    />
  ))

  return (
    <>
      {!props.isPostCreation ? (
        <div className={p.PostsBlock}>
          <header className={p.header}>
            <div className={p.heading}>
              <span>Posts</span>
            </div>
            <div className={p.editBlock}>
              <img
                className={p.edit}
                src={props.theme == "lightTheme" ? CreatePostLight : CreatePost}
                alt='edit'
                onClick={() => {
                  props.toggleIsPostCreation(true)
                  props.toggleIsHeaderBlur(true)
                }}
              />
            </div>
          </header>
          <div className={p.posts}>{postElements}</div>
        </div>
      ) : (
        <PostCreationContainer />
      )}
    </>
  )
}

export default MyPosts
