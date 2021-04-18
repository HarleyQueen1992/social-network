import React, { useState } from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import FriendsBlock from "./FriendsBlock/FriendsBlock";
import burger from "./../../assets/images/burger.png"

const Navbar = (props) => {
    let FriendsElements = props.friends.map(f => <FriendsBlock photo={f.photo} id={f.id} name={f.name}/>)

    const [menuActive, setMenuActive] = useState(false);

    return <nav className={s.nav}>
        {menuActive 
        ?  <div className={s.menu} onClick={() => setMenuActive(false)} >
                <span className={s.headName} >
                    <h3 className={s.name} >Menu</h3>
                </span>
                <div className={s.linkItems } >
                    <NavLink className={s.linkItem} to='/profile'>Profile</NavLink>
                    <NavLink className={s.linkItem} to='/dialogs'>Messages</NavLink>
                    <NavLink className={s.linkItem}  to='/friends'>Friends</NavLink>
                    <NavLink className={s.linkItem} to='/users'>Users</NavLink>
                    <NavLink className={s.linkItem} to='/settings'>Settings</NavLink>
                </div>
                <div onClick={() => {setMenuActive(!menuActive)}} className={s.back} >
                    roll up
                </div>

            </div>
        : <div onClick={()=> {setMenuActive(!menuActive)}} className={s.burger} >
            <img src={burger} />
        </div> }
        
         

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