import React from "react";

//? Css
import s from "./EditAvatarButton.module.css";

const EditAvatarButton = (props) => {
  const selectedAvatar = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      <input onChange={selectedAvatar} type="file" id="input__file" />
      {props.isOwner && (
        <label className={s.changeLabel} htmlFor="input__file">
          <div className={s.editAvatarBlock}>
            <img
              className={s.editAvatarCamera}
              src={props.res["cameraWhite"]}
              alt="camera"
            />
          </div>
        </label>
      )}
    </div>
  );
};

export default EditAvatarButton;
