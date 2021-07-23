import React, { useState } from "react"
import s from "./News.module.css"
import Notification from "./../../assets/images/notification.png"
import NotificationB from "./../../assets/images/notificationB.png"
import ProfilePhoto from "./../../assets/images/user.png"
import Post from "./../Posts/MyPosts/Post/Post"

const News = props => {
  const [focus, setFocus] = useState(false)
  let newUrl = window.location.href
  if (props.strUrlPrev != newUrl) {
    props.changeIndex(newUrl)
  }

  return (
    <div className={s.newsListPage}>
      <div className={s.anythingNewBlock}>
        <div className={s.anythingNewProfilePhotoBlock}>
          <img
            className={s.anythingNewProfilePhoto}
            src={ProfilePhoto}
            alt='profile photo'
          />
        </div>
        <div className={s.anythingNew}>
          <span>Anything new?</span>
        </div>
      </div>
      <div className={s.news}>
        {props.posts.map(post => (
          <Post
            border={true}
            key={post.id}
            theme={props.theme}
            profile={{ fullName: "Artem", photo: null }}
            deletePost={props.deletePost}
            addLike={props.addLike}
            id={post.id}
            title={post.title}
            message={post.message}
            like={post.like}
            dislike={post.dislike}
            isDisable={post.isDisable}
          />
        ))}
      </div>
    </div>
  )
}

export default News
