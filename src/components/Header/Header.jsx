import React, { useState } from "react"
// import Home from "../../assets/images/homeBlue.png"
// import Profile from "../../assets/images/profileW.png"
import MenuW from "../../assets/images/menuW.png"
import "./Header.css"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Search from "../../assets/images/searchW.png"
import SearchB from "../../assets/images/searchB.png"
import s from "./Header.module.css"
import Navbar from "../Navbar/Navbar"
import { Icons } from "./../../utils/Icons/Icons"
const Header = props => {
  let res = Icons(props.theme, props.index)
  const [focus, setFocus] = useState(false)
  const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > 900)
  const [isMenuActive, setIsMenuActive] = useState(false)
  // let border = (document.querySelector(
  //   "PrivateTabIndicator-colorSecondary-3"
  // ).style.background = "blue")
  let Check = () => {}
  // #1877f2

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      setIsBigScreen(true)
    } else {
      setIsBigScreen(false)
    }
  })
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
            Check()
          }}
        >
          Mosset
        </span>
        <div className={s.wrap + " " + (isBigScreen ? s.disableWran : "")}>
          <form className={s.forma} action='' autocomplete='off'>
            <input
              className={s.search}
              name='search'
              type='text'
              // onChange={props.handleChange}
              // value={props.value}
              placeholder='News search'
              // onFocus={() => {
              //   setFocus(!focus)
              // }}
              onBlur={() => {
                setFocus(!focus)
                // props.resetSearchUsers()
              }}
              autocomplete='off'
            />
            <img
              src={props.theme == "lightTheme" ? SearchB : Search}
              className={s.searchSubmit}
              alt='searchSubmit'
              value='Rechercher'
              type='submit'
            />
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
              <img className={s.categoriesImg} alt='home' src={res["home"]} />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img
                className={s.categoriesImg}
                alt='profile'
                src={res["profile"]}
              />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img className={s.categoriesImg} alt='posts' src={res["posts"]} />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img className={s.categoriesImg} alt='users' src={res["users"]} />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img
                className={s.categoriesImg}
                alt='subscribers'
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
                <img className={s.categoriesImg} alt='menu' src={MenuW} />
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
          <form className={s.forma} action='' autocomplete='off'>
            <input
              className={s.search}
              name='search'
              type='text'
              // onChange={props.handleChange}
              // value={props.value}
              placeholder='News search'
              onFocus={() => {
                setFocus(!focus)
              }}
              onBlur={() => {
                setFocus(!focus)
                // props.resetSearchUsers()
              }}
              autocomplete='off'
            />
            <img
              src={props.theme == "lightTheme" ? SearchB : Search}
              className={s.searchSubmit}
              alt='searchSubmit'
              value='Rechercher'
              type='submit'
            />
          </form>
        </div>
      )}
      {isBigScreen && (
        <div
          className={
            s.menuBlock + " " + (isMenuActive ? s.activeMenublock : "")
          }
          onClick={() => {
            setIsMenuActive(!isMenuActive)
          }}
        >
          {/* <i class='fa fa-play'></i> */}
          <img className={s.menuImg} src={res["arrowDown"]} alt='menu img' />
        </div>
      )}
      {isBigScreen && isMenuActive && (
        <Navbar setIsMenuActive={setIsMenuActive} isMenuActive={isMenuActive} />
      )}
    </div>
  )
}

export default Header
