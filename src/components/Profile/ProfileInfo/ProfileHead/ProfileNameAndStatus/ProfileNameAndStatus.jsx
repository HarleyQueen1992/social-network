import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

//? Reducer
import { updateStatus } from "./../../../../../redux/ProfileReducer/profile-reducer";

//? Selectors
import { getTheme } from "../../../../../redux/AppReducer/app-selectors";
import { getProfile } from "../../../../../redux/ProfileReducer/profile-selectors";

//? utils
import { Icons } from "./../../../../../utils/Icons/Icons";

//? Css
import s from "./ProfileNameAndStatus.module.css";
import ProfileNameAndCheckMark from "./ProfileNameAndCheckMark/ProfileNameAndCheckMark";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

//? Компонент который содержит 2 строки первая fullName а вторая status и его изменение.
const ProfileNameAndStatus = (props) => {
  let res = Icons(props.theme);

  return (
    <div className={s.profileNameAndStatus}>
      <ProfileNameAndCheckMark profile={props.profile} res={res} />
      <ProfileStatus
        updateStatus={props.updateStatus}
        profile={props.profile}
        isOwner={props.isOwner}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  theme: getTheme(state),
  profile: getProfile(state),
});

export default compose(
  connect(mapStateToProps, {
    updateStatus,
  }),
  withRouter
)(ProfileNameAndStatus);
