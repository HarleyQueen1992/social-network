import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import profileImg from '../../../assets/images/user.png'
import ProfileStatus from './ProfileStatus'
import { Redirect } from 'react-router-dom';
import iconSettings from '../../../assets/images/settings.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = (props) => {
    if (props.profile == null) {
        return( 
            <Preloader />)
    }
    let srcImg = props.profile.photos.large
    if (props.profile.photos.large ==  null) {
        srcImg = profileImg
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            {/* <div>
                <img className={s.imgHeader}
                    src='https://avatars.mds.yandex.net/get-marketcms/879900/img-800becaf-04f9-447b-90c4-000a2f46f35f.jpeg/optimize'/>
            </div> */}
            <div className={s.descriptionBlock}>
                <div className={s.leftDescription} >
                    <div className={s.topDescriptionLeft} >
                        <div>
                            <img className={s.ava} src={srcImg} />
                        </div>
                        
                        {props.isOwner && 
                                    <div className={s.setPhoto} >
                                        <input type="file" id="input__file" className="input input__file" onChange={onMainPhotoSelected} /> 
                                        <label for="input__file">
                                            <img className={s.icon} src={iconSettings} />
                                        </label>
                                    </div>
                                            }

                    </div>
                    
                    {props.isOwner || <div className={s.followed}>
                        {props.isFollow === true ?
                        <button onClick={ () => { props.unfollow(props.profile.userId)} } className={s.followBut} >Unfollow</button>
                        : <button onClick={ () => { props.follow(props.profile.userId)} } className={s.followBut} >Follow</button>}
                    </div>}

                    
                </div>
                
                <div className={s.description} >
                    <div className={s.discriptionTop} >
                        <div className={s.name} >{props.profile.fullName}</div>
                        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                    </div>
                    <div className={s.descriptionCenter} >    
                        <div>Birthday: 25 августа </div>
                        <div>City: Lugansk</div>
                        <div>Place of study: school №5</div>                     
                    </div>                      
                    <div className={s.discriptionBot}>
                        <div className={s.botLeft} >
                            <div className={s.numberOfFriends} >120</div>
                            <div className={s.friends} >Friends</div>
                            <div className={s.numberOfSubscribers} >50</div>
                            <div className={s.subscribers} >Subscriders</div>
                            <div className={s.numberOfPhotos}>2</div>
                            <div className={s.photo} >Photo</div>
                        </div>
                        <div className={s.botRight} >заходил час назад</div>  
                    </div>
                    
                    {/* <div className={s.title} >About me: {props.profile.aboutMe}</div> */}
                    {/* <div className={s.title} >Job: {props.profile.lookingForAJobDescription}</div> */}
                </div>
            </div>

        </div>
    )

}

export default ProfileInfo;
