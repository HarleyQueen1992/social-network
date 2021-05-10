import React, { useState } from "react"
import h from "./Header.module.css"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"

import Profile from "./../../assets/images/profile.png"
import News from "./../../assets/images/newspaper.png"
import Posts from "./../../assets/images/chat.png"
import Services from "./../../assets/images/add.png"

const Header = props => {
  return (
    <div className={h.header}>
      <div className={h.navHead}>
        <div className={h.headItem}>
          <NavLink className={h.linkBlock} to={"/news"}>
            <img className={h.imgNews} src={News} />
            <span className={h.headName}>News</span>
          </NavLink>
        </div>
        <div className={h.headItem}>
          <NavLink className={h.linkBlock} to={"/services"}>
            <img className={h.imgServices} src={Services} />
            <span className={h.headName}>Services</span>
          </NavLink>
        </div>
        <div className={h.headItem}>
          <NavLink className={h.linkBlock} to={"/posts"}>
            <img className={h.imgPosts} src={Posts} />
            <span className={h.headName}>Posts</span>
          </NavLink>
        </div>
        <div className={h.headItem}>
          <NavLink className={h.linkBlock} to={"/profile"}>
            <img className={h.imgProfile} src={Profile} />
            <span className={h.headName}>Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

let mapStateToProps = state => {
  return {}
}

export default compose(connect(mapStateToProps, {}), withRouter)(Header)
