import React, { useState } from "react";
// import Home from "../../assets/images/homeBlue.png"
// import Profile from "../../assets/images/profileW.png"
import MenuW from "../../assets/images/menuW.png";
import "./Header.css";
import Tabs from "@material-ui/core/Tabs";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Tab from "@material-ui/core/Tab";
import s from "./Header.module.css";
import Navbar from "../Navbar/Navbar";
import { Icons } from "./../../utils/Icons/Icons";
import searchWhite from "./../../assets/images/searchWhite.png";
import { getMenuActive } from "../../redux/AppReducer/app-selectors";
import { setMenuActive } from "../../redux/AppReducer/app-reducer";

const Header = (props) => {
  let res = Icons(props.theme, props.index);
  const [focus, setFocus] = useState(false);
  const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > 900);

  // let border = (document.querySelector(
  //   "PrivateTabIndicator-colorSecondary-3"
  // ).style.background = "blue")
  let Check = () => {};
  // #1877f2

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      setIsBigScreen(true);
    } else {
      setIsBigScreen(false);
    }
  });
  document.onclick = function (e) {
    if (
      e.target.className
        .replace(/[^a-zA-Z ]/g, " ")
        .split(/\s+|\./)
        .filter(
          (word) =>
            (word === "Navbar") | (word === "menuBlock") | (word === "menuImg")
        ).length == 0
    ) {
      props.setMenuActive(false);
    }
  };

  return (
    <div
      className={
        s.header +
        " " +
        (props.index != 0 && !isBigScreen ? s.roll : "") +
        " " +
        (focus && isBigScreen ? s.inputActive : "")
      }
    >
      {/* {
        (document.querySelector(
          ".PrivateTabIndicator-colorSecondary-3"
        ).style.background = "#1877f2")
      } */}
      <div className={s.titleSite}>
        <span
          className={s.logo}
          onClick={() => {
            Check();
          }}
        >
          Mosset
        </span>
        <div className={s.wrap + " " + (isBigScreen ? s.disableWran : "")}>
          <form className={s.forma} action="" autocomplete="off">
            <input
              className={s.search}
              name="search"
              type="text"
              // onChange={props.handleChange}
              // value={props.value}
              placeholder="News search"
              // onFocus={() => {
              //   setFocus(!focus)
              // }}
              onBlur={() => {
                setFocus(!focus);
                // props.resetSearchUsers()
              }}
              autocomplete="off"
            />
            <div className={s.searchSubmitBlockSmall}>
              <img
                src={searchWhite}
                className={s.searchSubmit}
                alt="searchSubmit"
                value="Rechercher"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>

      <Tabs
        value={props.index}
        className={
          s.listOfCategories +
          " " +
          (focus && isBigScreen ? s.listOfCategoriesSmall : "")
        }
        onChange={props.handleChange}
      >
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img className={s.categoriesImg} alt="home" src={res["home"]} />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img
                className={s.categoriesImg}
                alt="profile"
                src={res["profile"]}
              />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img className={s.categoriesImg} alt="posts" src={res["posts"]} />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img className={s.categoriesImg} alt="users" src={res["users"]} />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img
                className={s.categoriesImg}
                alt="subscribers"
                src={res["friends"]}
              />
            </div>
          }
        />
        {!isBigScreen && (
          <Tab
            className={s.tab}
            label={
              <div className={s.category}>
                <img className={s.categoriesImg} alt="menu" src={res["menu"]} />
              </div>
            }
          />
        )}
      </Tabs>
      {isBigScreen && (
        <div
          className={s.wrapRight}
          // onClick={() => {
          //   setFocus(!focus)
          // }}
        >
          <form className={s.forma} action="" autocomplete="off">
            <input
              className={s.search + " " + (focus ? s.searchActive : "")}
              name="search"
              type="text"
              // onChange={props.handleChange}
              // value={props.value}
              placeholder="News search"
              onFocus={() => {
                setFocus(!focus);
              }}
              onBlur={() => {
                setFocus(!focus);
                // props.resetSearchUsers()
              }}
              autocomplete="off"
            />
            <div className={s.searchSubmitBlock}>
              <img
                src={res["search"]}
                className={s.searchSubmit}
                alt="searchSubmit"
                value="Rechercher"
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
      {isBigScreen && (
        <div
          className={
            s.menuBlock + " " + (props.isMenuActive ? s.activeMenublock : "")
          }
          onClick={() => {
            props.setMenuActive(!props.isMenuActive);
          }}
        >
          {/* <i class='fa fa-play'></i> */}
          <img className={s.menuImg} src={res["arrowDown"]} alt="menu img" />
        </div>
      )}
      {isBigScreen && props.isMenuActive && (
        <Navbar
          setIsMenuActive={props.setMenuActive}
          isMenuActive={props.isMenuActive}
        />
      )}
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    isMenuActive: getMenuActive(state),
  };
};
export default compose(
  connect(mapStateToProps, { setMenuActive }),
  withRouter
)(Header);
