import React, { useEffect, useState } from "react"
import s from "./Users.module.css"
import userPhoto from "../../assets/images/user.png"
import { createPages } from "../../utils/pagination"
import { NavLink } from "react-router-dom"
import { usersAPI } from "../../API/api"
import Pagination from "../common/Pagination/Pagination"
import axios from "axios"
import UsersImg from "./../../assets/images/grou4p.png"

const Users = props => {
  let users = !props.usersSearch ? props.users : props.usersSearch
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
      props.users.length < props.totalUsersCount
    ) {
      props.toggleIsFatching(true)
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
      <div className={s.users}>
        {users.map(u => (
          <div className={s.user} key={u.id}>
            <div className={s.leftPart}>
              <div className={s.photoUsers}>
                <NavLink to={"/profile/" + u.id}>
                  <img
                    src={u.photo != null ? u.photo : userPhoto}
                    className={s.photo}
                  />
                </NavLink>
              </div>
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
              <div className={s.country}>{/* {u.location.country}, */}</div>
            </div>
          </div>
        ))}
      </div>
      {/* <Pagination totalUsersCount={props.totalUsersCount}
                                pageSize={props.pageSize}
                                currentPage={props.currentPage}
                                earlyPageNumber={props.earlyPageNumber} 
                                onPageChenged={props.onPageChenged} 
                                increasePageNumber={props.increasePageNumber}/> */}
    </div>
  )
}

export default Users
