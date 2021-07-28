import React, { useState, useEffect } from "react";
import s from "./EditProfile.module.css";
import PhotoProfile from "./../../../../assets/images/user.png";
import BirthdayWhite from "./../../../../assets/images/birthdayWhite.png";
import CityWhite from "./../../../../assets/images/cityWhite.png";
import Cover from "./../../../../assets/images/356200_h1ec7Aokt5_1.jpg";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  setProfileBanner,
  updateProfileInfo,
  updateAboutMe,
} from "./../../../../redux/ProfileReducer/profile-reducer";
import { getProfile } from "../../../../redux/ProfileReducer/profile-selectors";
import { savePhoto } from "./../../../../redux/SettingsReducer/settings-reducer";
import { getEditMode } from "./../../../../redux/AppReducer/app-selectors";
import { setEditMode } from "./../../../../redux/AppReducer/app-reducer";
import { withRouter } from "react-router-dom";
let month = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};
const EditProfile = (props) => {
  let birthdayMonth = props.profile.birthday.replace(/^.{5}/, "");
  birthdayMonth = birthdayMonth.replace(/.{3}$/, "");

  const [editTellusMoreAboutYourself, setEditTellusMoreAboutYourself] =
    useState(false);
  // const [disable, setDisable] = useState();
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [valueAboutMe, setValueAboutMe] = useState(props.profile.aboutMe);
  const [valueBirthday, setValueBirthday] = useState(props.profile.birthday);
  const [valueLocation, setValueLocation] = useState(props.profile.location);
  let disable = valueAboutMe.length < 70;

  const cancelEditAboutMe = () => {
    setEditAboutMe(false);
    setValueAboutMe(props.profile.aboutMe);
  };

  const handleChangeBirthday = (event) => {
    setValueBirthday(event.target.value);
  };
  const handleChangeAboutMe = (event) => {
    setValueAboutMe(event.target.value);
  };

  const handleChangeLocation = (event) => {
    setValueLocation(event.target.value);
  };

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  const onMainBannerSelected = (e) => {
    if (e.target.files.length) {
      props.setProfileBanner(e.target.files[0]);
    }
  };
  useEffect(() => {
    disable = valueAboutMe.length <= 70;
  }, [valueAboutMe]);

  document.onclick = function (e) {
    if (e.target.className !== "") {
      if (
        e.target.className
          .replace(/[^a-zA-Z ]/g, " ")
          .split(/\s+|\./)
          .filter(
            (word) =>
              (word === "EditProfile") |
              (word === "editProfileImg") |
              (word === "editProfile") |
              (word === "editProfileBlock")
          ).length == 0
      ) {
        props.setEditMode(false);
      }
    }
  };
  return (
    <div className={s.editProfileMenu}>
      <div className={s.editProfileTitleBlock}>
        <span className={s.editProfileTitle}>Edit profile</span>
        <div
          onClick={() => {
            props.setEditMode(false);
          }}
          className={s.backBlock}
        ></div>
      </div>
      <div className={s.editPhotoProfileBlock}>
        <div className={s.editPhotoProfile}>
          <div className={s.editPhotoTitle}>Avatar</div>
          <input
            onChange={onMainPhotoSelected}
            type="file"
            id="input__file__ava"
          />
          <label className={s.editPhoto} htmlFor="input__file__ava">
            <span className={s.edit}>Edit</span>
          </label>
        </div>
        <div className={s.photoProfile}>
          <div className={s.avatar}>
            <img
              src={
                props.profile.avatar == "" ? PhotoProfile : props.profile.avatar
              }
              alt="profile photo"
            />
          </div>
        </div>
      </div>
      <div className={s.editPhotoProfileBlock}>
        <div className={s.editPhotoProfile}>
          <div className={s.editPhotoTitle}>Cover photo</div>

          <input
            onChange={onMainBannerSelected}
            type="file"
            id="input__file__banner"
          />
          <label className={s.editPhoto} htmlFor="input__file__banner">
            <span className={s.edit}>Edit</span>
          </label>
        </div>
        <div className={s.CoverPhotoProfile}>
          <div className={s.banner}>
            <img src={props.profile.banner} alt="profile photo" />
          </div>
        </div>
      </div>
      <div
        className={
          s.editAboutMeBlock +
          " " +
          (editAboutMe ? s.editAboutMeBlockActive : " ")
        }
      >
        <div className={s.editAboutMeProfile}>
          <div className={s.editAboutMeTitle}>About me</div>
          <div
            onClick={() => {
              setEditAboutMe(!editAboutMe);
              {
                editAboutMe && props.updateAboutMe(valueAboutMe);
              }
            }}
            className={
              s.addToAboutMe + " " + (disable ? s.addToAboutMeDisable : "")
            }
          >
            {editAboutMe ? (
              <span className={s.edit}>Save</span>
            ) : (
              <span className={s.edit}>Add to</span>
            )}
          </div>
        </div>
        {editAboutMe ? (
          <textarea
            value={valueAboutMe}
            onChange={handleChangeAboutMe}
            className={s.aboutMeTextarea}
            minLength="70"
            maxLength="400"
          ></textarea>
        ) : (
          <div className={s.aboutMeText}>
            {props.profile.aboutMe == "" ? (
              <span>Tell about yourself...</span>
            ) : (
              <span>{props.profile.aboutMe}</span>
            )}
          </div>
        )}
        {editAboutMe && (
          <div className={s.charactersRemaining}>
            {valueAboutMe.length < 70 ? (
              <span className={s.moreCharacters}>
                {70 - valueAboutMe.length} more characters
              </span>
            ) : (
              <span>Remaining {400 - valueAboutMe.length} characters</span>
            )}
            <div onClick={cancelEditAboutMe} className={s.cancelAboutMeButton}>
              {" "}
              <span className={s.cancelAboutMe}>Cancel</span>{" "}
            </div>
          </div>
        )}
      </div>
      <div className={s.editTellUsMoreAboutYourselfBlock}>
        <div className={s.editTellUsMoreAboutYourselfAndEdit}>
          <div className={s.TellUsMoreAboutYourself}>
            Tell us more about yourself
          </div>
          <div
            onClick={() => {
              setEditTellusMoreAboutYourself(!editTellusMoreAboutYourself);
              {
                editTellusMoreAboutYourself &&
                  props.updateProfileInfo(valueBirthday, valueLocation);
              }
            }}
            className={s.editInfo}
          >
            {editTellusMoreAboutYourself ? (
              <span className={s.edit}>Save</span>
            ) : (
              <span className={s.edit}>Edit</span>
            )}
          </div>
        </div>
        <div className={s.moreAboutMyself}>
          <div className={s.birthdayBlock}>
            <img className={s.birthdayImg} src={BirthdayWhite} alt="birthday" />
            <span className={s.birthdayTitleAndText}>
              <div className={s.birthdayTitle}>Birthday</div>
              {editTellusMoreAboutYourself ? (
                <span className={s.birthdayEditBlock}>
                  <input
                    value={valueBirthday}
                    onChange={handleChangeBirthday}
                    className={s.editBirthday}
                    type="date"
                  />
                </span>
              ) : (
                <span className={s.birthday}>
                  {month[birthdayMonth]}{" "}
                  {props.profile.birthday.replace(/^.{8}/, "")}
                </span>
              )}
            </span>
          </div>
          <div className={s.locationBlock}>
            <img className={s.cityImg} src={CityWhite} alt="location" />
            <span className={s.locationTitleAndText}>
              <div className={s.locationTitle}>Location</div>
              {editTellusMoreAboutYourself ? (
                <span className={s.locationEditBlock}>
                  <input
                    value={valueLocation}
                    onChange={handleChangeLocation}
                    className={s.editLocation}
                    type="text"
                  />
                </span>
              ) : (
                <span className={s.location}>{props.profile.location}</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    profile: getProfile(state),
    editMode: getEditMode(state),
  };
};
export default compose(
  connect(mapStateToProps, {
    setEditMode,
    savePhoto,
    setProfileBanner,
    updateProfileInfo,
    updateAboutMe,
  }),
  withRouter
)(EditProfile);
