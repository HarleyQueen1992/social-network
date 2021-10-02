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
import AvatarBlock from "./AvatarBlock/AvatarBlock";

const CoverBlock = (props) => {
  let res = Icons(props.theme);

  return (
    <div className={s.coverBlock}>
      <BannerBlock
        setProfileBanner={props.setProfileBanner}
        profile={props.profile}
        res={res}
        isOwner={props.isOwner}
      />

      <AvatarBlock
        savePhoto={props.savePhoto}
        profile={props.profile}
        res={res}
        isOwner={props.isOwner}
      />
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
