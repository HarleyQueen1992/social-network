import React, { useEffect, useState } from "react";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import s from "./Followings.module.css";
import Preloader from "../common/Preloader/Preloader";
import { Icons } from "../../utils/Icons/Icons";

const Friends = (props) => {
  let res = Icons(props.theme);
  const [focus, setFocus] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  let toggleFocus = () => {
    setIsFocus(!isFocus);
  };

  useEffect(() => {
    props.changeIndex(window.location.href);
  }, [window.location.href]);

  let friends;
  let totalCount;

  if (props.friendsSearch.length === 0) {
    friends = props.friends;
    totalCount = props.totalFriendsCount;
  } else {
    friends = props.friendsSearch;
    totalCount = props.totalFriendsCountSearch;
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
        (e.target.documentElement.scrollTop + window.innerHeight) ===
        0 &&
      friends.length < totalCount
    ) {
      debugger;
      if (props.friendsSearch.length === 0) {
        props.toggleIsFatching(true);
      } else {
        props.toggleIsFatchingSearch(true);
      }
    }
  };

  return (
    <div className={s.friendsBlock}>
      <header className={s.header + " " + (focus ? s.headActive : "")}>
        {/* <img className={s.friendsImg} alt='friendsLogo' src={FriendsImg} /> */}
        <div className={s.title + " " + (focus ? s.titleActive : "")}>
          Subscriptions
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
              placeholder="Subscriptions search"
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
      ) : props.value !== "" && props.friendsSearch.length === 0 ? (
        <div className={s.errorNoUsers}>No users </div>
      ) : friends.length === 0 ? (
        <div className={s.friendsBlockError}>
          <h2>You are not subscribed to anyone</h2>
          <NavLink to="/users/">Let's see who you can subscribe to</NavLink>
        </div>
      ) : (
        <div className={s.friends}>
          {friends.map((f) => (
            <NavLink
              to={"/profile/" + f.login}
              key={f.login}
              className={s.friend}
            >
              <div className={s.photoUsers}>
                <img
                  alt="userphoto"
                  src={f.avatar != "" ? f.avatar : userPhoto}
                  className={s.photo}
                />
              </div>
              <div className={s.rightPart}>
                <span className={s.name}>{f.login}</span>
                <span className={s.buttonsBlock}>
                  <div className={s.viewPosts}>
                    <button className={s.viewPostsBtn}>View posts</button>
                  </div>
                  <NavLink to="#" className={s.unfollow}>
                    <button
                      onClick={() => {
                        props.unfollow(f.id);
                      }}
                      className={s.unfollowBtn}
                    >
                      Unsubscribe
                    </button>
                  </NavLink>
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};
export default Friends;
