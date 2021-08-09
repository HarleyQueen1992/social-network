import React, { useState, useEffect } from "react";
import p from "./MyPosts.module.css";
import Post from "./Post/Post";
import CreatePost from "./../../../assets/images/editWhite.png";
import CreatePostLight from "./../../../assets/images/edit.png";
import save from "./../../../assets/images/send.png";
import { Icons } from "./../../../utils/Icons/Icons";
import PostCreation from "./PostCreation/PostCreation";

const MyPosts = (props) => {
  let res = Icons(props.theme);
  const [focus, setFocus] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  let toggleFocus = () => {
    setIsFocus(!isFocus);
  };
  useEffect(() => {
    props.changeIndex(window.location.href);
  }, [window.location.href]);
  let isSmall = window.innerWidth < 480;

  let addPost = () => {
    let text = newPostElementText.current.value;
    let title = newPostElementTitle.current.value;
    if (text === "") {
      props.toggleIsPostCreation(false);
      props.toggleIsHeaderBlur(false);
    } else {
      props.addPostActionCreator(text, title);
      props.toggleIsPostCreation(false);
      props.toggleIsHeaderBlur(false);
    }
  };

  let handleInputChange = (e) => {
    if (e.target.scrollTop > 0) {
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };
  let stopScroll = () => {
    "body".style.overflow = "hidden";
  };

  let newPostElementText = React.createRef();
  let newPostElementTitle = React.createRef();

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
            <form className={p.forma} action="" autocomplete="off">
              <input
                className={p.search}
                name="search"
                type="text"
                placeholder="Post search"
                onFocus={() => {
                  setFocus(!focus);
                }}
                onBlur={() => {
                  setFocus(!focus);
                }}
                // autocomplete='off'
              />
              <img
                src={res["search"]}
                className={p.searchSubmit}
                alt="searchSubmit"
                value="Rechercher"
                type="submit"
              />
            </form>
          </div>

          <div className={p.editBlock}>
            <img
              className={p.edit}
              src={props.theme == "lightTheme" ? CreatePostLight : CreatePost}
              alt="edit"
              onClick={() => {
                props.toggleIsPostCreation(true);
                props.toggleIsHeaderBlur(true);
              }}
            />
          </div>
        </header>

        <PostCreation translate="-200%" />
        <div className={p.posts}>
          {props.posts.map((post) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPosts;
