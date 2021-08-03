import React, { useEffect } from "react";
import s from "./News.module.css";
import Post from "./../Posts/MyPosts/Post/Post";
import PostCreation from "../Posts/MyPosts/PostCreation/PostCreation";

const News = (props) => {
  useEffect(() => {
    props.changeIndex(window.location.href);
  }, [window.location.href]);
  return (
    <div className={s.newsListPage}>
      <PostCreation translate="0%" />
      <div className={s.news}>
        {props.posts.map((post) => (
          <Post
            border={true}
            key={post.id}
            theme={props.theme}
            profile={{ fullName: "Artem", photo: null }}
            deletePost={props.deletePost}
            addLike={props.addLike}
            id={post.id}
            title={post.title}
            message={post.message}
            like={post.like}
            dislike={post.dislike}
            isDisable={post.isDisable}
          />
        ))}
      </div>
    </div>
  );
};

export default News;
