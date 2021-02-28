import React from 'react';
import s from './FriendsBlock.module.css'

const FriendsBlock = (props) => {
    return (
        <div className={s.FriendsBlock}>
            <img
                src="https://sun9-40.userapi.com/impf/c625227/v625227108/14f3a/xJ8zO2ikVk0.jpg?size=200x0&quality=96&crop=0,0,512,512&sign=dcfd1b68b00076cee162b9f9a9f45441&ava=1"/>
            <div className={s.nameFriends}>{props.name}</div>
        </div>
    );
}
export default FriendsBlock;