import React from 'react';
import p from './Post.module.css'
import heart from './../../../../assets/images/heart.png'
import heartDisable from './../../../../assets/images/heartDisable.png'
import avaInPosts from './../../../../assets/images/user.png'

const Post = (props) => {
    debugger
    return (
        <div className={p.postBlock}>
            <div className={p.photoName} >
                <img className={p.postImg}
                    src={!props.profile.photos.small ? avaInPosts : props.profile.photos.small}/>
                <span className={p.userName} >{props.login}</span>    
            </div>
            <div className={p.postText}>
                {props.message}
            </div> 
            <div className={p.botBlock} >
                <div className={p.deleteBlock} >
                    <button className={p.deleteBut} onClick={() => {props.deletePost(props.id)}} >Delete Post</button>
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

);
}

export default Post;