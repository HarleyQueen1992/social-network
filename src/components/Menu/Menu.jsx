import React, { useEffect } from "react";
import s from "./Menu.module.css";
import { Icons } from "./../../utils/Icons/Icons";
import { HashRouter, Route, NavLink } from "react-router-dom";
import Moon from "./../../assets/images/moon.png";
import Sun from "./../../assets/images/sunW.png";

const Menu = (props) => {
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
  return (
    <div className={s.menuBlock}>
      <header className={s.header}>
        <span className={s.titleMenu}>Menu</span>
      </header>
      <NavLink to="/profile" className={s.profileBlock}>
        <div className={s.ava}>
          <img className={s.avaImg} src={props.profileInfo.avatar} alt="ava" />
        </div>
        <div className={s.profileInfo}>
          <span className={s.nameProfile}>{props.profileInfo.fullname}</span>
          <span className={s.info}>View your profile</span>
        </div>
      </NavLink>
      <div className={s.gridMenu}>
        <div className={s.giveFeedbackItemsBlock}>
          <a
            href="mailto:artemosadach@gmail.com"
            className={s.itemGiveFeedback}
            target="_top"
          >
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
          </a>
        </div>
        <div className={s.columns}>
          <div className={s.leftColumn}>
            <div className={s.themeBlock}>
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
            </div>
          </div>
          <div className={s.rightColumn}>
            <NavLink
              to="#"
              onClick={() => props.setIsPassword(true)}
              className={s.settingsBlock}
            >
              <img src={res["password"]} alt="password img" />
              <span>Change Password</span>
            </NavLink>
            <div onClick={props.logOut} className={s.logOutBlock}>
              <img src={res["logOut"]} alt="logount img" />
              <span>Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
