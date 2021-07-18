import React, { useState } from "react"
import p from "./MyPosts.module.css"
import Post from "./Post/Post"
import CreatePost from "./../../../assets/images/editWhite.png"
import CreatePostLight from "./../../../assets/images/edit.png"
import save from "./../../../assets/images/send.png"
import { Icons } from "./../../../utils/Icons/Icons"

const MyPosts = props => {
  let res = Icons(props.theme)
  const [focus, setFocus] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  let newUrl = window.location.href
  if (props.strUrlPrev != newUrl) {
    props.changeIndex(newUrl)
  }

  let toggleFocus = () => {
    setIsFocus(!isFocus)
  }
  let isSmall = window.innerWidth < 480

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
      margin={true}
    />
  ))
  let addPost = () => {
    let text = newPostElementText.current.value
    let title = newPostElementTitle.current.value
    if (text === "") {
      props.toggleIsPostCreation(false)
      props.toggleIsHeaderBlur(false)
    } else {
      props.addPostActionCreator(text, title)
      props.toggleIsPostCreation(false)
      props.toggleIsHeaderBlur(false)
    }
  }

  let handleInputChange = e => {
    if (e.target.scrollTop > 0) {
      e.target.style.height = e.target.scrollHeight + "px"
    }
  }
  let stopScroll = () => {
    "body".style.overflow = "hidden"
  }

  let newPostElementText = React.createRef()
  let newPostElementTitle = React.createRef()

  return (
    <>
      <div className={p.postsListPage}>
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
            <form className={p.forma} action='' autocomplete='off'>
              <input
                className={p.search}
                name='search'
                type='text'
                placeholder='Post search'
                onFocus={() => {
                  setFocus(!focus)
                }}
                onBlur={() => {
                  setFocus(!focus)
                }}
                // autocomplete='off'
              />
              <img
                src={res["search"]}
                className={p.searchSubmit}
                alt='searchSubmit'
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
        <div
          className={p.all + " " + (props.isPostCreation && p.used)}
          onClick={() => {
            props.toggleIsPostCreation(false)
            props.toggleIsHeaderBlur(false)
          }}
        >
          {" "}
        </div>
        {props.isPostCreation &&
          (isSmall ? (
            <div className={p.PostCreationBlock}>
              {/* {stopScroll()} */}
              <div className={p.title}>
                <textarea
                  maxLength='100'
                  className={p.titleField}
                  ref={newPostElementTitle}
                  // onChange={handleInputChange}
                  autoFocus
                  placeholder='Title'
                ></textarea>
              </div>
              <div className={p.body}>
                <textarea
                  onChange={handleInputChange}
                  placeholder='Что нового?'
                  ref={newPostElementText}
                  className={p.fieldInput}
                ></textarea>
              </div>
              <div className={p.bot}>
                <img onClick={addPost} src={save} alt='send' />
              </div>
            </div>
          ) : (
            <div className={p.PostCreationContainer}>
              <div
                className={p.PostCreationField + " " + (isFocus ? p.focus : "")}
                onFocus={toggleFocus}
                onBlur={toggleFocus}
              >
                <div className={p.titleCreatePost}>
                  <textarea
                    id='title'
                    placeholder='Title'
                    ref={newPostElementTitle}
                    className={p.titleCreatePostField}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={p.bodyCreatePost}>
                  <textarea
                    onChange={handleInputChange}
                    ref={newPostElementText}
                    placeholder='body'
                    className={p.bodyCreatePostField}
                  ></textarea>
                </div>
              </div>

              <div className={p.botCreatePost}>
                <button
                  className={p.CloseBtn}
                  onClick={() => {
                    props.toggleIsPostCreation(false)
                    props.toggleIsHeaderBlur(false)
                  }}
                >
                  Close
                </button>
                <button className={p.CreatePostBtn} onClick={addPost}>
                  Create
                </button>
              </div>
            </div>
          ))}

        <div className={p.posts}>{postElements}</div>
      </div>
    </>
  )
}

export default MyPosts
