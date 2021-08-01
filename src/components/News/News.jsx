import React, { useState, useEffect } from "react";
import s from "./News.module.css";
import Notification from "./../../assets/images/notification.png";
import NotificationB from "./../../assets/images/notificationB.png";
import ProfilePhoto from "./../../assets/images/user.png";
import Post from "./../Posts/MyPosts/Post/Post";
import Gallery from "./../../assets/images/gallery.png";

const News = (props) => {
  const [focus, setFocus] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isWriteHashTag, setIsWriteHashTag] = useState(false);
  const [valuePostText, setValuePostText] = useState("");
  const [valuePostTitle, setValuePostTitle] = useState("");
  const [valueHashTag, setValueHashTag] = useState("");
  let newUrl = window.location.href;
  if (props.strUrlPrev != newUrl) {
    props.changeIndex(newUrl);
  }
  const openPopup = () => {
    document.querySelector(".react-swipeable-view-container").style.cssText =
      "transform: translate(50) !important;" + "will-change: auto !important;";
    setIsCreatePost(true);
  };
  const closePopup = () => {
    document.querySelector(".react-swipeable-view-container").style.cssText =
      "will-change: transform; !important" +
      "flex-direction: row;" +
      "transition: all 0s ease 0s;" +
      "direction: ltr;" +
      "display: flex;" +
      "transform: translate(0px, 0px);";
    setIsCreatePost(false);
    setValuePostText("");
    setValuePostTitle("");
    setValueHashTag("");
  };
  const submitPost = () => {
    props.addPostActionCreator(valuePostText, valuePostTitle);
    closePopup();
  };
  const handleChangePostText = (event) => {
    setValuePostText(event.target.value);
  };
  const handleChangeHashTag = (event) => {
    setValueHashTag(event.target.value);
  };
  const handleChangePostTitle = (event) => {
    setValuePostTitle(event.target.value);
  };
  useEffect(() => {
    var tx = document.getElementById("textarea");
    let height = tx.style.height;
    let heightNumber = Number(height.substring(0, height.length - 2));
    if (heightNumber > 500) {
      tx.setAttribute("style", "height: 500px;" + "overflow-y:scroll;");
    } else {
      tx.setAttribute(
        "style",
        "height:" + tx.scrollHeight + "px;overflow-y:hidden;"
      );
      tx.addEventListener("input", OnInput, false);

      function OnInput(e) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      }
    }
  }, [valuePostText]);
  useEffect(() => {
    var tx = document.getElementById("textareaTitle");
    let height = tx.style.height;
    let heightNumber = Number(height.substring(0, height.length - 2));
    if (heightNumber > 60) {
      tx.setAttribute("style", "height: 60px;" + "overflow-y:scroll;");
    } else {
      tx.setAttribute(
        "style",
        "height:" + tx.scrollHeight + "px;overflow-y:hidden;"
      );
      tx.addEventListener("input", OnInput, false);

      function OnInput(e) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      }
    }
  }, [valuePostTitle]);

  return (
    <div className={s.newsListPage}>
      <div className={s.anythingNewBlock}>
        <div className={s.anythingNewProfilePhotoBlock}>
          <img
            className={s.anythingNewProfilePhoto}
            src={ProfilePhoto}
            alt="profile photo"
          />
        </div>
        <div className={s.anythingNew} onClick={openPopup}>
          <span>Anything new?</span>
        </div>
      </div>
      <div
        className={s.popupCreatePost + " " + (isCreatePost && s.active)}
        onMouseDown={closePopup}
      >
        <div
          className={s.popupContent}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onClick={() => {
            isWriteHashTag && setIsWriteHashTag(false);
          }}
        >
          <div className={s.popupContentHader}>
            <div className={s.popupContentHeaderTitle}>Create post</div>
            <div className={s.popupContentHeaderOff} onClick={closePopup}></div>
          </div>
          <div className={s.popupContentBody}>
            <div className={s.popupContentBodyAuthor}>
              <div className={s.popupContentBodyAuthorAvatarBlock}>
                <img
                  className={s.popupContentBodyAuthorAvatar}
                  src={props.profile.avatar}
                  alt="avatar"
                />
              </div>
              <div className={s.popupContentBodyAuthorNameAndHashtag}>
                <div className={s.popupContentBodyAuthorName}>
                  {props.profile.fullname}
                </div>

                {isWriteHashTag ? (
                  <input
                    className={s.popupContentBodyHashTagInput}
                    type="text"
                    value={valueHashTag}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleChangeHashTag}
                    autoFocus
                  />
                ) : (
                  <div onDoubleClick={() => setIsWriteHashTag(true)}>
                    {valueHashTag == "" ? (
                      <div className={s.addHashtag}>
                        HashTag example, <span>#sport #study</span>
                      </div>
                    ) : (
                      <div className={s.hashTag}>{valueHashTag}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <textarea
              className={s.popupContentTitleTextarea}
              id="textareaTitle"
              value={valuePostTitle}
              maxLength="70"
              placeholder="Title post!"
              onChange={handleChangePostTitle}
            ></textarea>
            <textarea
              value={valuePostText}
              id="textarea"
              placeholder="What's on your mind?"
              className={s.popupContentBodyTextarea}
              onChange={handleChangePostText}
            >
              <span></span>
            </textarea>
          </div>
          <div className={s.popupContentAddToYourPostBlock}>
            <span className={s.popupContentAddToYourPost}>
              Add to your post
            </span>
            <img
              className={s.popupContentAddToYourPostGallery}
              src={Gallery}
              alt="gallery icon"
            />
          </div>
          <div
            onClick={
              (valuePostText !== "") & (valuePostTitle !== "") && submitPost
            }
            className={
              s.popupContentAddPost +
              " " +
              ((valuePostText !== "") & (valuePostTitle !== "") &&
                s.popupContentAddPostSubmit)
            }
          >
            <span>Post</span>
          </div>
        </div>
      </div>
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
