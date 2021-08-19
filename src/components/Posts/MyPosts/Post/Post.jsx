import React, { useState } from "react";
import p from "./Post.module.css";
import {
  setUpdatePost,
  setIsUpdatePost,
} from "./../../../../redux/AppReducer/app-reducer";
import {
  deletePost,
  likePost,
  unlikePost,
  setDropdownMenus,
  setDropdownMenusPostId,
} from "./../../../../redux/PostsReducer/posts-reducer";
import heartActive from "./../../../../assets/images/heartActive.png";
import avaInPosts from "./../../../../assets/images/user.png";
import Comments from "./../../../../assets/images/comments.png";
import CommentsLight from "./../../../../assets/images/commentsLight.png";
import DropdownMenus from "./DropdownMenus/DropdownMenus";
import { connect } from "react-redux";
import { compose } from "redux";
import { useEffect } from "react";
import { Icons } from "./../../../../utils/Icons/Icons";
import { getProfileInfo } from "../../../../redux/AuthReducer/auth-selectors";
import {
  getDropdownMenus,
  getDropdownMenusPostId,
} from "../../../../redux/PostsReducer/posts-selectors";

const Post = (props) => {
  let res = Icons(props.theme);
  // let [dropdownMenus, setDropdownMenus] = useState(false);
  let date = new Date(props.post.createdAt);
  date = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
  useEffect(() => {
    let element = document.getElementById(
      "image__list_items__" + props.post.id
    ).lastChild;
    if (element && props.post.attachments.length % 2 == 1) {
      document.getElementById(
        "image__list_items__" + props.post.id
      ).lastChild.style.cssText = "grid-column-start: 1; grid-column-end: 3;";
    }
  });

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
      <header className={p.header}>
        <div className={p.avatarBlock}>
          <img
            src={
              props.post.author.avatar ? props.post.author.avatar : avaInPosts
            }
            alt="user avatar"
          />
        </div>
        <div className={p.nameAndDate}>
          <div className={p.authorName}>{props.post.author.login}</div>
          <div className={p.datePost}>{date}</div>
        </div>
        {props.profileInfo.isAdmin ||
        props.post.author.login == props.profileInfo.login ? (
          <div
            className={
              p.morePost +
              " " +
              (props.dropdownMenus &&
              props.dropdownMenusPostId === props.post.id
                ? p.morePostClose
                : "")
            }
            onClick={(e) => {
              props.setDropdownMenusPostId(props.post.id);
              if (props.dropdownMenusPostId === props.post.id) {
                props.setDropdownMenus(!props.dropdownMenus);
              } else {
                props.setDropdownMenus(true);
              }
            }}
          >
            <span
              className={
                p.more +
                " " +
                (props.dropdownMenus &&
                props.dropdownMenusPostId === props.post.id
                  ? p.moreClose
                  : "")
              }
            ></span>
          </div>
        ) : (
          ""
        )}
      </header>
      {props.dropdownMenus && props.dropdownMenusPostId === props.post.id ? (
        <DropdownMenus
          setUpdatePost={props.setUpdatePost}
          setDropdownMenus={props.setDropdownMenus}
          setDropdownMenusPostId={props.setDropdownMenusPostId}
          theme={props.theme}
          deletePost={props.deletePost}
          post={props.post}
          setIsUpdatePost={props.setIsUpdatePost}
        />
      ) : (
        ""
      )}
      <div className={p.postTitle}>{props.post.title}</div>
      <div className={p.postText}>{props.post.body}</div>
      <div
        className={
          p.popupPostImages +
          " " +
          (props.post.attachments.length > 0 ? p.popupPostImagesActive : "")
        }
      >
        <div
          className={p.imagesListItems}
          id={"image__list_items__" + props.post.id}
        >
          {props.post.attachments &&
            props.post.attachments.map((img) => (
              <div className={p.imagesItem}>
                <img src={img} alt="images post" />
              </div>
            ))}
        </div>
      </div>
      <div className={p.botBlock}>
        <div className={p.likeCountBlock}>
          <span>{props.post.likes}</span>
        </div>
        <div
          className={p.likedBlock}
          id="likedBlock"
          onClick={() => {
            props.post.isLiked
              ? props.unlikePost(props.post.id)
              : props.likePost(props.post.id);
          }}
        >
          <img
            alt="heart"
            id="heart"
            className={p.heart}
            src={props.post.isLiked ? heartActive : res["heart"]}
          />
          <spna className={p.likeTitle}>Like</spna>
        </div>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    profileInfo: getProfileInfo(state),
    dropdownMenus: getDropdownMenus(state),
    dropdownMenusPostId: getDropdownMenusPostId(state),
  };
};
export default compose(
  connect(mapStateToProps, {
    deletePost,
    likePost,
    unlikePost,
    setUpdatePost,
    setIsUpdatePost,
    setDropdownMenus,
    setDropdownMenusPostId,
  })
)(Post);
