import React from 'react';
import s from './News.module.css'
import Search from './../../assets/images/search.png'
import Renew from './../../assets/images/bell.png'
import p from './../Posts/MyPosts/Post/Post.module.css'
import Comments from './../../assets/images/comments.png'

const News = (props) => {
    return (
        <div className={s.newsBlock} >
            <header className={s.header} >
                <div className={s.title} >
                    News
                </div>
                <img className={s.searchImg} src={Search} />
                <img className={s.renewImg} src={Renew} />
                
            </header>
            <div className={s.news} >
                {props.posts.map(post => (
                    <div className={s.postBlock}>
                    <div className={p.photoName} >
                        {/* <img className={p.postImg}
                            src={!props.profile.photo ? avaInPosts : props.profile.photo}/> */}
                        <span className={p.userName} >Name</span>
                        {/* <div>
                            <img src="" alt=""/>
                        </div>     */}
                    </div>
                    <div className={p.postText}>
                        {post.body}
                    </div> 
                    <div className={p.botBlock} >
                        <div className={p.leftBlock} >
                            <div className={p.commentsBlock} >
                                <img className={p.commentsImg} src={Comments} />
                            </div>
                            {/* <div className={p.likeBlock} > 
                                {props.isDisable ?
                                <img onClick={()=> {props.addLike(props.id)}} className={p.heart} src={heartDisable}/> : 
                                <img onClick={()=> {props.addLike(props.id)}} className={p.heart} src={heart}/> 
                                }
                                <span>{props.like}</span>
                                
                            </div> */}
                            
                        </div>
                        
        
                    </div>
             
        
                </div>
                ))

            }
            </div>
        </div>
    )
}

export default News;