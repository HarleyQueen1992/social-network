import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import FriendsBlock from "./FriendsBlock/FriendsBlock";

const Navbar = (props) => {
    let FriendsElements = props.friends.map(f => <FriendsBlock id={f.id} name={f.name}/>)
    return <nav className={s.nav}>
        <div className={s.navbar}>
            <div className={s.item}>
                <NavLink to='/profile' className={s.itemLink} activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' className={s.itemLink} activeClassName={s.active}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news' className={s.itemLink} activeClassName={s.active}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' className={s.itemLink} activeClassName={s.active}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' className={s.itemLink} activeClassName={s.active}>Settings</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' className={s.itemLink} activeClassName={s.active}>Users</NavLink>
            </div>
        </div>
        <div className={s.friendsBlock}>
            <NavLink to='/friends' activeClassName={s.active}>Friends</NavLink>
            <div className={s.PositionBlock}>
                {FriendsElements}
            </div>
        </div>
    </nav>
}

export default Navbar;