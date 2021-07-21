import React, { useState } from "react"
import s from "./EditProfile.module.css"
import BirthdayWhite from "./../../../../assets/images/birthdayWhite.png"
import CityWhite from "./../../../../assets/images/cityWhite.png"
import Cover from "./../../../../assets/images/356200_h1ec7Aokt5_1.jpg"
import { connect } from "react-redux"
import { compose } from "redux"
import { getProfileInfo } from "../../../../redux/AuthReducer/auth-selectors"
import { getEditMode } from "./../../../../redux/AppReducer/app-selectors"
import { setEditMode } from "./../../../../redux/AppReducer/app-reducer"
import { withRouter } from "react-router-dom"

const EditProfile = props => {
  const [editTellusMoreAboutYourself, setEditTellusMoreAboutYourself] =
    useState(false)
  const onMainPhotoSelected = e => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }
  document.onclick = function (e) {
    if (
      e.target.className
        .replace(/[^a-zA-Z ]/g, " ")
        .split(/\s+|\./)
        .filter(
          word =>
            (word === "EditProfile") |
            (word === "editProfileImg") |
            (word === "editProfile") |
            (word === "editProfileBlock")
        ).length == 0
    ) {
      props.setEditMode(false)
    }
  }
  return (
    <div className={s.editProfileMenu}>
      <div className={s.editProfileTitleBlock}>
        <span className={s.editProfileTitle}>Edit profile</span>
        <div
          onClick={() => {
            props.setEditMode(false)
          }}
          className={s.backBlock}
        ></div>
      </div>
      <div className={s.editPhotoProfileBlock}>
        <div className={s.editPhotoProfile}>
          <div className={s.editPhotoTitle}>Photo profile</div>
          <input onChange={onMainPhotoSelected} type='file' id='input__file' />
          <label className={s.editPhoto} htmlFor='input__file'>
            <span className={s.edit}>Edit</span>
          </label>
        </div>
        <div className={s.photoProfile}>
          <img src={props.profile.photo} alt='profile photo' />
        </div>
      </div>
      <div className={s.editPhotoProfileBlock}>
        <div className={s.editPhotoProfile}>
          <div className={s.editPhotoTitle}>Cover photo</div>

          <div className={s.editPhoto}>
            <span className={s.edit}>Edit</span>
          </div>
        </div>
        <div className={s.CoverPhotoProfile}>
          <img src={Cover} alt='profile photo' />
        </div>
      </div>
      <div className={s.editAboutMeBlock}>
        <div className={s.editAboutMeProfile}>
          <div className={s.editAboutMeTitle}>About me</div>
          <div className={s.addToAboutMe}>
            <span className={s.edit}>Add to</span>
          </div>
        </div>
        <div className={s.aboutMeText}>Tell about yourself...</div>
      </div>
      <div className={s.editTellUsMoreAboutYourselfBlock}>
        <div className={s.editTellUsMoreAboutYourselfAndEdit}>
          <div className={s.TellUsMoreAboutYourself}>
            Tell us more about yourself
          </div>
          <div
            onClick={() => {
              setEditTellusMoreAboutYourself(!editTellusMoreAboutYourself)
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
            <img className={s.birthdayImg} src={BirthdayWhite} alt='birthday' />
            <span className={s.birthdayTitleAndText}>
              <div className={s.birthdayTitle}>Birthday</div>
              {editTellusMoreAboutYourself ? (
                <span className={s.birthdayEditBlock}>
                  <input className={s.editBirthday} type='date' />
                </span>
              ) : (
                <span className={s.birthday}>August 25</span>
              )}
            </span>
          </div>
          <div className={s.locationBlock}>
            <img className={s.cityImg} src={CityWhite} alt='location' />
            <span className={s.locationTitleAndText}>
              <div className={s.locationTitle}>Location</div>
              {editTellusMoreAboutYourself ? (
                <span className={s.locationEditBlock}>
                  <input className={s.editLocation} type='text' />
                </span>
              ) : (
                <span className={s.location}>Ukraine, Lugansk</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
let mapStateToProps = state => {
  return {
    profile: getProfileInfo(state),
    editMode: getEditMode(state),
  }
}
export default compose(
  connect(mapStateToProps, { setEditMode }),
  withRouter
)(EditProfile)
