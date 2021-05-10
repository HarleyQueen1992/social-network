import React, { useState } from "react"
import h from "./Header.module.css"
import { NavLink } from "react-router-dom"
import photo from "../../assets/images/user.png"
import Preloader from "../common/Preloader/Preloader"
import play from "./../../assets/images/playAudioPleer.png"
import next from "./../../assets/images/next.png"
import previous from "./../../assets/images/previous.png"
import musicIcon from "./../../assets/images/—Pngtree—music icon_4490549.png"
import Users from "./../../assets/images/users2.png"
import Frieds from "./../../assets/images/friends.png"
import Message from "./../../assets/images/message.png"
import Profile from "./../../assets/images/profile.png"
import News from "./../../assets/images/newspaper.png"
import Posts from "./../../assets/images/chat.png"
import Sub from "./../../assets/images/renew.png"
import Services from "./../../assets/images/add.png"
import styled from "styled-components"

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

export default Header
