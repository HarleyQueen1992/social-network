import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import profileImg from '../../../assets/images/user.png'
import ProfileStatus from './ProfileStatus'
import { Redirect } from 'react-router-dom';
debugger
const ProfileInfo = (props) => {
    if (props.profile == null) {
        return( 
            <Preloader />)
    }
    let srcImg = props.profile.photos.large
    if (props.profile.photos.large ==  null) {
        srcImg = profileImg
    }
    // if (props.isAuth === false) {
    //     return <Redirect to={'/login'} />
    // }
    return (
        <div>
            {/* <div>
                <img className={s.imgHeader}
                    src='https://avatars.mds.yandex.net/get-marketcms/879900/img-800becaf-04f9-447b-90c4-000a2f46f35f.jpeg/optimize'/>
            </div> */}
            <div className={s.descriptionBlock}>
                <img className={s.ava} src={srcImg} />
                <div className={s.description} >                    
                    <div className={s.title} >Name: {props.profile.fullName}</div>
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                    {/* <div className={s.title} >About me: {props.profile.aboutMe}</div> */}
                    <div className={s.title} >Job: {props.profile.lookingForAJobDescription}</div>
                </div>
            </div>

        </div>
    )

}

export default ProfileInfo;
