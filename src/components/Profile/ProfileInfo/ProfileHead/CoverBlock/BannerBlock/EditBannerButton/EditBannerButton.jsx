import React from "react";

//? Css
import s from "./EditBannerButton.module.css";

const EditBannerButton = (props) => {
  const selectionBanner = (e) => {
    if (e.target.files.length) {
      props.setProfileBanner(e.target.files[0]);
    }
  };

  return (
    <div>
      <input
        onChange={selectionBanner}
        type="file"
        id="banner"
        className={s.inputFile}
      />
      {props.isOwner && (
        <label className={s.editBannerBlock} htmlFor="banner">
          <div className={s.editBanner}>
            <img
              className={s.editBannerImg}
              src={props.res["cameraBlack"]}
              alt="camera"
            />
            <span className={s.editBannerTitle}>Edit photo cover</span>
          </div>
        </label>
      )}
    </div>
  );
};

export default EditBannerButton;
