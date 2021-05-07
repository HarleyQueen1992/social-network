import React, { useEffect } from "react"
import userPhoto from "../../assets/images/user.png"
import { createPages } from "../../utils/pagination"
import { NavLink } from "react-router-dom"
import s from "./Friends.module.css"
import FriendsPage from "./FriendsPage/FriendsPage"
import Pagination from "../common/Pagination/Pagination"
import FriendsImg from "./../../assets/images/friends2.png"
import Preloader from "../common/Preloader/Preloader"

const Friends = props => {
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
        (e.target.documentElement.scrollTop + window.innerHeight) ==
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
      <header className={s.header}>
        <img className={s.friendsImg} src={FriendsImg} />
        <div className={s.title}>Subscriptions</div>
        <div className={s.search}>
          <form>
            <input
              onChange={props.handleChange}
              className={s.searchUsers}
              type='text'
              value={props.value}
            />
          </form>
        </div>
      </header>
      {props.isReceipt ? (
        <Preloader />
      ) : props.value !== "" && props.friendsSearch.length === 0 ? (
        <div className={s.errorNoUsers}>No users</div>
      ) : (
        <div className={s.friends}>
          {friends.map(f => (
            <div className={s.friend}>
              <div className={s.leftPart}>
                <div className={s.photoUsers}>
                  <NavLink to={"/profile/" + f.id}>
                    <img
                      src={f.photo != null ? f.photo : userPhoto}
                      className={s.photo}
                    />
                  </NavLink>
                </div>
              </div>
              <div className={s.rightPart}>
                <span className={s.name}>{f.name}</span>
                <span className={s.writeMessage}>
                  <a href='#'>to write a message</a>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <Pagination currentPage={props.currentPage}
                        pageSize={props.pageSize}
                        totalUsersCount={props.totalFriendsCount}
                        earlyPageNumber={props.earlyPageNumber} 
                        onPageChenged={props.onPageChenged} 
                        increasePageNumber={props.increasePageNumber}/> */}
    </div>
  )
}
export default Friends
