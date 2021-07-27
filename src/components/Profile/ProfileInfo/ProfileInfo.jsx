import React, { useState, useEffect } from "react"
// import Preloader from "../../common/Preloader/Preloader"
import s from "./ProfileInfo.module.css"
import profileImg from "../../../assets/images/user.png"
import { NavLink } from "react-router-dom"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import { Icons, IconsWhite } from "./../../../utils/Icons/Icons"
import Post from "./../../Posts/MyPosts/Post/Post"
import Cover from "./../../../assets/images/356200_h1ec7Aokt5_1.jpg"
import EditWhite from "./../../../assets/images/editWhite.png"
import CameraWhite from "./../../../assets/images/cameraWhite.png"
import CameraBlack from "./../../../assets/images/cameraBlack.png"
import BirthdayWhite from "./../../../assets/images/birthdayWhite.png"
import CityWhite from "./../../../assets/images/cityWhite.png"
import AboutMeWhite from "./../../../assets/images/aboutMeWhite.png"
import FilterWhite from "./../../../assets/images/filterWhite.png"
import List from "./../../../assets/images/menuBlueActive.png"
import EditProfile from "./EditProfile/EditProfile"
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
}
const ProfileInfo = (props) => {
  let birthdayMonth = props.profile.birthday.replace(/^.{5}/, "")
  birthdayMonth = birthdayMonth.replace(/.{3}$/, "")

  let [deployed, setdeployed] = useState(false)
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  const isSmall = window.innerWidth < 480

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onMainBannerSelected = (e) => {
    if (e.target.files.length) {
      props.setProfileBanner(e.target.files[0])
    }
  }
  // useEffect(() => {
  //   setStatus(props.status)
  // }, [props.status])
  // if (props.profile == null) {
  //   return <Preloader />
  // }
  let srcImg

  if (props.profile.avatar == "") {
    srcImg = profileImg
  } else {
    srcImg = props.profile.avatar
  }

  return (
    <div className={s.profilePage}>
      <div className={s.profileHead}>
        <div className={s.coverBlock}>
          <div className={s.coverPhoto}>
            <input
              onChange={onMainBannerSelected}
              type="file"
              id="banner"
              className={s.inputFile}
            />
            <label className={s.editBannerBlock} htmlFor="banner">
              <div className={s.editPhotoCoverBlock}>
                <img
                  className={s.editPhotoCoverImg}
                  src={CameraBlack}
                  alt="camera"
                />
                <span className={s.editPhotoCover}>Edit photo cover</span>
              </div>
            </label>
            <img className={s.cover} src={props.profile.banner} alt="Cover" />
          </div>

          <div className={s.avatarBlock}>
            <input
              onChange={onMainPhotoSelected}
              type="file"
              id="input__file"
            />
            <label className={s.changeLabel} htmlFor="input__file">
              <div className={s.editAvatarBlock}>
                <img
                  className={s.editAvatarCamera}
                  src={CameraWhite}
                  alt="camera"
                />
              </div>
            </label>
            <div className={s.avatarSubblock}>
              <img className={s.avatar} src={srcImg} alt="avatar" />
            </div>
          </div>
        </div>
        <div className={s.profileNameAndStatus}>
          <div className={s.profileName}>{props.profile.fullname}</div>
          <div className={s.profileStatus}>Status</div>
        </div>
        <div className={s.profileDescription}>
          <div className={s.publicationsBlock}>
            <div className={s.publications}>Publications</div>
          </div>
          <div
            onClick={() => {
              props.setEditMode(!props.editMode)
            }}
            className={s.editProfileBlock}
          >
            <img
              className={s.editProfileImg}
              src={EditWhite}
              alt="edit profile"
            />
            <div className={s.editProfile}>Edit profile</div>
          </div>
        </div>
      </div>
      <div className={s.profileBody}>
        <div className={s.leftColumn}>
          <div className={s.profileInfoBlock}>
            <div className={s.briefInformationTitle}>Brief information</div>
            <div className={s.listOfInformation}>
              <div className={s.listItems}>
                <img
                  className={s.birthdayImg}
                  src={BirthdayWhite}
                  alt="birthday"
                />
                <span className={s.birthdayTitle}>
                  Birthday{" "}
                  <span>
                    {month[birthdayMonth]}{" "}
                    {props.profile.birthday.replace(/^.{8}/, "")}
                  </span>
                </span>
              </div>
              <div className={s.listItems}>
                <img src={CityWhite} alt="city" />
                <span className={s.placeOfResidenceBlockTitle}>
                  Location <span>{props.profile.location}</span>
                </span>
              </div>
              <div className={s.listItems}>
                <img className={s.person} src={AboutMeWhite} alt="person" />
                <div className={s.aboutMe}>
                  About me:{" "}
                  <span>
                    Выбор города в выпадающем списке HTML, CSS Ответ. ... что
                    при нажатии на город в выпадающем списке, был переход на
                    поддомен, искал в гугле, ...
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={s.friendsBlock}>
            <div className={s.friendsTitle}>
              Friends <span>{props.friends.length}</span>
            </div>
            <div className={s.friendsList}>
              {props.friends.map((f) => (
                <NavLink
                  to={"/profile/" + f.id}
                  className={s.friendsListItem}
                  key={f.id}
                >
                  <img
                    className={s.friendsImg}
                    src={f.photo ? f.photo : profileImg}
                    alt="user photo"
                  />
                  <div className={s.friendsName}>{f.login}</div>
                </NavLink>
              ))}
            </div>
          </div>
          <div className={s.subscriptionBlock}></div>
        </div>
        <div className={s.rightColumn}>
          <div className={s.publicationsBlockAll}>
            <div className={s.publicationsTitleAndFilter}>
              <span className={s.publicationsTitle}>Publications</span>
              <div className={s.publicationsFilter}>
                <img
                  className={s.publicationsFilterImg}
                  src={FilterWhite}
                  alt="filter"
                />
                <span className={s.publicationsFilterTitle}>Filters</span>
              </div>
            </div>
            <div className={s.listBlock}>
              <img className={s.listImg} src={List} alt="list img" />
              <span className={s.listTitle}>List</span>
            </div>
          </div>
          <div className={s.postsList}>
            {props.posts.map((post) => (
              <Post
                border={false}
                key={post.id}
                theme={props.theme}
                profile={{ fullName: "Artem", photo: null }}
                deletePost={props.deletePost}
                addLike={props.addLike}
                id={post.id}
                title={post.title}
                message={post.message}
                like={post.like}
                dislike={post.dislike}
                isDisable={post.isDisable}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
