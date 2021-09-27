import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

//? Reducer
import {
  setProfileBanner,
  updateProfileInfo,
  updateAboutMe,
  updateFullName,
  savePhoto,
} from "../../../../redux/ProfileReducer/profile-reducer";

import { setEditProfile } from "./../../../../redux/AppReducer/app-reducer";

//? Selectors
import {
  getTheme,
  getEditProfile,
} from "./../../../../redux/AppReducer/app-selectors";
import { getProfile } from "../../../../redux/ProfileReducer/profile-selectors";

//? Edit Components
import EditProfileForm from "./EditProfileForm/EditProfileForm";
import EditBanner from "./EditBanner/EditBanner";
import EditFullName from "./EditFullName/EditFullName";
import EditAboutMe from "./EditAboutMe/EditAboutMe";
import EditAvatar from "./EditAvatar/EditAvatar";
import MoreAboutYourSelf from "./MoreAboutYourSelf/MoreAboutYourSelf";

//? Css
import s from "./EditProfile.module.css";

const EditProfile = (props) => {
  const [editTellusMoreAboutYourself, setEditTellusMoreAboutYourself] =
    useState(false);
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [editFullName, setEditFullName] = useState(false);
  const [valueFullName, setValueFullName] = useState(props.profile.fullname);
  const [valueAboutMe, setValueAboutMe] = useState(props.profile.aboutMe);
  const [valueBirthday, setValueBirthday] = useState(props.profile.birthday);
  const [valueLocation, setValueLocation] = useState(props.profile.location);

  const closePopup = () => {
    document.querySelector("body").style.cssText = "overflow: scroll;";
    props.setEditProfile(false);
  };

  useEffect(() => {
    return () => {
      document.querySelector("body").style.cssText = "overflow: scroll;";
      props.setEditProfile(false);
      console.log("exit");
    };
  }, []);

  return (
    <div onMouseDown={closePopup} className={s.popupEditProfile}>
      <div
        className={s.editProfileBlock}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={s.editProfileTitleBlock}>
          <span className={s.editProfileTitle}>Edit profile</span>
          <div
            className={s.closePopupEditProfile}
            onClick={closePopup}
            id="backBlock"
          ></div>
        </div>

        <EditProfileForm
          edit={editFullName}
          setEdit={setEditFullName}
          value={valueFullName}
          save={props.updateFullName}
          title={"Full name"}
        >
          <EditFullName
            editFullName={editFullName}
            valueFullName={valueFullName}
            setValueFullName={setValueFullName}
            profile={props.profile}
          />
        </EditProfileForm>

        <EditProfileForm save={props.savePhoto} type="file" title={"Avatar"}>
          <EditAvatar theme={props.theme} profile={props.profile} />
        </EditProfileForm>

        <EditProfileForm
          save={props.setProfileBanner}
          type="file"
          title={"Banner"}
        >
          <EditBanner theme={props.theme} profile={props.profile} />
        </EditProfileForm>

        <EditProfileForm
          edit={editAboutMe}
          setEdit={setEditAboutMe}
          value={valueAboutMe}
          save={props.updateAboutMe}
          title={"About me"}
        >
          <EditAboutMe
            editAboutMe={editAboutMe}
            valueAboutMe={valueAboutMe}
            setValueAboutMe={setValueAboutMe}
            setEditAboutMe={setEditAboutMe}
            profile={props.profile}
          />
        </EditProfileForm>

        <EditProfileForm
          edit={editTellusMoreAboutYourself}
          setEdit={setEditTellusMoreAboutYourself}
          save={props.updateProfileInfo}
          value={valueBirthday}
          value2={valueLocation}
          title={"Tell us More About Your self"}
        >
          <MoreAboutYourSelf
            editTellusMoreAboutYourself={editTellusMoreAboutYourself}
            valueBirthday={valueBirthday}
            theme={props.theme}
            setValueBirthday={setValueBirthday}
            setValueLocation={setValueLocation}
            valueLocation={valueLocation}
            profile={props.profile}
          />
        </EditProfileForm>
      </div>
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    theme: getTheme(state),
    profile: getProfile(state),
    editProfile: getEditProfile(state),
  };
};
export default compose(
  connect(mapStateToProps, {
    savePhoto,
    setProfileBanner,
    updateProfileInfo,
    updateAboutMe,
    updateFullName,
    setEditProfile,
  }),
  withRouter
)(EditProfile);
