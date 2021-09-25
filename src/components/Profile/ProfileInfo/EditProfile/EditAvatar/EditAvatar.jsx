import React from "react";

//? Utils
import { Icons } from "./../../../../../utils/Icons/Icons";

//? Css
import s from "./EditAvatar.module.css";

const EditAvatar = (props) => {
  let res = Icons(props.theme);
  return (
    <div className={s.photoProfile}>
      <div className={s.avatar}>
        <img
          src={
            props.profile.avatar == ""
              ? res["defaultAvatr"]
              : props.profile.avatar
          }
          alt="profile photo"
        />
      </div>
    </div>
  );
};
export default EditAvatar;
