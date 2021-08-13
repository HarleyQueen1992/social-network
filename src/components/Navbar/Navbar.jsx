import React, { useState, useEffect } from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  setTheme,
  setIsPassword,
  updateTheme,
} from "./../../redux/AppReducer/app-reducer";
import { getTheme } from "./../../redux/AppReducer/app-selectors";
import { logOut } from "./../../redux/AuthReducer/auth-reducer";
import { withRouter } from "react-router-dom";
import Sun from "./../../assets/images/sunW.png";
import UserProfile from "./../../assets/images/user.png";
import Moon from "./../../assets/images/moon.png";
import { Icons } from "./../../utils/Icons/Icons";
import { getProfileInfo } from "../../redux/AuthReducer/auth-selectors";

const Navbar = (props) => {
  localStorage.setItem("theme", props.theme);
  let res = Icons(props.theme);
  const themeToggler = () => {
    props.theme == "light"
      ? props.updateTheme("dark")
      : props.updateTheme("light");
  };
  useEffect(() => {
    for (let property in props.theme) {
      document.documentElement.style.setProperty(
        "--" + property,
        props.theme[property]
      );
    }
  }, [props.theme]);

  if (props.isMenuActive) {
    document.onclick = function (e) {
      if (
        e.target.className
          .replace(/[^a-zA-Z ]/g, " ")
          .split(/\s+|\./)
          .filter(
            (word) =>
              (word === "Navbar") |
              (word === "menuBlock") |
              (word === "menuImg")
          ).length == 0
      ) {
        props.setIsMenuActive(false);
      }
    };
  }

  return (
    <div className={s.navBarList}>
      <NavLink
        to="/profile"
        onClick={() => {
          props.setIsMenuActive(false);
        }}
        className={s.itemProfile}
      >
        <div className={s.profileBlock}>
          <div className={s.avatar}>
            <img
              className={s.avatarImg}
              src={
                props.profileInfo.avatar == ""
                  ? UserProfile
                  : props.profileInfo.avatar
              }
              alt="user avatar"
            />
          </div>
          <div className={s.profileInfo}>
            <div className={s.name}>{props.profileInfo.fullname}</div>
            <div className={s.viewProfile}>View your profile</div>
          </div>
        </div>
        <div className={s.borderBottom}></div>
      </NavLink>
      <a
        href="mailto:artemosadach@gmail.com"
        target="_top"
        className={s.itemGiveFeedback}
      >
        {/* <input className={s.inputSubmit} type="submit" id="submit" /> */}
        <div className={s.giveFeedbackBlock}>
          <div className={s.giveFeedback}>
            <img
              className={s.giveFeedbackImg}
              src={res["giveFeedback"]}
              alt="giveFeedback"
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
      </a>
      <div className={s.navBar}>
        <div
          onClick={() => {
            props.setIsMenuActive(false);
            props.setIsPassword(true);
            document.querySelector("body").style.cssText = "overflow: hidden;";
          }}
          className={s.itemSettings}
        >
          <div className={s.settingsLogo}>
            <img
              className={s.settingsImg}
              src={res["password"]}
              alt="password img"
            />
          </div>
          <span className={s.settingsTitle}>Change Password</span>
        </div>
        <div className={s.themeItems}>
          <input
            onClick={() => {
              themeToggler();
            }}
            type="checkbox"
            className={s.checkbox}
            id="chk"
          />
          <label className={s.label} htmlFor="chk">
            {/* <i class='fas fa-moon'></i> */}
            {/* <i class='hu5pjgll lzf7d6o1 sp_voiDzL01CrP sx_e9dc21'></i> */}
            <img className={s.img} alt="moon" src={Moon} />
            <img className={s.img} alt="sun" src={Sun} />
            <div
              className={
                s.ball + " " + (props.theme == "light" ? s.active : "")
              }
            ></div>
          </label>
          <div className={s.themeTitle}>Theme</div>
        </div>
        <div
          className={s.itemLogOut}
          onClick={() => {
            props.logOut();
            props.setIsMenuActive(false);
          }}
        >
          <div className={s.logOutLogo}>
            <img className={s.logOutImg} src={res["logOut"]} alt="logOut img" />
          </div>
          <span className={s.logOutTitle}>Log out</span>
        </div>
      </div>
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    theme: getTheme(state),
    profileInfo: getProfileInfo(state),
  };
};
export default compose(
  connect(mapStateToProps, { setTheme, logOut, setIsPassword, updateTheme }),
  withRouter
)(Navbar);
