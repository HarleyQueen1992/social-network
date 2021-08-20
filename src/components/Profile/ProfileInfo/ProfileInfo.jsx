import React, { useState, useEffect } from "react";
// import Preloader from "../../common/Preloader/Preloader"
import s from "./ProfileInfo.module.css";
import profileImg from "../../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { Icons, IconsWhite } from "./../../../utils/Icons/Icons";
import Post from "./../../Posts/MyPosts/Post/Post";
import Cover from "./../../../assets/images/356200_h1ec7Aokt5_1.jpg";
import EditWhite from "./../../../assets/images/editWhite.png";
import CameraWhite from "./../../../assets/images/cameraWhite.png";
import CameraBlack from "./../../../assets/images/cameraBlack.png";
import BirthdayWhite from "./../../../assets/images/birthdayWhite.png";
import CityWhite from "./../../../assets/images/cityWhite.png";
import AboutMeWhite from "./../../../assets/images/aboutMeWhite.png";
import FilterWhite from "./../../../assets/images/filterWhite.png";
import List from "./../../../assets/images/menuBlueActive.png";
import PostCreation from "../../Posts/MyPosts/PostCreation/PostCreation";
import EditProfile from "./../EditProfile/EditProfile";
import ProfileBannerDefault from "./../../../assets/images/wp2655395.jpg";
import LoadingAvatar from "./../../../assets/images/loadingAvatar.svg";
import BlockUser from "./BlockUser/BlockUser";

const ProfileInfo = (props) => {
  let res = Icons(props.theme, props.index);

  let birthdayMonth = new Date(props.profile.birthday).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "2-digit",
    }
  );
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

  let [editStatus, setEditStatus] = useState(false);
  let [editMode, setEditMode] = useState(false);
  let [valueStatus, setValueStatus] = useState(props.profile.status);
  const [editTellusMoreAboutYourself, setEditTellusMoreAboutYourself] =
    useState(false);
  let [isBlockUser, setIsBlockUser] = useState(false);
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [editFullName, setEditFullName] = useState(false);
  const [valueFullName, setValueFullName] = useState(props.profile.fullname);
  const [valueAboutMe, setValueAboutMe] = useState(props.profile.aboutMe);
  const [valueBirthday, setValueBirthday] = useState(props.profile.birthday);
  const [valueLocation, setValueLocation] = useState(props.profile.location);

  const isSmall = window.innerWidth < 480;

  useEffect(() => {
    if (
      window.innerHeight <
      document.getElementById("inTheLeftColumn").clientHeight + 71 // 51px - header height
    ) {
      let height = document.getElementById("inTheLeftColumn").clientHeight;
      document.getElementById("inTheLeftColumn").style.cssText =
        "top:" + (window.innerHeight - height - 20) + "px;"; // 20px padding-top
    } else {
      document.getElementById("inTheLeftColumn").style.cssText = "top: 61px;"; // 61px = 51px(header height) + 10px (padding-top)
    }
  }, [editMode]);

  const handleChangeStatus = (event) => {
    setValueStatus(event.target.value);
  };

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
    e.preventDefault();
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
  let srcImg;

  if (props.profile.avatar == "") {
    srcImg = profileImg;
  } else {
    srcImg = props.profile.avatar;
  }
  if (editStatus) {
    document.onclick = function (e) {
      if (e.target.className !== "") {
        if (
          e.target.className
            .replace(/[^a-zA-Z ]/g, " ")
            .split(/\s+|\./)
            .filter((word) => (word === "editStatus") | (word === "setStatus"))
            .length == 0
        ) {
          props.updateStatus(valueStatus);

          setEditStatus(false);
        }
      }
    };
  }

  return (
    <div className={s.profilePage}>
      {isBlockUser && <BlockUser setIsBlockUser={setIsBlockUser} />}
      <div
        onMouseDown={closePopup}
        className={
          s.editProfileMenuBlock +
          " " +
          (editMode && s.activeEditProfileMenuBlock)
        }
      >
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
            profile={props.profile}
          />
        )}
        <div className={s.editProfileMenuBottom}></div>
      </div>
      <div className={s.profileHead}>
        <div className={s.coverBlock}>
          <div className={s.coverPhoto}>
            <input
              onChange={onMainBannerSelected}
              type="file"
              id="banner"
              className={s.inputFile}
            />
            {props.isOwner && (
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
            )}
            {props.bannerIsLoading ? (
              <div className={s.loadingBanner}>
                <img
                  src={res["loading"]}
                  // className={s.loadingBanner}
                  alt="loading banner"
                />
              </div>
            ) : (
              <img
                className={s.cover}
                src={
                  props.profile.banner == ""
                    ? ProfileBannerDefault
                    : props.profile.banner
                }
                alt="Cover"
              />
            )}
          </div>

          <div className={s.avatarBlock}>
            <input
              onChange={onMainPhotoSelected}
              type="file"
              id="input__file"
            />
            {props.isOwner && (
              <label className={s.changeLabel} htmlFor="input__file">
                <div className={s.editAvatarBlock}>
                  <img
                    className={s.editAvatarCamera}
                    src={CameraWhite}
                    alt="camera"
                  />
                </div>
              </label>
            )}
            <div className={s.avatarSubblock}>
              {props.avatarIsLoading ? (
                <div className={s.loadingAvatar}>
                  <img src={LoadingAvatar} alt="loading avatar" />
                </div>
              ) : (
                <img
                  className={s.avatar}
                  src={
                    props.profile.avatar == ""
                      ? profileImg
                      : props.profile.avatar
                  }
                  alt="avatar"
                />
              )}
            </div>
          </div>
        </div>
        <div className={s.profileNameAndStatus}>
          <div
            className={
              s.profileNameAndCheckMark +
              " " +
              (props.profile.isAdmin && s.profileNameAndCheckMarkIsAdmin)
            }
          >
            <span>{props.profile.fullname}</span>
            <div
              className={
                s.checkMarkBlock +
                " " +
                (props.profile.isAdmin && s.checkMarkBlockActive)
              }
            >
              <img src={res["checkMark"]} alt="checkMark" />
            </div>
          </div>

          {props.isOwner ? (
            editStatus ? (
              <input
                className={s.editStatus}
                onChange={handleChangeStatus}
                value={valueStatus}
                placeholder="Set status"
                maxLength="70"
              ></input>
            ) : props.profile.status == "" ? (
              <div
                onClick={() => {
                  setEditStatus(true);
                }}
                className={s.setStatus}
              >
                Set status
              </div>
            ) : (
              <div
                onDoubleClick={() => {
                  setEditStatus(true);
                }}
                className={s.profileStatus}
              >
                {valueStatus}
              </div>
            )
          ) : (
            <div className={s.profileStatus}>{props.profile.status}</div>
          )}
        </div>
        <div className={s.profileDescription}>
          <div className={s.publicationsBlock}>
            <div className={s.publications}>Publications</div>
          </div>
          {props.isOwner ? (
            <div onClick={openPoupup} className={s.editProfileBlock}>
              <img
                className={s.editProfileImg}
                src={res["edit"]}
                alt="edit profile"
              />
              <div className={s.editProfile}>Edit profile</div>
            </div>
          ) : (
            <div
              className={
                s.subscribeUnsubscribeBlock +
                " " +
                (!props.profile.isAdmin && s.subscribeUnsubscribeBlockAndBan)
              }
            >
              {!props.profile.isAdmin && props.profileInfo.isAdmin && (
                <div
                  className={s.banBlock}
                  onClick={() => {
                    document.querySelector("body").style.cssText =
                      "overflow: hidden;";
                    setIsBlockUser(true);
                  }}
                >
                  {/* <img className={s.banImg} src={res["block"]} alt="ban img" /> */}
                  <span className={s.ban}>Block</span>
                </div>
              )}
              {props.isFollowed ? (
                <div
                  className={s.unsubscribeBlock}
                  onClick={() => props.unSubscribe(props.profile.login)}
                >
                  <span className={s.unsubscribe}>Unsubscribe</span>
                </div>
              ) : (
                <div
                  className={s.subscribeBlock}
                  onClick={() => props.Subscribe(props.profile.login)}
                >
                  <span className={s.subscribe}>Subscribe</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={s.profileBody}>
        <div className={s.leftColumn}>
          <div className={s.inTheLeftColumn} id="inTheLeftColumn">
            <div className={s.profileInfoBlock}>
              {/* <div className={s.briefInformationTitle}>Brief information</div> */}
              <div className={s.listOfInformation}>
                <div className={s.listItems}>
                  <img
                    className={s.birthdayImg}
                    src={res["birthday"]}
                    alt="birthday"
                  />
                  <span className={s.birthdayTitle}>
                    Birthday <span>{birthdayMonth}</span>
                  </span>
                </div>
                <div className={s.listItems}>
                  <img src={res["location"]} alt="city" />
                  <span className={s.placeOfResidenceBlockTitle}>
                    Location <span>{props.profile.location}</span>
                  </span>
                </div>
                <div className={s.listItems}>
                  <img className={s.person} src={res["aboutMe"]} alt="person" />
                  <div className={s.aboutMe}>
                    About me: <span>{props.profile.aboutMe}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                s.subscriptionSubscribersBlock +
                " " +
                (props.subscriptions.length == 0
                  ? s.subscriptionSubscribersBlockEmpty
                  : " ")
              }
            >
              <div className={s.subscriptionSubscribersTitle}>
                <NavLink to={"/followings/" + props.profile.login}>
                  Subscriptions {props.totalSubscriptionsItems}
                </NavLink>
              </div>
              <div
                className={
                  s.subscriptionSubscribersList +
                  " " +
                  (props.subscriptions.length == 0
                    ? s.subscriptionSubscribersListNone
                    : "")
                }
              >
                {props.subscriptions.map((f) => (
                  <NavLink
                    to={"/profile/" + f.login}
                    className={s.subscriptionSubscribersListItem}
                    key={f.id}
                  >
                    <div className={s.subscriptionSubscribersBlockImg}>
                      <img
                        className={s.subscriptionSubscribersImg}
                        src={f.avatar ? f.avatar : profileImg}
                        alt="user photo"
                      />
                    </div>
                    <div className={s.subscriptionSubscribersName}>
                      {f.login}
                    </div>
                  </NavLink>
                ))}
              </div>
              {/* <div className={s.seeAllSubscriptionsBlock}>
                <NavLink
                  to={"/followings/" + props.profile.login}
                  className={s.seeAllSubscriptions}
                >
                  See all subscriptions
                </NavLink>
              </div> */}
            </div>
            <div
              className={
                s.subscriptionSubscribersBlock +
                " " +
                (props.subscribers.length == 0
                  ? s.subscriptionSubscribersBlockEmpty
                  : " ")
              }
            >
              <div className={s.subscriptionSubscribersTitle}>
                <NavLink to={"/followers/" + props.profile.login}>
                  Subscribers {props.totalSubscribersItems}
                </NavLink>
              </div>
              <div
                className={
                  s.subscriptionSubscribersList +
                  " " +
                  (props.subscribers.length == 0
                    ? s.subscriptionSubscribersListNone
                    : "")
                }
              >
                {props.subscribers &&
                  props.subscribers.map((f) => (
                    <NavLink
                      to={"/profile/" + f.login}
                      className={s.subscriptionSubscribersListItem}
                      key={f.id}
                    >
                      <div className={s.subscriptionSubscribersBlockImg}>
                        <img
                          className={s.subscriptionSubscribersImg}
                          src={f.avatar ? f.avatar : profileImg}
                          alt="user photo"
                        />
                      </div>
                      <div className={s.subscriptionSubscribersName}>
                        {f.login}
                      </div>
                    </NavLink>
                  ))}
              </div>
              {/* <div className={s.seeAllSubscribersBlock}>
                <NavLink
                  to={"/followers/" + props.profile.login}
                  className={s.seeAllSubscribers}
                >
                  See all subscribers
                </NavLink>
              </div> */}
            </div>
          </div>
        </div>
        <div
          className={
            s.rightColumn + " " + (!props.isOwner ? s.rightColumnNoOwner : "")
          }
        >
          {props.isOwner && <PostCreation translate="-100%" />}
          <div className={s.publicationsBlockAll}>
            <div className={s.publicationsTitleAndFilter}>
              <span className={s.publicationsTitle}>Publications</span>
              <div className={s.publicationsFilter}>
                <img
                  className={s.publicationsFilterImg}
                  src={res["filter"]}
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
                post={post}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
