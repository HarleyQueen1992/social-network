import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './FriendsBlock.module.css'
import defultPhoto from './../../../assets/images/user.png'

const FriendsBlock = (props) => {
    return (
        <NavLink to={'/profile/' + props.id} className={s.FriendsBlock}>
            <img src={!props.photo ? defultPhoto : props.photo} />
            <div className={s.nameFriends}>{props.name}</div>
        </NavLink>
    );
}
export default FriendsBlock;