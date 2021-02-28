import React from 'react';
import p from './Post.module.css'

const Post = (props) => {
    return (


        <div className={p.item}>
            <div className={p.postMessage}>
            <img
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suicide-squad-margot-robbie-harley-quinn-1553611015.jpg?crop=1xw:0.5xh;center,top&resize=1200:*"/>

            </div>
            <div className={p.messageItem}>{props.message}</div>
            <div className={p.buttons}>
                    <button className={p.but}> {props.like} like</button>

                    <button className={p.but}> {props.dislike} Dislake</button>
            </div>

        </div>

);
}

export default Post;