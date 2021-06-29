import React, { useEffect, useState } from "react"
import s from "./Users.module.css"
import userPhoto from "../../assets/images/user.png"
import { NavLink } from "react-router-dom"
import UsersImg from "./../../assets/images/groupBig.png"
import Preloader from "../common/Preloader/Preloader"
import Search from "./../../assets/images/searchW.png"
import SearchB from "./../../assets/images/searchB.png"
import { Input } from "../common/FromsControls/FormsControls"

const Users = props => {
  const [focus, setFocus] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  let toggleFocus = () => {
    setIsFocus(!isFocus)
  }

  let newUrl = window.location.href

  if (props.strUrlPrev != newUrl) {
    props.changeIndex(newUrl)
  }

  let users
  let totalCount

  if (props.usersSearch.length === 0) {
    users = props.users
    totalCount = props.totalUsersCount
  } else {
    users = props.usersSearch
    totalCount = props.totalUsersCountSearch
  }

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return function () {
      document.removeEventListener("scroll", scrollHandler)
    }
  })
  const scrollHandler = e => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      users.length < totalCount
    ) {
      if (props.usersSearch.length === 0) {
        props.toggleIsFatching(true)
      } else {
        props.toggleIsFatchingSearch(true)
      }
    }
  }
  return (
    <div className={s.usersBlock}>
      <header className={s.header + ' ' + (focus ? s.headActive : '')}>
        <span className={s.title + ' ' + (focus ? s.titleActive : '')}>Users</span>
        <div
            className={s.wrap}
            // onClick={() => {
            //   setFocus(!focus)
            // }}
          >
            <form className={s.forma} action='' autocomplete='off'>
              <input
                className={s.search}
                name='search'
                type='text'
                placeholder='Subscriptions search'
                onFocus={() => {
                  setFocus(!focus)
                }}
                onBlur={() => {
                  setFocus(!focus)
                }}
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
      </header>
      {props.isReceipt ? (
        <Preloader />
      ) : (
        <div className={s.users}>
          {props.value !== "" && props.usersSearch.length === 0 ? (
            <div className={s.errorNoUsers}>No users</div>
          ) : (
            users.map(u => (
              <NavLink to={"/profile/" + u.id} className={s.user} key={u.id}>
                <div className={s.photoUsers}>
                    <img
                      alt='userPhoto'
                      src={u.photo != null ? u.photo : userPhoto}
                      className={s.photo}
                    />
                </div>
                <div className={s.rightPart}>
                  <div className={s.name}>{u.name}</div>
                  <div className={s.buttonsBlock} >
                    <NavLink to='#' className={s.subscribers}>
                      {u.followed ? 
                        <button onClick={() => {props.unfollow(u.id)}} className={s.subscribeBtn} >Subscribe</button> : 
                        <button onClick={() => {props.follow(u.id)}} className={s.unsubscribeBtn} >Unsubscribe</button>}
                    </NavLink>
                    <NavLink to='#' className={s.viewPosts} >
                        <button className={s.viewPostsBtn} >View Posts</button>
                    </NavLink>

                  </div>
                  
                </div>
              </NavLink>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Users
