import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

//? Selectors imports
import { getTheme } from "../../../../../redux/AppReducer/app-selectors";
import { getProfileInfo } from "../../../../../redux/AuthReducer/auth-selectors";

//? Utils
import { Icons } from "./../../../../../utils/Icons/Icons";

//? Css
import s from "./PostForm.module.css";

const PostForm = (props) => {
  let res = Icons(props.theme);
  const [isWriteHashTag, setIsWriteHashTag] = useState(false);
  const [valuePostText, setValuePostText] = useState(props.valueText);
  const [valuePostImages, setValuePostImages] = useState(props.valueImages);
  const [uploadedTheFile, setUploadedTheFile] = useState(false);
  const [valuePostTitle, setValuePostTitle] = useState(props.valueTitle);
  const [valueHashTag, setValueHashTag] = useState("");
  // const [uploadImages, setUploadImages] = useState(true);

  const closePopup = () => {
    document.querySelector("body").style.cssText = "overflow: scroll;";
    if (props.isUpdatePost) {
      props.setDropdownMenus(false);
    }
    props.closePopup(false);
  };

  const submitPost = () => {
    closePopup();
    if (props.isUpdatePost) {
      props.submit(
        valuePostTitle,
        valuePostText,
        typeof valuePostImages[0] !== "string" && valuePostImages,
        props.updatePostData.id
      );
    } else {
      props.submit(valuePostTitle, valuePostText, valuePostImages);
    }
  };
  const handleChangePostText = (event) => {
    setValuePostText(event.target.value);
  };
  const handleChangeHashTag = (event) => {
    setValueHashTag(event.target.value);
  };
  const uploadAPhoto = (event) => {
    let files = event.target.files;
    let length = files.length;
    if (length > 5) {
      length = 5;
    }

    setUploadedTheFile(true);
    let files = event.target.files;
    let length = files.length;
    if (length > 5) {
      length = 5;
    }
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(files[i]);
    }
    setValuePostImages(arr);
  };
  useEffect(() => {
    var tx = document.getElementById("textarea");
    let height = tx.style.height;
    let heightNumber = Number(height.substring(0, height.length - 2));
    let length = valuePostText.length;

    if (valuePostText.length > 200) {
      tx.setAttribute("style", "px;overflow-y:hidden; font-size:16px;");
      tx.setAttribute(
        "style",
        "height:" + tx.scrollHeight + "px;overflow-y:hidden; font-size:16px;"
      );
    } else {
      tx.setAttribute(
        "style",
        "height:" + tx.scrollHeight + "px;overflow-y:hidden;"
      );
    }
    tx.addEventListener("input", OnInput, false);

    function OnInput(e) {
      this.style.height = "auto";
    }
  }, [valuePostText]);

  useEffect(() => {
    if (!props.isUpdatePost || uploadedTheFile) {
      valuePostImages.forEach((img, index) => {
        var preview = document.getElementById("img-" + index);
        if (document.getElementById("imagesListItems")) {
          for (
            let i = 0;
            i < document.getElementById("imagesListItems").childNodes.length;
            i++
          ) {
            document.getElementById("imagesListItems").childNodes[
              i
            ].style.cssText = "grid-column: auto;"; // Text, DIV, Text, UL, ..., SCRIPT
          }
        }

        var reader = new FileReader();

        reader.onload = function () {
          let test = reader.result;
          preview.src = test;
        };
        if (img) {
          reader.readAsDataURL(img);
        } else {
          preview.src = "";
        }
      });
    }
    let element = document.getElementById("imagesListItems").lastChild;
    if (element && valuePostImages.length % 2 == 1) {
      document.getElementById("imagesListItems").lastChild.style.cssText =
        "grid-column-start: 1; grid-column-end: 3;";
    }
  }, [valuePostImages]);

  useEffect(() => {
    return () => {
      closePopup();
    };
  }, []);

  return (
    <div className={s.popupCreatePost} onMouseDown={closePopup}>
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
          <div className={s.popupContentHeaderTitle}>{props.button} post</div>

          <div className={s.popupContentHeaderOff} onClick={closePopup}></div>
        </div>
        <div className={s.popupContentBodyAuthor}>
          <div className={s.popupContentBodyAuthorAvatarBlock}>
            <img
              className={s.popupContentBodyAuthorAvatar}
              src={
                props.profile.avatar
                  ? props.profile.avatar
                  : res["defaultAvatr"]
              }
              alt="avatar"
            />
          </div>
          <div className={s.popupContentBodyAuthorNameAndHashtag}>
            <div className={s.popupContentBodyAuthorName}>
              {props.profile.login}
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
        <div className={s.popupContentBodyImages}>
          <div className={s.popupContentBody}>
            <textarea
              value={valuePostText}
              id="textarea"
              placeholder="What's on your mind?"
              className={s.popupContentBodyTextarea}
              maxLength="2000"
              onChange={handleChangePostText}
            >
              <span></span>
            </textarea>
          </div>
          <div
            className={
              s.popupPostImages +
              " " +
              (valuePostImages ? s.popupPostImagesActive : "")
            }
          >
            <div className={s.imagesListItems} id="imagesListItems">
              {valuePostImages &&
                valuePostImages.map((img, index) =>
                  uploadedTheFile ? (
                    <div className={s.imagesItem}>
                      <img
                        id={"img-" + index}
                        src="Gallery"
                        alt="images post"
                      />
                      <div
                        className={s.closeImagesItemBlock}
                        onClick={() => {
                          setValuePostImages(
                            valuePostImages.filter(
                              (file) => file.name !== img.name
                            )
                          );
                        }}
                      >
                        <div className={s.closeImagesItem}></div>
                      </div>
                    </div>
                  ) : (
                    <div className={s.imagesItem}>
                      <img src={img} alt="images post" />
                      <div
                        className={s.closeImagesItemBlock}
                        onClick={() => {
                          setValuePostImages(
                            valuePostImages.filter((file) => file !== img)
                          );
                        }}
                      >
                        <div className={s.closeImagesItem}></div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>

        <input
          type="file"
          multiple
          id="input__images"
          maxLength="2"
          onChange={uploadAPhoto}
        />
        <label
          htmlFor="input__images"
          className={s.popupContentAddToYourPostBlock}
        >
          <span className={s.popupContentAddToYourPost}>Add to your post</span>
          <img
            className={s.popupContentAddToYourPostGallery}
            src={res["gallery"]}
            alt="gallery icon"
          />
        </label>
        <div
          onClick={valuePostTitle !== "" && submitPost}
          className={
            s.popupContentAddPost +
            " " +
            (valuePostTitle !== "" && s.popupContentAddPostSubmit)
          }
        >
          <span>{props.button}</span>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    theme: getTheme(state),
    // profile: getProfileInfo(state),
  };
};

export default compose(connect(mapStateToProps, {}))(PostForm);
