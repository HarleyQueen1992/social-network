import React, { useEffect } from "react";
import { requestSubscriptions } from "../../redux/ProfileReducer/profile-reducer";
import p from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  useEffect(() => {
    props.changeIndex(window.location.href);
  }, [window.location.href]);

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
