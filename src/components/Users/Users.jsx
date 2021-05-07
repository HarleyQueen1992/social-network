import React, { useEffect, useState } from "react"
import s from "./Users.module.css"
import userPhoto from "../../assets/images/user.png"
import { createPages } from "../../utils/pagination"
import { NavLink } from "react-router-dom"
import { usersAPI } from "../../API/api"
import Pagination from "../common/Pagination/Pagination"
import axios from "axios"
import UsersImg from "./../../assets/images/grou4p.png"
import Preloader from "../common/Preloader/Preloader"

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
        <img className={s.usersImg} src={UsersImg} />
        <span className={s.title}>Users</span>
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
                      src={u.photo != null ? u.photo : userPhoto}
                      className={s.photo}
                    />
                  </NavLink>
                  {/* <div className={s.followed} >
                        { u.followed
                            ? <button 
                                    disabled={props.followingInProgress.some(id => id === u.id)} 
                                    className={s.but} 
                                    onClick={ () => { props.unfollow(u.id)}}>Unfollow
                            </button> 
                            : <button 
                                    disabled={props.followingInProgress.some(id => id === u.id)} 
                                    className={s.but} 
                                    onClick={ () => { props.follow(u.id)} }>Follow
                            </button> }
                    </div> */}
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
