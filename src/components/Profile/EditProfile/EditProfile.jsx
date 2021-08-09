import React, { useState, useEffect } from "react";
import s from "./EditProfile.module.css";
import PhotoProfile from "./../../../assets/images/user.png";
import BirthdayWhite from "./../../../assets/images/birthdayWhite.png";
import CityWhite from "./../../../assets/images/cityWhite.png";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  setProfileBanner,
  updateProfileInfo,
  updateAboutMe,
  updateFullName,
} from "./../../../redux/ProfileReducer/profile-reducer";
import { savePhoto } from "./../../../redux/SettingsReducer/settings-reducer";
import { withRouter } from "react-router-dom";
import { Icons } from "./../../../utils/Icons/Icons";
import { getTheme } from "../../../redux/AppReducer/app-selectors";

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
  // window.scroll(0, 0);
  let res = Icons(props.theme);
  let birthdayMonth = props.profile.birthday.replace(/^.{5}/, "");
  birthdayMonth = birthdayMonth.replace(/.{3}$/, "");

  let disable = props.valueAboutMe.length < 70;

  const cancelEditAboutMe = () => {
    props.setValueAboutMe(props.profile.aboutMe);
    props.setEditAboutMe(false);
  };
  const handleChangeFullName = (event) => {
    props.setValueFullName(event.target.value);
  };

  const handleChangeBirthday = (event) => {
    props.setValueBirthday(event.target.value);
  };
  const handleChangeAboutMe = (event) => {
    props.setValueAboutMe(event.target.value);
  };

  const handleChangeLocation = (event) => {
    props.setValueLocation(event.target.value);
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
    disable = props.valueAboutMe.length <= 70;
  }, [props.valueAboutMe]);
  useEffect(() => () => console.log("unmount"), []);
  return (
    props.editMode && (
      <div
        className={s.editProfileMenu}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={s.editProfileTitleBlock}>
          <span className={s.editProfileTitle}>Edit profile</span>
          <div
            className={s.popupContentHeaderOff}
            onClick={props.closePopup}
            id="backBlock"
          ></div>
        </div>
        <div className={s.editProfileFullNameBlock}>
          <div className={s.editProfileFullNameTitleBlock}>
            <div className={s.editProfileFullNameTitle}>Fullname</div>
            <div
              onClick={() => {
                props.setEditFullName(!props.editFullName);
                {
                  props.editFullName &&
                    props.updateFullName(props.valueFullName);
                }
              }}
              className={s.editInfo}
            >
              {props.editFullName ? (
                <span className={s.edit}>Save</span>
              ) : (
                <span className={s.edit}>Edit</span>
              )}
            </div>
          </div>
          <div className={s.editProfileFullName}>
            {props.editFullName ? (
              <input
                className={s.editFullName}
                value={props.valueFullName}
                onChange={handleChangeFullName}
                maxLength="50"
              ></input>
            ) : (
              <span className={s.fullName}>{props.profile.fullname}</span>
            )}
          </div>
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
                  props.profile.avatar == ""
                    ? PhotoProfile
                    : props.profile.avatar
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
            (props.editAboutMe ? s.editAboutMeBlockActive : " ")
          }
        >
          <div className={s.editAboutMeProfile}>
            <div className={s.editAboutMeTitle}>About me</div>
            <div
              onClick={() => {
                props.setEditAboutMe(!props.editAboutMe);
                {
                  props.editAboutMe && props.updateAboutMe(props.valueAboutMe);
                }
              }}
              className={
                s.addToAboutMe + " " + (disable ? s.addToAboutMeDisable : "")
              }
            >
              {props.editAboutMe ? (
                <span className={s.edit}>Save</span>
              ) : (
                <span className={s.edit}>Add to</span>
              )}
            </div>
          </div>
          {props.editAboutMe ? (
            <textarea
              value={props.valueAboutMe}
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
          {props.editAboutMe && (
            <div className={s.charactersRemaining}>
              {props.valueAboutMe.length < 70 ? (
                <span className={s.moreCharacters}>
                  {70 - props.valueAboutMe.length} more characters
                </span>
              ) : (
                <span>
                  Remaining {400 - props.valueAboutMe.length} characters
                </span>
              )}
              <div
                onClick={cancelEditAboutMe}
                className={s.cancelAboutMeButton}
              >
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
                props.setEditTellusMoreAboutYourself(
                  !props.editTellusMoreAboutYourself
                );
                {
                  props.editTellusMoreAboutYourself &&
                    props.updateProfileInfo(
                      props.valueBirthday,
                      props.valueLocation
                    );
                }
              }}
              className={s.editInfo}
            >
              {props.editTellusMoreAboutYourself ? (
                <span className={s.edit}>Save</span>
              ) : (
                <span className={s.edit}>Edit</span>
              )}
            </div>
          </div>
          <div className={s.moreAboutMyself}>
            <div className={s.birthdayBlock}>
              <img
                className={s.birthdayImg}
                src={res["birthday"]}
                alt="birthday"
              />
              <span className={s.birthdayTitleAndText}>
                <div className={s.birthdayTitle}>Birthday</div>
                {props.editTellusMoreAboutYourself ? (
                  <span className={s.birthdayEditBlock}>
                    <input
                      value={props.valueBirthday}
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
              <img className={s.cityImg} src={res["location"]} alt="location" />
              <span className={s.locationTitleAndText}>
                <div className={s.locationTitle}>Location</div>
                {props.editTellusMoreAboutYourself ? (
                  <span className={s.locationEditBlock}>
                    <input
                      value={props.valueLocation}
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
    )
  );
};
let mapStateToProps = (state) => {
  return {
    theme: getTheme(state),
    // profile: getProfile(state),
    // editMode: getEditMode(state),
  };
};
export default compose(
  connect(mapStateToProps, {
    // setEditMode,
    savePhoto,
    setProfileBanner,
    updateProfileInfo,
    updateAboutMe,
    updateFullName,
  }),
  withRouter
)(EditProfile);
