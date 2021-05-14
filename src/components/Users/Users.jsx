import React, { useEffect } from "react"
import s from "./Users.module.css"
import userPhoto from "../../assets/images/user.png"
import { NavLink } from "react-router-dom"
import UsersImg from "./../../assets/images/grou4p.png"
import Preloader from "../common/Preloader/Preloader"
import { Input } from "../common/FromsControls/FormsControls"

const Users = props => {
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
      <header className={s.header}>
        <img className={s.usersImg} alt='usersImg' src={UsersImg} />
        <span className={s.title}>Users</span>
        <div className={s.search}>
          <form>
            <Input
              onChange={props.handleChange}
              // placeholder='sfsdfs'
              className={s.searchUsers}
              type='text'
              value={props.value}
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
              <div className={s.user} key={u.id}>
                <div className={s.photoUsers}>
                  <NavLink to={"/profile/" + u.id}>
                    <img
                      alt='userPhoto'
                      src={u.photo != null ? u.photo : userPhoto}
                      className={s.photo}
                    />
                  </NavLink>
                </div>
                <div className={s.rightPart}>
                  <div className={s.name}>{u.name}</div>
                  <div className={s.status}>
                    {!u.status ? u.status : <span>status: {u.status}</span>}
                  </div>
                  <div className={s.city}>
                    {u.followed ? <span>friend</span> : <span></span>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Users
