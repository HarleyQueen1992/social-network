import React, { useState } from "react"
import h from "./Navbar.module.css"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import Profile from "./../../assets/images/profile.png"
import News from "./../../assets/images/newsB.png"
import Posts from "./../../assets/images/chat.png"
import Services from "./../../assets/images/add.png"

const Header = props => {
  let [headerBlur, setHeaderBlur] = useState(false)

  const [menuActive, setMenuActive] = useState(false)

  let [height] = useState(window.innerHeight)
  // export const had = () => {
  //   setHeaderBlur(true)
  // }
  window.addEventListener("resize", function () {
    if (height * 0.7 > window.innerHeight) {
      setHeaderBlur(true)
    } else {
      setHeaderBlur(false)
    }
  })
  return (
    <>
<div className={h.menuBlock + " " + (menuActive ? h.menuBlockActive : "")}>
      
      <div className={h.menu + " " + (menuActive ? h.menuActive : "")}>
        <NavLink to='/news' onClick={() => {
          setMenuActive(false)
        }} >News</NavLink>
        <NavLink to='/posts' onClick={() => {
          setMenuActive(false)
        }}>Posts</NavLink>
        <NavLink to='/profile' onClick={() => {
          setMenuActive(false)
        }}>Profile</NavLink>
        <NavLink to='/users' onClick={() => {
          setMenuActive(false)
        }}>Users</NavLink>
        <NavLink to='/friends' onClick={() => {
          setMenuActive(false)
        }}>Friends</NavLink>
        <NavLink to='/settings' onClick={() => {
          setMenuActive(false)
        }}>Settings</NavLink>
      </div>
      <div
        onClick={() => {
          setMenuActive(!menuActive)
        }}
        className={h.burger + " " + (menuActive ? h.burgerActive : "")}
      >
        <div className={h.burgerLine} />
      </div>
    </div>
    <div className={h.allScreen + " " + (menuActive ? h.allScreenActive: "")} onClick={() => {
        setMenuActive(false)
      }} ></div>
    </>
    

    // <div className={h.header + " " + (headerBlur ? h.active : "")}>
    //   <div className={h.navHead}>
    //     <NavLink className={h.linkBlock} to={"/news"}>
    //       <img alt='news' className={h.imgNews} src={News} />
    //       <span className={h.headName}>News</span>
    //     </NavLink>
    //     <NavLink className={h.linkBlock} to={"/services"}>
    //       <img alt='services' className={h.imgServices} src={Services} />
    //       <span className={h.headName}>Services</span>
    //     </NavLink>
    //     <NavLink className={h.linkBlock} to={"/posts"}>
    //       <img alt='posts' className={h.imgPosts} src={Posts} />
    //       <span className={h.headName}>Posts</span>
    //     </NavLink>
    //     <NavLink className={h.linkBlock} to={"/profile"}>
    //       <img alt='profile' className={h.imgProfile} src={Profile} />
    //       <span className={h.headName}>Profile</span>
    //     </NavLink>
    //   </div>
    // </div>
  )
}

let mapStateToProps = state => {
  return {}
}

export default compose(connect(mapStateToProps, {}), withRouter)(Header)
