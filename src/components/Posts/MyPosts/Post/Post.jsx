import React from "react";
import p from "./Post.module.css";
import heart from "./../../../../assets/images/heart.png";
import heartDisable from "./../../../../assets/images/heartDisable.png";
import heartDark from "./../../../../assets/images/heartDark.png";
import heartDisableDark from "./../../../../assets/images/heartDisableDark.png";
import avaInPosts from "./../../../../assets/images/user.png";
import Comments from "./../../../../assets/images/comments.png";
import CommentsLight from "./../../../../assets/images/commentsLight.png";

const Post = (props) => {
  return (
    <div
      className={
        p.postBlock +
        " " +
        (props.border ? p.border : " ") +
        " " +
        (props.margin ? p.margin : " ")
      }
      key={props.id}
    >
      <div className={p.postTitle}>{props.post.title}</div>
      <div className={p.postText}>{props.post.body}</div>
      <div className={p.botBlock}>
        <div className={p.leftBlock}>
          <div className={p.commentsBlock}>
            <img
              alt="comments"
              className={p.commentsImg}
              src={props.theme == "lightTheme" ? CommentsLight : Comments}
            />
          </div>
          <div className={p.likeBlock}>
            {props.isDisable ? (
              <img
                alt="heart disable"
                onClick={() => {
                  props.addLike(props.id);
                }}
                className={p.heart}
                src={
                  props.theme == "lightTheme" ? heartDisable : heartDisableDark
                }
              />
            ) : (
              <img
                alt="heart"
                onClick={() => {
                  props.addLike(props.id);
                }}
                className={p.heart}
                src={props.theme == "lightTheme" ? heart : heartDark}
              />
            )}
            <span>{props.post.likes}</span>
          </div>
        </div>
        <div className={p.photoName}>
          <img
            className={p.postImg}
            alt="post"
            src={
              !props.post.author.avatar ? avaInPosts : props.post.author.avatar
            }
          />
          <span className={p.userName}>{props.post.author.login}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
