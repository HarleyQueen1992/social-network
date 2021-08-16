import React, { useEffect } from "react";
import { requestSubscriptions } from "../../redux/ProfileReducer/profile-reducer";
import p from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  document.getElementById("appWraperContent").firstChild.style.cssText =
    "overflow-x: none;";
  if (document.querySelector(".react-swipeable-view-container").childNodes) {
    document.querySelector(
      ".react-swipeable-view-container"
    ).childNodes[1].style.cssText =
      "overflow: initial; width: 100%; flex-shrink: 0;";
  }

  useEffect(() => {
    props.changeIndex(window.location.href);
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
        <ProfileInfo
          friends={props.friends}
          isSavingPhoto={props.isSavingPhoto}
          saveProfileInfo={props.saveProfileInfo}
          isFollowed={props.isFollowed}
          unfollow={props.unfollow}
          follow={props.follow}
          savePhoto={props.savePhoto}
          isOwner={props.isOwner}
          profile={props.profile}
          isAuth={props.isAuth}
          status={props.status}
          updateStatus={props.updateStatus}
          lastPost={props.lastPost}
          addLike={props.addLike}
          theme={props.theme}
          posts={props.posts}
          editMode={props.editMode}
          setEditMode={props.setEditMode}
          setProfileBanner={props.setProfileBanner}
          isMenuActive={props.isMenuActive}
          usersListFollowing={props.usersListFollowing}
          subscribers={props.subscribers}
          subscriptions={props.subscriptions}
          totalSubscriptionsItems={props.totalSubscriptionsItems}
          totalSubscribersItems={props.totalSubscribersItems}
          unSubscribe={props.unSubscribe}
          Subscribe={props.Subscribe}
        />
      </div>
    </div>
  );
};

export default Profile;
