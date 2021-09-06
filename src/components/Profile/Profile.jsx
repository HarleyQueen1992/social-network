import React, { useEffect, useState } from "react";
import { requestSubscriptions } from "../../redux/ProfileReducer/profile-reducer";
import p from "./Profile.module.css";
import { useLocation, NavLink } from "react-router-dom";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Profile = (props) => {
  let [prevUrl, setPrevUrl] = useState("");
  if (document.querySelector(".react-swipeable-view-container")) {
    document.querySelector(
      ".react-swipeable-view-container"
    ).childNodes[1].style.cssText =
      "overflow: initial; width: 100%; flex-shrink: 0;";
  }
  let query = useQuery();

  useEffect(() => {
    // let id = query.get("id");
    let scroll = window.scrollY;
    // if (!id) {
    //   props.setIsBigPictures(false);
    props.changeIndex(window.location.href, scroll);
    // } else {
    //   props.setIsBigPictures(true);
    // }
    // setPrevUrl(window.location.href);
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
          profileInfo={props.profileInfo}
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
          avatarIsLoading={props.avatarIsLoading}
          bannerIsLoading={props.bannerIsLoading}
          blockUser={props.blockUser}
          banUser={props.banUser}
          unblockUser={props.unblockUser}
          setIsOpenFilters={props.setIsOpenFilters}
        />
      </div>
    </div>
  );
};

export default Profile;
