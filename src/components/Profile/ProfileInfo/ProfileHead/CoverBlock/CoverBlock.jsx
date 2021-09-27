import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

//? Components
import BannerBlock from "./BannerBlock/BannerBlock";
//? Reducer imports
import {
  setProfileBanner,
  savePhoto,
} from "../../../../../redux/ProfileReducer/profile-reducer";

//? Selectors imports
import { getTheme } from "../../../../../redux/AppReducer/app-selectors";
import { getProfile } from "../../../../../redux/ProfileReducer/profile-selectors";

//? Utils
import { Icons } from "../../../../../utils/Icons/Icons";

//? Css
import s from "./CoverBlock.module.css";

const CoverBlock = (props) => {
  let res = Icons(props.theme);

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  return (
    <div className={s.coverBlock}>
      <BannerBlock
        setProfileBanner={props.setProfileBanner}
        profile={props.profile}
        res={res}
        isOwner={props.isOwner}
      />

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
)(CoverBlock);
