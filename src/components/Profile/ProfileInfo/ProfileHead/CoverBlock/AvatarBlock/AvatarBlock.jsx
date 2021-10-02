import React from "react";

//? Components
import EditAvatarButton from "./EditAvatarButton/EditAvatarButton";

//? Css
import s from "./AvatarBlock.module.css";

const AvatarBlock = (props) => {
  return (
    <div className={s.avatarBlock}>
      <EditAvatarButton
        res={props.res}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
      />
      <div className={s.avatarSubblock}>
        <img
          className={s.avatar}
          src={
            props.profile.avatar == ""
              ? props.res["defaultAvatr"]
              : props.profile.avatar
          }
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default AvatarBlock;
