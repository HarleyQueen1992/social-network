import React, { useState } from "react"
import s from "./News.module.css"
import Search from "./../../assets/images/search.png"
import SearchB from "./../../assets/images/searchB.png"
import Notification from "./../../assets/images/notification.png"
import NotificationB from "./../../assets/images/notificationB.png"

import Post from "./../Posts/MyPosts/Post/Post"
import NewsW from "./../../assets/images/news.png"
import NewsB from "./../../assets/images/newsB.png"

const News = props => {
  const [focus, setFocus] = useState(false)
  return (
    <div className={s.newsBlock}>
      {/* <header className={s.header + " " + (focus ? s.active : "")}>
        <img
          className={s.newsImg}
          alt='news'
          src={props.theme == "lightTheme" ? NewsB : NewsW}
        />
        <div className={s.title + " " + (focus ? s.action : "")}>News</div>

        <div className={s.wrap}>
          <form className={s.forma} action='' autocomplete='off'>
            <input
              className={s.search}
              name='search'
              type='text'
              placeholder='Search news'
              onFocus={() => {
                setFocus(!focus)
              }}
              onBlur={() => {
                setFocus(!focus)
              }}
              // autocomplete='off'
            />
            <img
              src={props.theme == "lightTheme" ? SearchB : Search}
              className={s.searchSubmit}
              alt='searchSubmit'
              value='Rechercher'
              type='submit'
            />
          </form>
        </div>
        <img
          className={s.renewImg}
          alt='renew'
          src={props.theme == "lightTheme" ? NotificationB : Notification}
        />
      </header> */}
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
