import React from "react";

//? Css
import s from "./ProfileNameAndCheckMark.module.css";

const ProfileNameAndCheckMark = (props) => {
  return (
    <div
      className={
        s.profileNameAndCheckMark +
        " " +
        (props.profile.isAdmin && s.profileNameAndCheckMarkIsAdmin)
      }
    >
      <span>{props.profile.fullname}</span>
      <div
        className={
          s.checkMarkBlock +
          " " +
          (props.profile.isAdmin && s.checkMarkBlockActive)
        }
      >
        <img src={props.res["checkMark"]} alt="checkMark" />
      </div>
    </div>
  );
};

export default ProfileNameAndCheckMark;
