import React from 'react';
import p from './Post.module.css'
import heart from './../../../../assets/images/heart.png'
import heartDisable from './../../../../assets/images/heartDisable.png'

const Post = (props) => {
    return (
        <div className={p.postBlock}>
            <div className={p.photoName} >
                <img className={p.postImg}
                    src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suicide-squad-margot-robbie-harley-quinn-1553611015.jpg?crop=1xw:0.5xh;center,top&resize=1200:*"/>
                <span className={p.userName} >{props.login}</span>    
            </div>
            <div className={p.postText}>
                {props.message}
            </div> 
            <div className={p.likeBlock} >
                {props.isDisable ?
                <img onClick={()=> {props.addLike(props.id)}} className={p.heart} src={heartDisable}/> : 
                <img onClick={()=> {props.addLike(props.id)}} className={p.heart} src={heart}/> 
                }
                <span>{props.like}</span>
            </div>       

        </div>

);
}

export default Post;