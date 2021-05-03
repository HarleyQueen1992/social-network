import React from "react"
import s from "./News.module.css"
import Search from "./../../assets/images/search.png"
import Renew from "./../../assets/images/bell.png"
import p from "./../Posts/MyPosts/Post/Post.module.css"
import Comments from "./../../assets/images/comments.png"
import Post from "./../Posts/MyPosts/Post/Post"
import NewsImg from "./../../assets/images/newspaper.png"

const News = props => {
  return (
    <div className={s.newsBlock}>
      <header className={s.header}>
        <img className={s.newsImg} src={NewsImg} />
        <div className={s.title}>News</div>
        <img className={s.searchImg} src={Search} />
        <img className={s.renewImg} src={Renew} />
      </header>
      <div className={s.news}>
        {props.posts.map(post => (
          <Post
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
