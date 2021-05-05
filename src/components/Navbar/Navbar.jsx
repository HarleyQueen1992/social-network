import React, { useState } from "react"
import s from "./Navbar.module.css"
import { NavLink } from "react-router-dom"
import FriendsBlock from "./FriendsBlock/FriendsBlock"
import burger from "./../../assets/images/burger.png"

const Navbar = props => {
  const [menuActive, setMenuActive] = useState(false)

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

export default Navbar
