import React, { useState } from "react"
import Preloader from "../../common/Preloader/Preloader"
import s from "./ProfileInfo.module.css"
import profileImg from "../../../assets/images/user.png"
import { NavLink, Redirect } from "react-router-dom"
import ProfileDataFormReduxForm from "./ProfileDataForm/ProfileDataForm"
import iconSettings from "../../../assets/images/settings.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import styled from "styled-components"
import Post from "./../../Posts/MyPosts/Post/Post"
import { Icons, IconsWhite } from "./../../../utils/Icons/Icons"

const ProfileInfo = props => {
  let [deployed, setdeployed] = useState(false)
  let [editMode, setEditMode] = useState(false)

  if (props.profile == null) {
    return <Preloader />
  }
  // export const Icons = {
  //   github: GitHub,
  //   vk: vk,
  //   facebook: facebook,
  //   instagram: inst,
  //   twitter: twitter,
  //   youtube: youtube,
  // }

  let srcImg = props.profile.photo
  if (props.profile.photo == null) {
    srcImg = profileImg
  }
  const onMainPhotoSelected = e => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }
  const onSubmit = formData => {
    props.saveProfileInfo(formData).then(() => {
      setEditMode(false)
    })
  }
  return (
    <div className={s.descriptionBlock}>
      <div className={s.topBlock}>
        <div className={s.avatar}>
          <div className={s.topDescriptionLeft}>
            <div>
              {props.isSavingPhoto ? (
                <div className={s.preloader}>
                  {" "}
                  <Preloader />{" "}
                </div>
              ) : (
                <img className={s.ava} src={srcImg} />
              )}
            </div>
          </div>
        </div>
        <div className={s.rightTopDescription}>
          <div className={s.topName}>{props.profile.fullName}</div>
          <div className={s.centerStatus}>
            <div className={s.info}>
              <ProfileStatusWithHooks
                status={props.status}
                updateStatus={props.updateStatus}
              />
            </div>
          </div>
          <div className={s.detailedInfoBlock}>
            <DetailedInfo
              profile={props.profile}
              deployed={deployed}
              theme={props.theme}
            />
          </div>
          <div className={s.deployedBlock}>
            {deployed ? (
              <div
                onClick={() => {
                  setdeployed(!deployed)
                }}
                className={s.detailed}
              >
                roll up
              </div>
            ) : (
              <div
                onClick={() => {
                  setdeployed(!deployed)
                }}
                className={s.detailed}
              >
                detailed information
              </div>
            )}
          </div>
        </div>
        {props.isOwner || (
          <div className={s.followed}>
            {props.isFollow === true ? (
              <button
                onClick={() => {
                  props.unfollow(props.profile.userId)
                }}
                className={s.followBut}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => {
                  props.follow(props.profile.userId)
                }}
                className={s.followBut}
              >
                Follow
              </button>
            )}
          </div>
        )}
        {props.isOwner ? (
          <div className={s.editBlock}>
            <input
              type='file'
              id='input__file'
              className='input input__file'
              onChange={onMainPhotoSelected}
            />

            <label className={s.edit} for='input__file'>
              <span>Edit</span>
            </label>
          </div>
        ) : (
          <div></div>
        )}
        {/* <div className={s.edit} >
                        <span>Edit</span>
                    </div> */}
      </div>

      <div className={s.description}>
        <div className={s.discriptionTop}>
          <div>{props.profile.fullName}</div>
          <ProfileStatusWithHooks
            status={props.status}
            updateStatus={props.updateStatus}
          />
        </div>
        <DetailedInfo
          profile={props.profile}
          deployed={deployed}
          theme={props.theme}
        />

        {deployed ? (
          <div
            onClick={() => {
              setdeployed(!deployed)
            }}
            className={s.detailed}
          >
            roll up
          </div>
        ) : (
          <div
            onClick={() => {
              setdeployed(!deployed)
            }}
            className={s.detailed}
          >
            detailed information
          </div>
        )}
        {/* <ProfileDataFormReduxForm
          initialValues={props.profile}
          onSubmit={onSubmit}
          profile={props.profile}
        /> */}
        {/* <ProfileData
          setEditMode={setEditMode}
          profile={props.profile}
          isOwner={props.isOwner}
        /> */}
        <div className={s.discriptionBot}>
          <div className={s.botLeft}>
            <div className={s.numberOfFriends}>120</div>
            <div className={s.friends}>Friends</div>
            <div className={s.numberOfSubscribers}>50</div>
            <div className={s.subscribers}>Subscriders</div>
            <div className={s.numberOfPhotos}>2</div>
            <div className={s.photo}>Photo</div>
          </div>
          <div className={s.botRight}>заходил час назад</div>
        </div>
        {/* <div className={s.title} >About me: {props.profile.aboutMe}</div> */}
        {/* <div className={s.title} >Job: {props.profile.lookingForAJobDescription}</div> */}
      </div>

      <div className={s.friendsBlock}>
        <div className={s.friendsC}>
          Subscriptions
          <span className={s.countFriends}>{props.friends.length}</span>
          <NavLink className={s.rToFriends} to='/friends'>
            ➤
          </NavLink>
        </div>
        <div className={s.friendsList}>
          {props.friends.map(f => (
            <NavLink to={"/profile/" + f.id} className={s.friend}>
              <div className={s.friendsPhoto}>
                <img
                  className={s.friendsAva}
                  src={!f.photo ? profileImg : f.photo}
                />
              </div>
              <div className={s.friendsName}>{f.name}</div>
            </NavLink>
          ))}
        </div>
      </div>

      <div className={s.lastPost}>
        <header className={s.header}>
          <div className={s.headerTitle}>LastPost</div>
        </header>
        <Post
          theme={props.theme}
          profile={props.profile}
          deletePost={props.deletePost}
          addLike={props.addLike}
          id={props.lastPost.id}
          message={props.lastPost.message}
          like={props.lastPost.like}
          dislike={props.lastPost.dislike}
          isDisable={props.lastPost.isDisable}
        />
      </div>
    </div>

    //  </Styleds>
  )
}

export const ProfileData = props => {
  return (
    <div className={s.deploy}>
      <div>
        <b>Full name</b>: {props.profile.fullName}
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
      <span class={s.contacts}>Contacts : </span>{" "}
      {Object.keys(props.profile.contacts).map(key => {
        return {
          /* <Contacts
            contactTitle={key}
            contactValue={props.profile.contacts[key]}
          /> */
        }
      })}
      {props.isOwner && (
        <div>
          <button
            onClick={() => {
              props.setEditMode(true)
            }}
          >
            {" "}
            Edit
          </button>
        </div>
      )}
    </div>
  )
}

const DetailedInfo = props => {
  return (
    <div className={s.descriptionCenter}>
      <div>
        <div className={s.titleInfo}>About me : </div>
        <div className={s.infoText}>{props.profile.aboutMe}</div>
      </div>

      <div
        className={
          s.detailedInformation + " " + (props.deployed ? s.active : "")
        }
      >
        <div className={s.detailedInformationTop}>
          <span className={s.titleInfo}>Looking for a job:</span>
          <span className={s.infoText}>
            {props.profile.lookingForAJob ? "yes" : "no"}{" "}
          </span>
        </div>
        <div className={s.detailedInformationCenter}>
          <span className={s.titleInfo}>My professional skills:</span>
          <span className={s.infoText}>
            {props.profile.lookingForAJobDescription}
          </span>
        </div>
        <div className={s.detailedInformationBot}>
          <span className={s.titleInfo}>Contacts:</span>
          <div className={s.contactsBlock}>
            {Object.keys(props.profile.contacts).map(key => {
              return (
                <div>
                  {!props.profile.contacts[key] ? (
                    <div> </div>
                  ) : (
                    <div className={s.field}>
                      <img
                        className={s.logo}
                        src={
                          props.theme == "lightTheme"
                            ? Icons[key]
                            : IconsWhite[key]
                        }
                      />
                      <div>
                        <span className={s.titleField}>{key} : </span>

                        <a
                          className={s.linkField}
                          href={props.profile.contacts[key]}
                        >
                          {props.profile.contacts[key]}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/*? Deploy will be in the future */}
      {/* {deployed 
                  ? <div onClick={() => {setdeployed(false)}}className={s.detailed} >hide</div> 
                  : <div onClick={() => {setdeployed(true)}}className={s.detailed} >detailed</div>}                        */}
    </div>
  )
}

export default ProfileInfo
