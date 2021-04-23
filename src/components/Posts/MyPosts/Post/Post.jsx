import React from 'react';
import p from './Post.module.css'
import heart from './../../../../assets/images/heart.png'
import heartDisable from './../../../../assets/images/heartDisable.png'
import avaInPosts from './../../../../assets/images/user.png'
import Comments from './../../../../assets/images/comments.png'

const Post = (props) => {
    return (
        <div className={p.postBlock}>
            <div className={p.photoName} >
                <img className={p.postImg}
                    src={!props.profile.photo ? avaInPosts : props.profile.photo}/>
                <span className={p.userName} >{props.login}</span>
                {/* <div>
                    <img src="" alt=""/>
                </div>     */}
            </div>
            <div className={p.postText}>
                {props.message}
            </div> 
            <div className={p.botBlock} >
                <div className={p.leftBlock} >
                    <div className={p.commentsBlock} >
                        <img className={p.commentsImg} src={Comments} />
                    </div>
                    <div className={p.likeBlock} > 
                        {props.isDisable ?
                        <img onClick={()=> {props.addLike(props.id)}} className={p.heart} src={heartDisable}/> : 
                        <img onClick={()=> {props.addLike(props.id)}} className={p.heart} src={heart}/> 
                        }
                        <span>{props.like}</span>
                        
                    </div>
                    
                </div>
                

            </div>
     

        </div>

);
}

export default Post;