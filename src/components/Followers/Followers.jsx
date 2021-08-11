import React, { useState, useEffect } from "react";
import Preloader from "../common/Preloader/Preloader";
import { Icons } from "../../utils/Icons/Icons";
import { NavLink } from "react-router-dom";
import userPhoto from "./../../assets/images/user.png";

import s from "./Followers.module.css";
import User from "../Users/Users/User";

const Followers = (props) => {
  const [focus, setFocus] = useState(false);
  let res = Icons(props.theme);
  let followers;
  let totalCount;
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  });
  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) ===
        0 &&
      followers.length < totalCount
    ) {
      if (props.followersSearch.length === 0) {
        props.toggleIsFatching(true);
      } else {
        props.toggleIsFatchingSearch(true);
      }
    }
  };
  if (props.followersSearch.length === 0) {
    followers = props.followers;
    totalCount = props.totalFollowersCount;
  } else {
    followers = props.followersSearch;
    totalCount = props.totalFollowersCountSearch;
  }
  return (
    <div className={s.friendsBlock}>
      <header className={s.header + " " + (focus ? s.headActive : "")}>
        {/* <img className={s.friendsImg} alt='friendsLogo' src={FriendsImg} /> */}
        <div className={s.title + " " + (focus ? s.titleActive : "")}>
          Followers
        </div>
        <div
          className={s.wrap}
          // onClick={() => {
          //   setFocus(!focus)
          // }}
        >
          <form className={s.forma} action="" autocomplete="off">
            <input
              className={s.search}
              onChange={props.handleChange}
              value={props.value}
              name="search"
              type="text"
              placeholder="Followers search"
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
      ) : props.value !== "" && props.followersSearch.length === 0 ? (
        <div className={s.errorNoUsers}>No users </div>
      ) : props.followers.length === 0 ? (
        <div className={s.friendsBlockError}>
          <h2>You are not subscribed to anyone</h2>
          <NavLink to="/users/">Let's see who you can subscribe to</NavLink>
        </div>
      ) : (
        <div className={s.friends}>
          {followers.map((f) => (
            <User
              login={f.login}
              isAdmin={f.isAdmin}
              profileInfo={props.profileInfo}
              isFollowed={f.isFollowed}
              avatar={f.avatar}
              follow={props.follow}
              unfollow={props.unfollow}
              status={f.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Followers;
