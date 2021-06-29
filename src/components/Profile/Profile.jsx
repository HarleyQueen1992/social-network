import React from "react"
import p from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"

const Profile = props => {
  let newUrl = window.location.href
  if (props.strUrlPrev != newUrl) {
    props.changeIndex(newUrl)
  }
  return (
    <div className={p.profileBlock}>
      <div className={p.profileInfo}>
        <ProfileInfo
          friends={props.friends}
          isSavingPhoto={props.isSavingPhoto}
          saveProfileInfo={props.saveProfileInfo}
          isFollow={props.isFollow}
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
        />
      </div>
    </div>
  )
}

export default Profile
