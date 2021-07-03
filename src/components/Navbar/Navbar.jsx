import React, { useState } from "react"
import s from "./Navbar.module.css"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux"
import { setTheme } from "./../../redux/AppReducer/app-reducer"
import { getTheme } from "./../../redux/AppReducer/app-selectors"
import { logOut } from "./../../redux/AuthReducer/auth-reducer"
import { withRouter } from "react-router-dom"
import Sun from "./../../assets/images/sun.png"
import Moon from "./../../assets/images/moon.png"
import logOutW from "./../../assets/images/logout.png"
import SettingsW from "./../../assets/images/settingsW.png"
import { getProfileInfo } from "../../redux/AuthReducer/auth-selectors"

const Navbar = props => {
  const themeToggler = () => {
    props.theme == "lightTheme"
      ? props.setTheme("dark")
      : props.setTheme("light")
  }

  document.onclick = function (e) {
    if (
      e.target.className
        .replace(/[^a-zA-Z ]/g, " ")
        .split(/\s+|\./)
        .filter(
          word =>
            (word === "Navbar") | (word === "menuBlock") | (word === "menuImg")
        ).length == 0
    ) {
      props.setIsMenuActive(false)
    }
  }

  return (
    <div className={s.navBarList}>
      <NavLink
        to='/profile'
        onClick={() => {
          props.setIsMenuActive(false)
        }}
        className={s.items}
      >
        <div className={s.avatar}>
          <img
            className={s.avatarImg}
            src={props.profileInfo.photo}
            alt='user avatar'
          />
        </div>
        <div className={s.name}>{props.profileInfo.fullName}</div>
      </NavLink>
      <NavLink
        to='/settings'
        onClick={() => {
          props.setIsMenuActive(false)
        }}
        className={s.items}
      >
        <div className={s.settingsLogo}>
          <img className={s.settingsImg} src={SettingsW} alt='settings img' />
        </div>
        <span className={s.settingsTitle}>Settings</span>
      </NavLink>
      <div className={s.themeItems}>
        <input
          onClick={() => {
            themeToggler()
          }}
          type='checkbox'
          className={s.checkbox}
          id='chk'
        />
        <label className={s.label} htmlFor='chk'>
          <img className={s.img} alt='moon' src={Moon} />
          <img className={s.img} alt='sun' src={Sun} />
          <div
            className={
              s.ball + " " + (props.theme == "lightTheme" ? s.active : "")
            }
          ></div>
        </label>
        <div className={s.themeTitle}>Theme</div>
      </div>
      <div
        className={s.items}
        onClick={() => {
          props.logOut()
          props.setIsMenuActive(false)
        }}
      >
        <div className={s.logOutLogo}>
          <img className={s.logOutImg} src={logOutW} alt='logOut img' />
        </div>
        <span className={s.logOutTitle}>logOut</span>
      </div>
    </div>
  )
}
let mapStateToProps = state => {
  return {
    theme: getTheme(state),
    profileInfo: getProfileInfo(state),
  }
}
export default compose(
  connect(mapStateToProps, { setTheme, logOut }),
  withRouter
)(Navbar)
