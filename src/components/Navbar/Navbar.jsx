import React, { useState } from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import FriendsBlock from "./FriendsBlock/FriendsBlock";
import burger from "./../../assets/images/burger.png"

const Navbar = (props) => {
    let FriendsElements = props.friends.map(f => <FriendsBlock photo={f.photo} id={f.id} name={f.name}/>)

    const [menuActive, setMenuActive] = useState(false);

    return <div className={s.nav} >
        <div onClick={ () => {setMenuActive(!menuActive)}} className={s.HeaderBurger + " " + (menuActive ? s.active : "")} >
            <span></span>
        </div>
        <div className={s.menu + " " + (menuActive ? s.active : "")}  >
            <div onClick={ () => {setMenuActive(false)}} className={s.menuLink}><NavLink to='/profile' >Profile</NavLink> </div>
            <div onClick={ () => {setMenuActive(false)}} className={s.menuLink}><NavLink to='/news' >News</NavLink> </div>
            <div onClick={ () => {setMenuActive(false)}} className={s.menuLink}><NavLink to='/posts' >Posts</NavLink> </div>
            <div onClick={ () => {setMenuActive(false)}} className={s.menuLink}><NavLink to='/users' >Users</NavLink> </div>
            <div onClick={ () => {setMenuActive(false)}} className={s.menuLink}><NavLink to='/settings' >Settings</NavLink> </div>
            
        </div>
        <div onClick={ () => {setMenuActive(false)}} className={s.overlay + " " + (menuActive ? s.active : "")} >
        </div>
    </div>

        
}

export default Navbar;