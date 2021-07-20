import React, { useState, useEffect } from "react"
import s from "./Navbar.module.css"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux"
import { setTheme } from "./../../redux/AppReducer/app-reducer"
import { getTheme } from "./../../redux/AppReducer/app-selectors"
import { logOut } from "./../../redux/AuthReducer/auth-reducer"
import { withRouter } from "react-router-dom"
import Sun from "./../../assets/images/sunW.png"
import Moon from "./../../assets/images/moon.png"
import { Icons } from "./../../utils/Icons/Icons"
import { getProfileInfo } from "../../redux/AuthReducer/auth-selectors"

const Navbar = props => {
  let res = Icons(props.theme)
  const themeToggler = () => {
    props.theme == "lightTheme"
      ? props.setTheme("dark")
      : props.setTheme("light")
  }
  useEffect(() => {
    for (let property in props.theme) {
      document.documentElement.style.setProperty(
        "--" + property,
        props.theme[property]
      )
    }
  }, [props.theme])

  document.onclick = function (e) {
    debugger
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
        className={s.itemProfile}
      >
        <div className={s.profileBlock}>
          <div className={s.avatar}>
            <img
              className={s.avatarImg}
              src={props.profileInfo.photo}
              alt='user avatar'
            />
          </div>
          <div className={s.profileInfo}>
            <div className={s.name}>{props.profileInfo.fullName}</div>
            <div className={s.viewProfile}>View your profile</div>
          </div>
        </div>
        <div className={s.borderBottom}></div>
      </NavLink>
      <div className={s.itemGiveFeedback}>
        <div className={s.giveFeedbackBlock}>
          <div className={s.giveFeedback}>
            <img
              className={s.giveFeedbackImg}
              src={res["giveFeedback"]}
              alt='giveFeedback'
            />
          </div>
          <div className={s.giveFeedbackInfoBlock}>
            <div className={s.giveFeedbackTitle}>Give feedback</div>
            <div className={s.giveFeedbackText}>
              {" "}
              Help us improve the latest version of Mosset.
            </div>
          </div>
        </div>
        <div className={s.borderBottom}></div>
      </div>
      <div className={s.navBar}>
        <NavLink
          to='/settings'
          onClick={() => {
            props.setIsMenuActive(false)
          }}
          className={s.itemSettings}
        >
          <div className={s.settingsLogo}>
            <img
              className={s.settingsImg}
              src={res["settings"]}
              alt='settings img'
            />
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
            {/* <i class='fas fa-moon'></i> */}
            {/* <i class='hu5pjgll lzf7d6o1 sp_voiDzL01CrP sx_e9dc21'></i> */}
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
          className={s.itemLogOut}
          onClick={() => {
            props.logOut()
            props.setIsMenuActive(false)
          }}
        >
          <div className={s.logOutLogo}>
            <img className={s.logOutImg} src={res["logOut"]} alt='logOut img' />
          </div>
          <span className={s.logOutTitle}>Log out</span>
        </div>
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
