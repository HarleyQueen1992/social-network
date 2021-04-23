import React from 'react';
import p from './Profile.module.css'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostCreation from './MyPosts/PostCreation/PostCreation'

const Profile = (props) => {
    return (
        
        <div className={p.profileBlock} >
            <div className={p.profileInfo} >
                <ProfileInfo friends={props.friends} isSavingPhoto={props.isSavingPhoto} saveProfileInfo={props.saveProfileInfo} isFollow={props.isFollow} unfollow={props.unfollow} follow={props.follow} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} isAuth={props.isAuth} status={props.status} updateStatus={props.updateStatus}/>
            </div>
            {/* <div className={p.posts} >
                <MyPostsContainer/>
            </div> */}
        </div>
        
    )
}

export default Profile;