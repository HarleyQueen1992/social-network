import React from "react"
import s from "./Menu.module.css"
import Users from "./../../assets/images/group.png"
import Friends from "./../../assets/images/friends.png"
import Settings from "./../../assets/images/settings3.png"
import Scan from "./../../assets/images/scan.png"
import ScanLight from "./../../assets/images/scanLight.png"
import Search from "./../../assets/images/search.png"
import Ava from './../../assets/images/user.png'
import SettingsW from './../../assets/images/settingsW.png'
import logOut from './../../assets/images/logout.png'
import { HashRouter, Route, NavLink } from "react-router-dom"
import ProfileContainer from "../Profile/ProfileContainer"

const Menu = props => {
  return (
    
    <div className={s.menuBlock} >
      <header className={s.header} >
        <span className={s.titleMenu} >Menu</span>
      </header>
      <NavLink to='/profile' className={s.profileBlock} >
        <div className={s.ava} >
          <img className={s.avaImg} src={props.profileInfo.photo} alt="ava"/>
        </div>
        <div className={s.profileInfo} >
          <span className={s.nameProfile} >{props.profileInfo.fullName}</span>
          <span className={s.info} >View your profile</span>
        </div>
      </NavLink>
      <div className={s.gridMenu} >
        <NavLink to='/settings' className={s.settingsBlock}>
          <img src={SettingsW} alt="settings img"/>
          <span>Settings</span>
        </NavLink>
        <div onClick={props.logOut} className={s.logOutBlock} >
          <img src={logOut} alt="logount img"/>
          <span>Log Out</span>
        </div>
      </div>
    </div>
  )
}

export default Menu