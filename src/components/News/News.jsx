import React from "react"
import s from "./News.module.css"
import Search from "./../../assets/images/search.png"
import Renew from "./../../assets/images/bell.png"
import Post from "./../Posts/MyPosts/Post/Post"
import NewsImg from "./../../assets/images/newspaper.png"

const News = props => {
  return (
    <div className={s.newsBlock}>
      <header className={s.header}>
        <img className={s.newsImg} alt='news' src={NewsImg} />
        <div className={s.title}>News</div>
        <img className={s.searchImg} alt='search' src={Search} />
        <img className={s.renewImg} alt='renew' src={Renew} />
      </header>
      <div className={s.news}>
        {props.posts.map(post => (
          <Post
            key={post.id}
            theme={props.theme}
            profile={{ fullName: "Artem", photo: null }}
            deletePost={props.deletePost}
            addLike={props.addLike}
            id={post.id}
            message={post.body}
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
