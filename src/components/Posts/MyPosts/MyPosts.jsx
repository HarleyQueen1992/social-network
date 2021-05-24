import React, { useState } from "react"
import p from "./MyPosts.module.css"
import Post from "./Post/Post"
import PostCreationContainer from "./PostCreation/PostCreationContainer"
import CreatePost from "./../../../assets/images/editWhite.png"
import CreatePostLight from "./../../../assets/images/edit.png"
import Search from "./../../../assets/images/searchW.png"

const MyPosts = props => {
  const [focus, setFocus] = useState(false)

  let toggleFocus = () => {
    setFocus(!focus)
  }

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
          <header className={p.header + " " + (focus ? p.active : "")}>
            <div className={p.heading + " " + (focus ? p.action : "")}>
              <span>Posts</span>
            </div>
            <div
              className={p.wrap}
              // onClick={() => {
              //   setFocus(!focus)
              // }}
            >
              <form className={p.forma} action='' autocomplete='on'>
                <input
                  id='search'
                  name='search'
                  type='text'
                  placeholder='Post search'
                  onFocus={() => {
                    setFocus(!focus)
                  }}
                  onBlur={() => {
                    setFocus(!focus)
                  }}
                />
                <img
                  src={Search}
                  className={p.searchSubmit}
                  value='Rechercher'
                  type='submit'
                />
              </form>
            </div>
            {/* <form className={p.searchBlock}>
              <input type="search">
              <input type='search' />
              <img className={p.fa} src={Search} alt='search' />
            </form> */}

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
