import React, { useState, useEffect } from "react";

// Components
import EditProfile from "./../EditProfile/EditProfile";
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

  let [editMode, setEditMode] = useState(false);
  const [editTellusMoreAboutYourself, setEditTellusMoreAboutYourself] =
    useState(false);
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [editFullName, setEditFullName] = useState(false);
  const [valueFullName, setValueFullName] = useState(props.profile.fullname);
  const [valueAboutMe, setValueAboutMe] = useState(props.profile.aboutMe);
  const [valueBirthday, setValueBirthday] = useState(props.profile.birthday);
  const [valueLocation, setValueLocation] = useState(props.profile.location);

  let openPoupup = (e) => {
    e.preventDefault();
    document.querySelector(".react-swipeable-view-container").style.cssText =
      "transform: translate(50) !important;" + "will-change: auto !important;";
    document.querySelector("body").style.cssText = "overflow: hidden;";

    setEditMode(!editMode);
  };
  let closePopup = (e) => {
    setEditTellusMoreAboutYourself(false);
    setEditAboutMe(false);
    setEditFullName(false);
    setValueFullName(props.profile.fullname);
    setValueAboutMe(props.profile.aboutMe);
    setValueBirthday(props.profile.birthday);
    setValueLocation(props.profile.location);
    document.querySelector(".react-swipeable-view-container").style.cssText =
      "will-change: transform; !important" +
      "flex-direction: row;" +
      "transition: all 0s ease 0s;" +
      "direction: ltr;" +
      "display: flex;" +
      "transform: translate(-100%, 0px);";
    document.querySelector("body").style.cssText = "overflow: scroll;";
    setEditMode(false);
  };

  return (
    <div className={s.profilePage}>
      {editMode && (
        <EditProfile
          editAboutMe={editAboutMe}
          setEditAboutMe={setEditAboutMe}
          editTellusMoreAboutYourself={editTellusMoreAboutYourself}
          setEditTellusMoreAboutYourself={setEditTellusMoreAboutYourself}
          editFullName={editFullName}
          setEditFullName={setEditFullName}
          valueFullName={valueFullName}
          setValueFullName={setValueFullName}
          valueAboutMe={valueAboutMe}
          setValueAboutMe={setValueAboutMe}
          valueBirthday={valueBirthday}
          setValueBirthday={setValueBirthday}
          valueLocation={valueLocation}
          setValueLocation={setValueLocation}
          closePopup={closePopup}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}

      <ProfileHead openPoupup={openPoupup} isOwner={props.isOwner} />
      <ProfileBody isOwner={props.isOwner} editMode={editMode} />
    </div>
  );
};

export default ProfileInfo;
