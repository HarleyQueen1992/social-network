import React, { useEffect, useState } from "react";
import s from "./CreatePost.module.css";
import Gallery from "./../../../../../assets/images/gallery.png";

const CreatePost = (props) => {
  const [isWriteHashTag, setIsWriteHashTag] = useState(false);
  const [valuePostText, setValuePostText] = useState("");
  const [valuePostTitle, setValuePostTitle] = useState("");
  const [valueHashTag, setValueHashTag] = useState("");
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
    props.setIsCreatePost(false);
    setValuePostText("");
    setValuePostTitle("");
    setValueHashTag("");
  };
  const submitPost = () => {
    closePopup();
    props.createPost(valuePostTitle, valuePostText);
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
  useEffect(() => {
    return () => {
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
      props.setIsCreatePost(false);
      setValuePostText("");
      setValuePostTitle("");
      setValueHashTag("");
      console.log("exit");
    };
  }, []);
  return (
    <div
      className={s.popupCreatePost + " " + (props.isCreatePost && s.active)}
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
          <span className={s.popupContentAddToYourPost}>Add to your post</span>
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
  );
};
export default CreatePost;
