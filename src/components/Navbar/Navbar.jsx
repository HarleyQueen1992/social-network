import { connect } from "react-redux"
import { compose } from "redux"
import React, { useState } from "react"
import s from "./Navbar.module.css"
import { NavLink } from "react-router-dom"
import Logout from "./../../assets/images/logout.png"
import { logOut } from "../../redux/AuthReducer/auth-reducer"

const Navbar = props => {
  const [menuActive, setMenuActive] = useState(false)

  const logout = () => {
    props.logOut()
  }

  return (
    <div className={s.nav}>
      <div
        onClick={() => {
          setMenuActive(!menuActive)
        }}
        className={s.HeaderBurger + " " + (menuActive ? s.active : "")}
      >
        <span></span>
      </div>
      <div className={s.menu + " " + (menuActive ? s.active : "")}>
        <NavLink
          to='/profile'
          onClick={() => {
            setMenuActive(false)
          }}
          className={s.menuLink}
        >
          Profile
        </NavLink>
        <NavLink
          to='/news'
          onClick={() => {
            setMenuActive(false)
          }}
          className={s.menuLink}
        >
          news
        </NavLink>
        <NavLink
          to='/posts'
          onClick={() => {
            setMenuActive(false)
          }}
          className={s.menuLink}
        >
          posts
        </NavLink>
        <NavLink
          to='/friends'
          onClick={() => {
            setMenuActive(false)
          }}
          className={s.menuLink}
        >
          subscriptions
        </NavLink>
        <NavLink
          to='/users'
          onClick={() => {
            setMenuActive(false)
          }}
          className={s.menuLink}
        >
          users
        </NavLink>
        <NavLink
          to='/settings'
          onClick={() => {
            setMenuActive(false)
          }}
          className={s.menuLink}
        >
          settings
        </NavLink>
        <div className={s.logoutBlock}>
          <img onClick={logout} src={Logout} alt='logout' />
        </div>
      </div>

      <div
        onClick={() => {
          setMenuActive(false)
        }}
        className={s.overlay + " " + (menuActive ? s.active : "")}
      ></div>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

export default compose(connect(mapStateToProps, { logOut }))(Navbar)
