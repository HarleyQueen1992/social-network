import React, { useEffect, useState } from "react";

//? Components
import ProfileInfo from "./ProfileInfo/ProfileInfo";

//? Css
import p from "./Profile.module.css";

const Profile = (props) => {
  if (document.querySelector(".react-swipeable-view-container")) {
    document.querySelector(
      ".react-swipeable-view-container"
    ).childNodes[1].style.cssText =
      "overflow: initial; width: 100%; flex-shrink: 0;";
  }

  useEffect(() => {
    let scroll = window.scrollY;
    props.changeIndex(window.location.href, scroll);
  }, [window.location.href]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  });
  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      props.posts.length < props.totalPostsItems
    ) {
      props.setUploadPost(true);
    }
  };
  return (
    <div className={p.profileBlock}>
      <div className={p.profileInfo}>
        <ProfileInfo profile={props.profile} isOwner={props.isOwner} />
      </div>
    </div>
  );
};

export default Profile;
