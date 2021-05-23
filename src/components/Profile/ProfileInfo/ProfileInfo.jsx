import React, { useState, useEffect } from "react"
import Preloader from "../../common/Preloader/Preloader"
import s from "./ProfileInfo.module.css"
import profileImg from "../../../assets/images/user.png"
import { NavLink } from "react-router-dom"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import { Icons, IconsWhite } from "./../../../utils/Icons/Icons"
import Post from "./../../Posts/MyPosts/Post/Post"

const ProfileInfo = props => {
  let [deployed, setdeployed] = useState(false)
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }
  useEffect(() => {
    setStatus(props.status)
  }, [props.status])
  if (props.profile == null) {
    return <Preloader />
  }
  let srcImg = props.profile.photo
  if (props.profile.photo == null) {
    srcImg = profileImg
  }

  return (
    <div className={s.descriptionBlock}>
      <div className={s.topBlock}>
        <div className={s.avaFollowed}>
          <div className={s.avatar}>
            <div className={s.topDescriptionLeft}>
              <div>
                {props.isSavingPhoto ? (
                  <div className={s.preloader}>
                    {" "}
                    <Preloader />{" "}
                  </div>
                ) : (
                  <img className={s.ava} alt='Avatar' src={srcImg} />
                )}
              </div>
            </div>
          </div>

          {props.isOwner || (
            <div className={s.followedBlock}>
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
        </div>

        <div className={s.rightTopDescription}>
          <div className={s.topName}>{props.profile.fullName}</div>
          <div className={s.centerStatus}>
            <div className={s.info}>
              <ProfileStatusWithHooks
                status={props.status}
                updateStatus={props.updateStatus}
                editMode={editMode}
                statusState={status}
                setStatus={setStatus}
                setEditMode={setEditMode}
                deactivateEditMode={deactivateEditMode}
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
        {props.isOwner &&
          (!editMode ? (
            <div className={s.editBlock}>
              <label
                className={s.edit}
                onClick={() => {
                  setEditMode(!editMode)
                }}
              >
                <span>Edit status</span>
              </label>
            </div>
          ) : (
            <div className={s.editBlock}>
              <label
                className={s.edit}
                onClick={() => {
                  deactivateEditMode()
                }}
              >
                <span>Save</span>
              </label>
            </div>
          ))}
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
            <NavLink to={"/profile/" + f.id} key={f.id} className={s.friend}>
              <div className={s.friendsPhoto}>
                <img
                  className={s.friendsAva}
                  alt='friends avatar'
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
          <NavLink to='/posts/' className={s.headerTitleRight}>
            All posts ➤
          </NavLink>
        </header>
        <Post
          key={props.lastPost.id}
          theme={props.theme}
          profile={props.profile}
          deletePost={props.deletePost}
          addLike={props.addLike}
          id={props.lastPost.id}
          title={props.lastPost.title}
          message={props.lastPost.message}
          like={props.lastPost.like}
          dislike={props.lastPost.dislike}
          isDisable={props.lastPost.isDisable}
        />
      </div>
    </div>
  )
}

const DetailedInfo = props => {
  let contacts = 0
  Object.keys(props.profile.contacts).map(key => {
    if (props.profile.contacts[key] === null) {
      contacts += 1
    }
  })
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
        {props.profile.lookingForAJobDescription !== "" &&
          props.profile.lookingForAJobDescription !== null && (
            <div className={s.detailedInformationCenter}>
              <span className={s.titleInfo}>My professional skills:</span>
              <span className={s.infoText}>
                {props.profile.lookingForAJobDescription}
              </span>
            </div>
          )}
        {contacts !== 8 && (
          <div className={s.detailedInformationBot}>
            <span className={s.titleInfo}>Contacts:</span>
            <div className={s.contactsBlock}>
              {Object.keys(props.profile.contacts).map(key => {
                return (
                  <div key={key}>
                    {!props.profile.contacts[key] ? (
                      <div> </div>
                    ) : (
                      <div className={s.field}>
                        <img
                          className={s.logo}
                          alt='logo contacts'
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
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
