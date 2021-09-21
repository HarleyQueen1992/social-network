import React, { useState, useEffect } from "react";
import s from "./EditProfile.module.css";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  setProfileBanner,
  updateProfileInfo,
  updateAboutMe,
  updateFullName,
  savePhoto,
} from "../../../../redux/ProfileReducer/profile-reducer";
// import { savePhoto } from "./../../../redux/SettingsReducer/settings-reducer";
import { withRouter } from "react-router-dom";
import { Icons } from "../../../../utils/Icons/Icons";
import { setEditProfile } from "./../../../../redux/AppReducer/app-reducer";
import {
  getTheme,
  getEditProfile,
} from "./../../../../redux/AppReducer/app-selectors";
import { getProfile } from "../../../../redux/ProfileReducer/profile-selectors";

const EditProfile = (props) => {
  let res = Icons(props.theme);

  const [editTellusMoreAboutYourself, setEditTellusMoreAboutYourself] =
    useState(false);
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [editFullName, setEditFullName] = useState(false);
  const [valueFullName, setValueFullName] = useState(props.profile.fullname);
  const [valueAboutMe, setValueAboutMe] = useState(props.profile.aboutMe);
  const [valueBirthday, setValueBirthday] = useState(props.profile.birthday);
  const [valueLocation, setValueLocation] = useState(props.profile.location);
  // let disable = props.valueAboutMe.length < 70;

  const cancelEditAboutMe = () => {
    setValueAboutMe(props.profile.aboutMe);
    setEditAboutMe(false);
  };
  const handleChangeFullName = (event) => {
    setValueFullName(event.target.value);
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
  const closePopup = () => {
    document.querySelector("body").style.cssText = "overflow: scroll;";
    props.setEditProfile(false);
  };
  useEffect(() => {
    return () => {
      // setEditTellusMoreAboutYourself(false);
      // setEditAboutMe(false);
      // setEditFullName(false);
      // document.querySelector(".react-swipeable-view-container").style.cssText =
      //   "will-change: transform; !important" +
      //   "flex-direction: row;" +
      //   "transition: all 0s ease 0s;" +
      //   "direction: ltr;" +
      //   "display: flex;" +
      //   "transform: translate(-100%, 0px);";
      document.querySelector("body").style.cssText = "overflow: scroll;";
      props.setEditProfile(false);
      console.log("exit");
    };
  }, []);
  return (
    <div
      onMouseDown={closePopup}
      className={
        s.editProfileMenuBlock +
        " " +
        (props.editProfile && s.activeEditProfileMenuBlock)
      }
    >
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
            onClick={closePopup}
            id="backBlock"
          ></div>
        </div>
        <div className={s.editProfileFullNameBlock}>
          <div className={s.editProfileFullNameTitleBlock}>
            <div className={s.editProfileFullNameTitle}>Fullname</div>
            <div
              onClick={() => {
                setEditFullName(!editFullName);
                {
                  editFullName && props.updateFullName(valueFullName);
                }
              }}
              className={s.editInfo}
            >
              {editFullName ? (
                <span className={s.edit}>Save</span>
              ) : (
                <span className={s.edit}>Edit</span>
              )}
            </div>
          </div>
          <div className={s.editProfileFullName}>
            {editFullName ? (
              <input
                className={s.editFullName}
                value={valueFullName}
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
                    ? res["defaultAvatr"]
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
              <img
                src={
                  props.profile.banner === ""
                    ? res["bannerDefault"]
                    : props.profile.banner
                }
                alt="profile photo"
              />
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
              className={s.addToAboutMe}
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
              <span>Remaining {400 - valueAboutMe.length} characters</span>

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
              <img
                className={s.birthdayImg}
                src={res["birthday"]}
                alt="birthday"
              />
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
                    {props.profile.birthday &&
                      new Date(props.profile.birthday).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "2-digit",
                        }
                      )}{" "}
                  </span>
                )}
              </span>
            </div>
            <div className={s.locationBlock}>
              <img className={s.cityImg} src={res["location"]} alt="location" />
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
      <div className={s.editProfileMenuBottom}></div>
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
