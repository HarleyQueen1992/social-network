import React, { useEffect, useState } from "react"
import userPhoto from "../../assets/images/user.png"
import { NavLink } from "react-router-dom"
import s from "./Friends.module.css"
import FriendsImg from "./../../assets/images/friends.png"
import Preloader from "../common/Preloader/Preloader"
import { Input } from "../common/FromsControls/FormsControls"
import Search from "./../../assets/images/searchW.png"
import SearchB from "./../../assets/images/searchB.png"

const Friends = props => {
  const [focus, setFocus] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  let toggleFocus = () => {
    setIsFocus(!isFocus)
  }

  let newUrl = window.location.href

  if (props.strUrlPrev != newUrl) {
    props.changeIndex(newUrl)
  }

  let friends
  let totalCount

  if (props.friendsSearch.length === 0) {
    friends = props.friends
    totalCount = props.totalFriendsCount
  } else {
    friends = props.friendsSearch
    totalCount = props.totalFriendsCountSearch
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
        (e.target.documentElement.scrollTop + window.innerHeight) ===
        0 &&
      friends.length < totalCount
    ) {
      if (props.friendsSearch.length === 0) {
        props.toggleIsFatching(true)
      } else {
        props.toggleIsFatchingSearch(true)
      }
    }
  }

  return (
    <div className={s.friendsBlock}>
      <header className={s.header + ' ' + (focus ? s.headActive : '')}>
        {/* <img className={s.friendsImg} alt='friendsLogo' src={FriendsImg} /> */}
        <div className={s.title + ' ' + (focus ? s.titleActive : '')}>Subscriptions</div>
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
        {/* <div className={s.search}>
          <form>
            <Input
              onChange={props.handleChange}
              className={s.searchUsers}
              type='text'
              value={props.value}
            />
          </form>
        </div> */}
      </header>
      {props.isReceipt ? (
        <Preloader />
      ) : props.value !== "" && props.friendsSearch.length === 0 ? (
        <div className={s.errorNoUsers}>No users </div>
      ) : friends.length === 0 ? (
        <div className={s.friendsBlockError}>
          <h2>You are not subscribed to anyone</h2>
          <NavLink to='/users/'>Let's see who you can subscribe to</NavLink>
        </div>
      ) : (
        <div className={s.friends}>
          {friends.map(f => (
            <div key={f.id} className={s.friend}>
              <div className={s.leftPart}>
                <div className={s.photoUsers}>
                  <NavLink to={"/profile/" + f.id}>
                    <img
                      alt='userphoto'
                      src={f.photo != null ? f.photo : userPhoto}
                      className={s.photo}
                    />
                  </NavLink>
                </div>
              </div>
              <div className={s.rightPart}>
                <span className={s.name}>{f.name}</span>
                <span className={s.buttonsBlock} >
                  <button className={s.viewPosts} >View posts</button>
                  <button onClick={() => {props.unfollow(f.id)}} className={s.unfollow} >Unsubscribe</button>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Friends
