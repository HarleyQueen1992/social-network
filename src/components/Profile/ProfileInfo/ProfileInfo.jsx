import React, { useEffect } from "react";

// Components
import EditProfile from "./EditProfile/EditProfile";
import ProfileHead from "./ProfileHead/ProfileHead";
import ProfileBody from "./ProfileBody/ProfileBody";

// Css
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  let updateWindowDimensions = () => {
    if (window.innerWidth > 900) {
      document.getElementById("appWraperContent").firstChild.style.cssText =
        "overflow-x: inherit;";
    } else {
      document.getElementById("appWraperContent").firstChild.style.cssText =
        "overflow-x: hidden;";
    }
  };
  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <div className={s.profilePage}>
      <ProfileHead isOwner={props.isOwner} />
      <ProfileBody isOwner={props.isOwner} />
    </div>
  );
};

export default ProfileInfo;
