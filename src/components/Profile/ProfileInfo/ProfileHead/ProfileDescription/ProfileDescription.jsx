import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

// Selectors imports
import {
  getIsFollowed,
  getProfile,
} from "../../../../../redux/ProfileReducer/profile-selectors";
import { getTheme } from "../../../../../redux/AppReducer/app-selectors";
import { getProfileInfo } from "../../../../../redux/AuthReducer/auth-selectors";

// Reducer imports
import {
  subscribe,
  unsubscribe,
  blockUser,
  unblockUser,
} from "./../../../../../redux/ProfileReducer/profile-reducer";

// utils
import { Icons } from "./../../../../../utils/Icons/Icons";

// Css
import s from "./ProfileDescription.module.css";
import BannedBlock from "./BannedBlock/BannedBlock";
import FollowedBlock from "./FollowedBlock/FollowedBlock";

const ProfileDescription = (props) => {
  let res = Icons(props.theme);
  return (
    <div className={s.profileDescription}>
      <div className={s.publicationsBlock}>
        <div className={s.publications}>Publications</div>
      </div>
      {props.isOwner ? (
        <div onClick={props.openPoupup} className={s.editProfileBlock}>
          <img
            className={s.editProfileImg}
            src={res["edit"]}
            alt="edit profile"
          />
          <div className={s.editProfile}>Edit profile</div>
        </div>
      ) : (
        <div
          className={
            s.subscribeUnsubscribeBlock +
            " " +
            (props.profile.isBanned & !props.profileInfo.isAdmin ||
            props.profileInfo.isAdmin & !props.profile.isAdmin
              ? s.subscribeUnsubscribeBlockAndBan
              : "")
          }
        >
          <BannedBlock setIsBlockUser={props.setIsBlockUser} />
          <FollowedBlock />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  theme: getTheme(state),
  profile: getProfile(state),
  profileInfo: getProfileInfo(state),
  isFollowed: getIsFollowed(state),
});

export default compose(
  connect(mapStateToProps, { subscribe, unsubscribe, blockUser, unblockUser }),
  withRouter
)(ProfileDescription);
