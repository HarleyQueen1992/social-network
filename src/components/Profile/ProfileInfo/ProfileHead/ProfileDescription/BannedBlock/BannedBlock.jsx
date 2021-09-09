import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

//? Selectors imports
import { getTheme } from "../../../../../../redux/AppReducer/app-selectors";
import { getProfileInfo } from "../../../../../../redux/AuthReducer/auth-selectors";
import { getProfile } from "../../../../../../redux/ProfileReducer/profile-selectors";

//? Reducer imports
import {
  blockUser,
  unblockUser,
} from "./../../../../../../redux/ProfileReducer/profile-reducer";

//? Css
import s from "./BannedBlock.module.css";

const BannedBlock = (props) => {
  return !props.profile.isAdmin && props.profileInfo.isAdmin ? (
    !props.profile.isBanned ? (
      <div
        className={s.banBlock}
        onClick={() => {
          document.querySelector(
            ".react-swipeable-view-container"
          ).style.cssText =
            "transform: translate(50) !important;" +
            "will-change: auto !important;";
          document.querySelector("body").style.cssText = "overflow: hidden;";
          props.setIsBlockUser(true);
        }}
      >
        <span className={s.ban}>Block</span>
      </div>
    ) : (
      <div
        className={s.unbanBlock}
        onClick={() => {
          props.unblockUser(props.profile.login);
        }}
      >
        <span className={s.ban}>Unblock</span>
      </div>
    )
  ) : !props.profile.isAdmin && !props.profileInfo.isAdmin ? (
    props.profile.isBanned ? (
      <div className={s.bannedBlock}>
        <div className={s.banned}>Banned</div>
      </div>
    ) : (
      ""
    )
  ) : (
    ""
  );
};

const mapStateToProps = (state) => ({
  theme: getTheme(state),
  profile: getProfile(state),
  profileInfo: getProfileInfo(state),
});

export default compose(connect(mapStateToProps, { unblockUser, blockUser }))(
  BannedBlock
);
