import React, { useEffect, useState } from "react";
import s from "./CreatePost.module.css";
import Gallery from "./../../../../../assets/images/gallery.png";
import User from "./../../../../../assets/images/user.png";

const CreatePost = (props) => {
  const [isWriteHashTag, setIsWriteHashTag] = useState(false);
  const [valuePostText, setValuePostText] = useState(props.valueText);
  const [valuePostImages, setValuePostImages] = useState(props.valueImages);
  const [uploadedTheFile, setUploadedTheFile] = useState(false);
  const [valuePostTitle, setValuePostTitle] = useState(props.valueTitle);
  const [valueHashTag, setValueHashTag] = useState("");
  const [uploadImages, setUploadImages] = useState(true);
  // debugger;
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
    if (props.updatePost) {
      props.createPost(
        valuePostTitle,
        valuePostText,
        typeof valuePostImages[0] !== "string" && valuePostImages,
        props.postId
      );
    } else {
      props.createPost(valuePostTitle, valuePostText, valuePostImages);
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
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(files[i]);
    }
    setValuePostImages(arr);
  };
  const handleChangePostTitle = (event) => {
    setValuePostTitle(event.target.value);
  };
  useEffect(() => {
    var tx = document.getElementById("textarea");
    let height = tx.style.height;
    let heightNumber = Number(height.substring(0, height.length - 2));
    let length = valuePostText.length;

    // if (heightNumber > 200) {
    //   tx.setAttribute("style", "height: 200px;" + "font-size:16px;");
    // } else {
    if (valuePostText.length > 100) {
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
      // this.style.height = this.scrollHeight + "px";
    }
  }, [valuePostText]);

  useEffect(() => {
    if (!props.updatePost || uploadedTheFile) {
      valuePostImages.forEach((img, index) => {
        var preview = document.getElementById("img-" + index);
        let first = document.getElementById("imagesListItems").childNodes;
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

  // if (!upload) {
  //   debugger;
  //   document.getElementById("imagesListItems").style.cssText =
  //     "display: grid;";
  // }

  // useEffect(() => {
  //   if (window.innerWidth > 500) {
  //     var tx = document.getElementById("textareaTitle");
  //     let height = tx.style.height;
  //     let heightNumber = Number(height.substring(0, height.length - 2));
  //     if (heightNumber > 60) {
  //       tx.setAttribute("style", "height: 60px;" + "overflow-y:scroll;");
  //     } else {
  //       tx.setAttribute(
  //         "style",
  //         "height:" + tx.scrollHeight + "px;overflow-y:hidden;"
  //       );
  //       tx.addEventListener("input", OnInput, false);

  //       function OnInput(e) {
  //         this.style.height = "auto";
  //         this.style.height = this.scrollHeight + "px";
  //       }
  //     }
  //   }
  // }, [valuePostTitle]);
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
          {props.button == "Update" ? (
            <div className={s.popupContentHeaderTitle}>Update post</div>
          ) : (
            <div className={s.popupContentHeaderTitle}>Create post</div>
          )}

          <div className={s.popupContentHeaderOff} onClick={closePopup}></div>
        </div>
        <div className={s.popupContentBodyAuthor}>
          <div className={s.popupContentBodyAuthorAvatarBlock}>
            <img
              className={s.popupContentBodyAuthorAvatar}
              src={props.profile.avatar ? props.profile.avatar : User}
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
                valuePostImages.map((img, index) => (
                  <div className={s.imagesItem}>
                    {/* <span>123123</span> */}
                    <img id={"img-" + index} src="Gallery" alt="images post" />
                    <div
                      className={s.closeImagesItemBlock}
                      onClick={() => {
                        let images = valuePostImages.filter(
                          (file) => file.name !== img
                        );
                        // debugger;
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
                ))}
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
            src={Gallery}
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
export default CreatePost;
