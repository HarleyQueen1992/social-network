import React, { useState, useEffect } from "react";
import s from "./PostCreation.module.css";
import ProfilePhoto from "./../../../../assets/images/user.png";
import Gallery from "./../../../../assets/images/gallery.png";
import { connect } from "react-redux";
import { compose } from "redux";
import { getTheme } from "./../../../../redux/AppReducer/app-selectors";
import { addPostActionCreator } from "./../../../../redux/PostsReducer/posts-reducer";
import { getProfileInfo } from "./../../../../redux/AuthReducer/auth-selectors";

const PostCreation = (props) => {
  const [focus, setFocus] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isWriteHashTag, setIsWriteHashTag] = useState(false);
  const [valuePostText, setValuePostText] = useState("");
  const [valuePostTitle, setValuePostTitle] = useState("");
  const [valueHashTag, setValueHashTag] = useState("");
  //   let newUrl = window.location.href;
  //   if (props.strUrlPrev != newUrl) {
  //     props.changeIndex(newUrl);
  //   }
  const openPopup = () => {
    document.querySelector(".react-swipeable-view-container").style.cssText =
      "transform: translate(50) !important;" + "will-change: auto !important;";
    document.querySelector("body").style.cssText = "overflow: hidden;";
    setIsCreatePost(true);
  };
  const closePopup = () => {
    document.querySelector(".react-swipeable-view-container").style.cssText =
      "will-change: transform; !important" +
      "flex-direction: row;" +
      "transition: all 0s ease 0s;" +
      "direction: ltr;" +
      "display: flex;" +
      "transform: translate(" +
      props.translate +
      ", 0px);";
    document.querySelector("body").style.cssText = "overflow: scroll;";
    setIsCreatePost(false);
    setValuePostText("");
    setValuePostTitle("");
    setValueHashTag("");
  };
  const submitPost = () => {
    closePopup();
    props.addPostActionCreator(valuePostText, valuePostTitle);
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
    if (window.innerWidth > 500) {
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
    }
  }, [valuePostText]);

  useEffect(() => {
    if (window.innerWidth > 500) {
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
    }
  }, [valuePostTitle]);

  return (
    <div className={s.postCreationBlock}>
      <div className={s.anythingNewBlock}>
        <div className={s.anythingNewProfilePhotoBlock}>
          <img
            className={s.anythingNewProfilePhoto}
            src={
              props.profile.avatar == "" ? ProfilePhoto : props.profile.avatar
            }
            alt="profile photo"
          />
        </div>
        <div className={s.anythingNew} onClick={openPopup}>
          <span>What's on your mind?</span>
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: getTheme(state),
    profile: getProfileInfo(state),
  };
};

export default compose(connect(mapStateToProps, { addPostActionCreator }))(
  PostCreation
);
