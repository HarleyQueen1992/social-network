import React, { useState } from "react"
import Home from "../../assets/images/homeW.png"
import Profile from "../../assets/images/profileW.png"
import Posts from "../../assets/images/postsW.png"
import UsersW from "../../assets/images/usersW.png"
import MenuW from "../../assets/images/menuW.png"
import FriendsW from "../../assets/images/friendsW.png"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Search from "../../assets/images/searchW.png"
import SearchB from "../../assets/images/searchB.png"
import s from "./Header.module.css"

const Header = props => {
  const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > 800)
  window.addEventListener("resize", function () {
    if (window.innerWidth > 800) {
      setIsBigScreen(true)
    } else {
      setIsBigScreen(false)
    }
  })
  return (
    <div
      className={
        s.header + " " + (props.index != 0 && !isBigScreen ? s.roll : "")
      }
    >
      <div className={s.titleSite}>
        <span className={s.logo}>Mosset</span>
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
              // onBlur={() => {
              //   setFocus(!focus)
              //   props.resetSearchUsers()
              // }}
              // autocomplete='off'
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
        className={s.listOfCategories}
        onChange={props.handleChange}
      >
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img className={s.categoriesImg} alt='home' src={Home} />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img className={s.categoriesImg} alt='profile' src={Profile} />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img className={s.categoriesImg} alt='posts' src={Posts} />
            </div>
          }
        />
        <Tab
          className={s.tab}
          label={
            <div className={s.category}>
              <img className={s.categoriesImg} alt='users' src={UsersW} />
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
                src={FriendsW}
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
        <div className={s.wrapRight}>
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
              // onBlur={() => {
              //   setFocus(!focus)
              //   props.resetSearchUsers()
              // }}
              // autocomplete='off'
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
    </div>
  )
}

export default Header
