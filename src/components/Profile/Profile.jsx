import React from 'react';
import p from './Profile.module.css'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div className={p.profileBlock} >
            <div className={p.profileInfo} >
                <ProfileInfo profile={props.profile} isAuth={props.isAuth} status={props.status} updateStatus={props.updateStatus}/>
            </div>
            <div className={p.posts} >
                <MyPostsContainer/>
            </div> 
        
        </div>
    )
}

export default Profile;