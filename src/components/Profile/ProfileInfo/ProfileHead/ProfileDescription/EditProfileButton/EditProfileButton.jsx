import React from "react";

//? Css
import s from "./EditProfileButton.module.css";

const EditProfileButton = (props) => {
  return (
    <div onClick={props.openPopup} className={s.editProfileBlock}>
      <img
        className={s.editProfileImg}
        src={props.editImg}
        alt="edit profile"
      />
      <div className={s.editProfile}>Edit profile</div>
    </div>
  );
};

export default EditProfileButton;
