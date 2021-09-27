import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

//? Reducer import
import {
  savePhoto,
  setProfileBanner,
  updateStatus,
  blockUser,
} from "./../../../../redux/ProfileReducer/profile-reducer";

//? Selectors import
import { getTheme } from "../../../../redux/AppReducer/app-selectors";
import {
  getIsFollowed,
  getProfile,
} from "../../../../redux/ProfileReducer/profile-selectors";
import { getProfileInfo } from "../../../../redux/AuthReducer/auth-selectors";

//? Components
import BlockUser from "./../BlockUser/BlockUser";
import CoverBlock from "./CoverBlock/CoverBlock";
import ProfileNameAndStatus from "./ProfileNameAndStatus/ProfileNameAndStatus";
import ProfileDescription from "./ProfileDescription/ProfileDescription";

//? Css
import s from "./ProfileHead.module.css";

const ProfileHead = (props) => {
  let [isBlockUser, setIsBlockUser] = useState(false);

  return (
    <div>
      {isBlockUser && (
        <BlockUser
          profile={props.profile}
          blockUser={props.blockUser}
          setIsBlockUser={setIsBlockUser}
        />
      )}
      <div className={s.profileHead}>
        <CoverBlock isOwner={props.isOwner} />
        <ProfileNameAndStatus isOwner={props.isOwner} />
        <ProfileDescription
          isBlockUser={isBlockUser}
          setIsBlockUser={setIsBlockUser}
          isOwner={props.isOwner}
          openPoupup={props.openPoupup}
        />
      </div>
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
    savePhoto,
    setProfileBanner,
    updateStatus,
    blockUser,
  }),
  withRouter
)(ProfileHead);
