import React, { useEffect, useState } from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import { Icons } from "../../utils/Icons/Icons";
import UsersList from "./Users/Users";

const Users = (props) => {
  let res = Icons(props.theme);
  const [focus, setFocus] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    props.changeIndex(window.location.href);
  }, [window.location.href]);

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
        <UsersList
          value={props.value}
          usersSearch={props.usersSearch}
          unfollow={props.unfollow}
          follow={props.follow}
          users={users}
        />
      )}
    </div>
  );
};

export default Users;
