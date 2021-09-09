import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

//? Reducer imports
import {
  setProfileBanner,
  savePhoto,
} from "./../../../.../../../../redux/ProfileReducer/profile-reducer";

//? Selectors imports
import { getTheme } from "../../../../../redux/AppReducer/app-selectors";
import { getProfile } from "../../../../../redux/ProfileReducer/profile-selectors";

//? Utils
import { Icons } from "./../../../../../utils/Icons/Icons";

//? Css
import s from "./BannerBlock.module.css";

const BannerBlock = (props) => {
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  const onMainBannerSelected = (e) => {
    if (e.target.files.length) {
      props.setProfileBanner(e.target.files[0]);
    }
  };
  let res = Icons(props.theme);
  return (
    <div className={s.bannerBlock}>
      <div className={s.bannerPhoto}>
        <input
          onChange={onMainBannerSelected}
          type="file"
          id="banner"
          className={s.inputFile}
        />
        {props.isOwner && (
          <label className={s.editBannerBlock} htmlFor="banner">
            <div className={s.editPhotoBannerBlock}>
              <img
                className={s.editBannerImg}
                src={res["cameraBlack"]}
                alt="camera"
              />
              <span className={s.editBannerTitle}>Edit photo cover</span>
            </div>
          </label>
        )}
        <img
          className={s.banner}
          src={
            props.profile.banner == ""
              ? res["bannerDefault"]
              : props.profile.banner
          }
          alt="Cover"
        />
      </div>

      <div className={s.avatarBlock}>
        <input onChange={onMainPhotoSelected} type="file" id="input__file" />
        {props.isOwner && (
          <label className={s.changeLabel} htmlFor="input__file">
            <div className={s.editAvatarBlock}>
              <img
                className={s.editAvatarCamera}
                src={res["cameraWhite"]}
                alt="camera"
              />
            </div>
          </label>
        )}
        <div className={s.avatarSubblock}>
          <img
            className={s.avatar}
            src={
              props.profile.avatar == ""
                ? res["defaultAvatr"]
                : props.profile.avatar
            }
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    theme: getTheme(state),
    profile: getProfile(state),
  };
};
export default compose(
  connect(mapStateToProps, { setProfileBanner, savePhoto })
)(BannerBlock);
