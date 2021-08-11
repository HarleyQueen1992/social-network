import React, { useEffect, useState } from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import { Icons } from "./../../utils/Icons/Icons";
import User from "./Users/User";

const Users = (props) => {
  let res = Icons(props.theme);
  const [focus, setFocus] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  let toggleFocus = () => {
    setIsFocus(!isFocus);
  };
  useEffect(() => {
    props.changeIndex(window.location.href);
  }, [window.location.href]);

  let newUrl = window.location.href;

  if (props.strUrlPrev != newUrl) {
    props.changeIndex(newUrl);
  }

  let users;
  let totalCount;

  if (props.usersSearch.length === 0) {
    users = props.users;

    totalCount = props.totalUsersCount;
  } else {
    users = props.usersSearch;
    totalCount = props.totalUsersCountSearch;
  }
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  });
  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      users.length < totalCount
    ) {
      if (props.usersSearch.length === 0) {
        props.toggleIsFatching(true);
      } else {
        props.toggleIsFatchingSearch(true);
      }
    }
  };
  return (
    <div className={s.usersListPage}>
      <header className={s.header + " " + (focus ? s.headActive : "")}>
        <span className={s.title + " " + (focus ? s.titleActive : "")}>
          Users
        </span>
        <div
          className={s.wrap}
          // onClick={() => {
          //   setFocus(!focus)
          // }}
        >
          <form className={s.forma} action="" autocomplete="off">
            <input
              className={s.search}
              name="search"
              type="text"
              onChange={props.handleChange}
              value={props.value}
              placeholder="Users search"
              onFocus={() => {
                setFocus(!focus);
              }}
              onBlur={() => {
                setFocus(!focus);
                props.resetSearchUsers();
              }}
              // autocomplete='off'
            />
            <img
              src={res["search"]}
              className={s.searchSubmit}
              alt="searchSubmit"
              value="Rechercher"
              type="submit"
            />
          </form>
        </div>
      </header>
      {props.isReceipt ? (
        <Preloader />
      ) : (
        <div className={s.usersList}>
          {props.value !== "" && props.usersSearch.length === 0 ? (
            <div className={s.usersNotFoundError}>No users</div>
          ) : (
            users.map((u) => (
              <User
                login={u.login}
                isAdmin={u.isAdmin}
                profileInfo={props.profileInfo}
                isFollowed={u.isFollowed}
                avatar={u.avatar}
                follow={props.follow}
                unfollow={props.unfollow}
                status={u.status}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
