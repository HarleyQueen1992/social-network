import React from "react"
import s from "./Service.module.css"
import Users from "./../../assets/images/grou4p.png"
import Friends from "./../../assets/images/friends2.png"
import Settings from "./../../assets/images/settings3.png"
import Scan from "./../../assets/images/scan.png"
import ScanLight from "./../../assets/images/scanLight.png"
import Search from "./../../assets/images/search.png"
import { NavLink } from "react-router-dom"

const Services = props => {
  return (
    <div className={s.servicesBlock}>
      <header className={s.header}>
        <span className={s.title}>Services</span>
        <img
          alt='scan'
          className={s.scan}
          src={props.theme === "lightTheme" ? ScanLight : Scan}
        />
        <img alt='search' className={s.search} src={Search} />
      </header>
      <div className={s.services}>
        <NavLink to={"/users"} className={s.block}>
          <img alt='users' className={s.Img} src={Users} />
          <div className={s.name}>Users</div>
        </NavLink>
        <NavLink to={"/friends"} className={s.block}>
          <img alt='friends' className={s.Img} src={Friends} />
          <div className={s.name}>Friends</div>
        </NavLink>
        <NavLink to={"/settings"} className={s.block}>
          <img alt='settings' className={s.Img} src={Settings} />
          <div className={s.name}>Settings</div>
        </NavLink>
      </div>
    </div>
  )
}

export default Services
