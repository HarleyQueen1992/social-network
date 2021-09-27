import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

//? Selectors imports
import {
  getIsFollowed,
  getProfile,
} from "../../../../../redux/ProfileReducer/profile-selectors";
import { getTheme } from "../../../../../redux/AppReducer/app-selectors";
import { getProfileInfo } from "../../../../../redux/AuthReducer/auth-selectors";

//? Components
import BannedBlock from "./BannedBlock/BannedBlock";
import FollowedBlock from "./FollowedBlock/FollowedBlock";
import EditProfileButton from "./EditProfileButton/EditProfileButton";

//? Reducer imports
import {
  subscribe,
  unsubscribe,
  blockUser,
  unblockUser,
} from "./../../../../../redux/ProfileReducer/profile-reducer";
import { setEditProfile } from "./../../../../../redux/AppReducer/app-reducer";

//? Utils
import { Icons } from "./../../../../../utils/Icons/Icons";

//? Css
import s from "./ProfileDescription.module.css";

const ProfileDescription = (props) => {
  let res = Icons(props.theme);

  const openPopup = () => {
    document.querySelector("body").style.cssText = "overflow: hidden;";
    props.setEditProfile(true);
  };

  return (
    <div className={s.descriptionProfile}>
      <div className={s.publicationsBlock}>
        <div className={s.publications}>Publications</div>
      </div>
      {props.isOwner ? (
        <EditProfileButton openPopup={openPopup} editImg={res["edit"]} />
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
  connect(mapStateToProps, {
    subscribe,
    unsubscribe,
    blockUser,
    unblockUser,
    setEditProfile,
  }),
  withRouter
)(ProfileDescription);
