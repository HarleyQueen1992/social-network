import React from "react"
import s from "./Menu.module.css"
import { Icons } from "./../../utils/Icons/Icons"
import { HashRouter, Route, NavLink } from "react-router-dom"

const Menu = props => {
  let res = Icons(props.theme)
  return (
    <div className={s.menuBlock}>
      <header className={s.header}>
        <span className={s.titleMenu}>Menu</span>
      </header>
      <NavLink to='/profile' className={s.profileBlock}>
        <div className={s.ava}>
          <img className={s.avaImg} src={props.profileInfo.photo} alt='ava' />
        </div>
        <div className={s.profileInfo}>
          <span className={s.nameProfile}>{props.profileInfo.fullName}</span>
          <span className={s.info}>View your profile</span>
        </div>
      </NavLink>
      <div className={s.gridMenu}>
        <NavLink to='/settings' className={s.settingsBlock}>
          <img src={res["settings"]} alt='settings img' />
          <span>Settings</span>
        </NavLink>
        <div onClick={props.logOut} className={s.logOutBlock}>
          <img src={res["logOut"]} alt='logount img' />
          <span>Log Out</span>
        </div>
      </div>
    </div>
  )
}

export default Menu
