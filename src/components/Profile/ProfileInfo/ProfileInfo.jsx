import React, {useState} from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import profileImg from '../../../assets/images/user.png'
import ProfileStatus from './ProfileStatus'
import { NavLink, Redirect } from 'react-router-dom';
import ProfileDataFormReduxForm from './ProfileDataForm/ProfileDataForm'
import iconSettings from '../../../assets/images/settings.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import styled from "styled-components";

const ProfileInfo = (props) => {

    let [deployed, setdeployed] = useState(false);
    let [editMode, setEditMode] = useState(false);

    if (props.profile == null) {
        return( 
            <Preloader />)
    }

    let srcImg = props.profile.photo
    if (props.profile.photo ==  null) {
        srcImg = profileImg
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])  
        }
    }
    const onSubmit = (formData) => {
        props.saveProfileInfo(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }
    const Styleds = styled.div`
        color: ${(props) => props.theme.colorAbouMe};
    `;

    const StyledApp = styled.div`
        color: ${(props) => props.theme.fontColor};
        font-size: 20px;
        font-weight: 700;
        align-self: end;
        margin-left: 10px;
    `;

    const DeteilInfo = styled.div`
        color: ${(props) => props.theme.colorDeteilInfo};
    `

    const Description = styled.div`
        color: ${(props) => props.theme.descriptionColor};
    `
    const Friends = styled.div`
        color: ${(props) => props.theme.descriptionColor};
    `
    const Edit = styled.div`
        background-color: ${(props) => props.theme.EditBack};
        display:grid;
        border-radius: 6px;
    `
    return (
        // <Styleds>
        <div className={s.profileInfoBlock} >
            {/* <div>
                <img className={s.imgHeader}
                    src='https://avatars.mds.yandex.net/get-marketcms/879900/img-800becaf-04f9-447b-90c4-000a2f46f35f.jpeg/optimize'/>
            </div> */}
            <div className={s.descriptionBlock}>
                <div className={s.leftDescription} >
                    <div className={s.profileInfo} >
                        <div className={s.topDescriptionLeft} >
                            <div>
                                {props.isSavingPhoto ?  <div className={s.preloader} > < Preloader/> </div>: <img className={s.ava} src={srcImg} />}
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
                        
                        {/* {props.isOwner || <div className={s.followed}>
                            {props.isFollow === true ?
                            <button onClick={ () => { props.unfollow(props.profile.userId)} } className={s.followBut} >Unfollow</button>
                            : <button onClick={ () => { props.follow(props.profile.userId)} } className={s.followBut} >Follow</button>}
                        </div>} */}
                        <div className={s.rightTopDescription} >
                        <StyledApp>{props.profile.fullName}</StyledApp>
                            <div className={s.centerStatus} >  <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/></div>
                        </div>
                    </div>
                    {props.isOwner || <div className={s.followed}>
                            {props.isFollow === true ?
                            <button onClick={ () => { props.unfollow(props.profile.userId)} } className={s.followBut} >Unfollow</button>
                            : <button onClick={ () => { props.follow(props.profile.userId)} } className={s.followBut} >Follow</button>}
                        </div>}
                    {props.isOwner ?            
                                        <div className={s.editBlock} >
                                            <input type="file" id="input__file" className="input input__file" onChange={onMainPhotoSelected} /> 
                                               
                                                <label className={s.edit} for="input__file">
                                                <Edit> 
                                                    <span>Edit</span>
                                                </Edit>
                                                </label>
                                            
                                                
                                            
                                        </div>
                                        
                                    :   <div></div>
                                                }
                    {/* <div className={s.edit} >
                        <span>Edit</span>
                    </div> */}
                    
                </div>
                
                <div className={s.description} >
                    <div className={s.discriptionTop} >
                    <StyledApp>
                        <div>
                            {props.profile.fullName} 
                        </div>
                    </StyledApp>
                        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                    </div>
                    <div className={s.descriptionCenter} >
                        <Description>    
                        <div className={s.aboutMe} >About me : </div>  
                        <div className={s.aboutMeText} > I am a team player. I am outgoing, dedicated, and open-minded. I get across to people and adjust to changes with ease. 
                            I believe that a person should work on developing their professional skills and learning new things all the time.</div> 
                            </Description> 
                        {/*? Deploy will be in the future */}
                        {/* {deployed 
                        ? <div onClick={() => {setdeployed(false)}}className={s.detailed} >hide</div> 
                        : <div onClick={() => {setdeployed(true)}}className={s.detailed} >detailed</div>}                        */}
                    </div>
                    <div className={s.detailed} >
                        <DeteilInfo>
                            detailed information
                        </DeteilInfo>
                    </div>
                    {/* {deployed 
                        ? editMode 
                            ? <ProfileDataFormReduxForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile} isOwner={props.isOwner}/> 
                            : <ProfileData setEditMode={setEditMode} profile={props.profile} isOwner={props.isOwner}/>: <div></div>  }                  */}
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
            
                <div className={s.friendsBlock} >
                    <div className={s.friendsC} >
                    <Friends>   
                        Subscriptions
                        <span className={s.countFriends} >
                            {props.friends.length}
                        </span>
                        </Friends>
                        <NavLink className={s.rToFriends} to='/friends' >
                        ➤   
                        </NavLink></div>
                    <div className={s.friendsList} >
                        {props.friends.map(f => 
                            <NavLink to={'/profile/' + f.id} className={s.friend} >
                                <div className={s.friendsPhoto} >
                                    <img className={s.friendsAva } src={!f.photo ? profileImg : f.photo } />
                                </div>
                                <div className={s.friendsName} >
                                <Friends>
                                    {f.name}
                                </Friends>
                                </div>
                            </NavLink>
                            )}
                    </div>
                    
                </div>
                
            
            </div>

        </div>
    //  </Styleds>
    )

}

export const ProfileData = (props) => {
    return <div className={s.deploy} >
                <div>
                    <b>Full name</b>: {props.   profile.fullName}
                </div>
                <div>
                    <b>Looking for a job</b>: {props.profile.lookingForAJob ? "yes" : "no"}
                </div>
        
                <div>
                   <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
                </div>
                <div>
                    <b>About me</b>: {props.profile.aboutMe}
                </div>
                    <b class={s.contacts} >Contacts : </b> {Object.keys(props.profile.contacts).map(key => {
                        return <Contacts contactTitle={key} contactValue={props.profile.contacts[key]} />
                    })}
                { props.isOwner && <div>
                    <button onClick={() => {props.setEditMode(true)}} > Edit</button>
                </div>}
                </div>
}

export const Contacts = (props) => {
    return <div className={s.contactsBlock} >
            <b>{props.contactTitle} : </b> {props.contactValue}   
        </div>
    
}

export default ProfileInfo;
