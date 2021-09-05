import React, { useEffect } from "react";
import s from "./News.module.css";
import Post from "./../Posts/MyPosts/Post/Post";
import PostCreation from "../Posts/MyPosts/PostCreation/PostCreation";

const News = (props) => {
  useEffect(() => {
    let scroll = window.scrollY;
    props.changeIndex(window.location.href, scroll);
  }, [window.location.href]);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  });
  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      props.posts.length < props.totalPostsItems
    ) {
      props.setUploadPost(true);
    }
  };
  return (
    <div className={s.newsListPage}>
      <PostCreation translate="0%" />
      <div className={s.news}>
        {props.posts.map((post) => (
          <Post border={false} key={post.id} theme={props.theme} post={post} />
        ))}
      </div>
    </div>
  );
};

export default News;
