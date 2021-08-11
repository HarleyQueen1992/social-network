import React from "react";
import s from "./User.module.css";
import userPhoto from "./../../../assets/images/user.png";
import { Icons } from "./../../../utils/Icons/Icons";
import { NavLink } from "react-router-dom";

const User = (props) => {
  let res = Icons(props.theme);
  return (
    <NavLink
      to={"/profile/" + props.login}
      className={s.usersListItem}
      key={props.id}
    >
      <div className={s.userAvatar}>
        <img
          alt="userPhoto"
          src={props.avatar != "" ? props.avatar : userPhoto}
          className={s.avatar}
        />
      </div>
      <div className={s.rightPart}>
        <div
          className={
            s.nameAndChekMark + " " + (props.isAdmin && s.nameAndChekMarkAdmin)
          }
        >
          <div className={s.name}>{props.login}</div>
          <div
            className={
              s.chekMarkBlock + " " + (props.isAdmin && s.chekMarkBlockActive)
            }
          >
            <img src={res["checkMark"]} alt="checkMark" />
          </div>
        </div>

        <span className={s.userStatus}>{props.status}</span>
        {props.profileInfo.login === props.login ? (
          <div className={s.thisIsMeBlock}>
            <span>This is me</span>
          </div>
        ) : (
          <div className={s.buttonsBlock}>
            <NavLink to="#" className={s.subscribers}>
              {props.isFollowed ? (
                <button
                  onClick={() => {
                    props.unfollow(props.login);
                  }}
                  className={s.unsubscribeBtn}
                >
                  Unsubscribe
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(props.login);
                  }}
                  className={s.subscribeBtn}
                >
                  Subscribe
                </button>
              )}
            </NavLink>
            <NavLink to="#" className={s.viewPosts}>
              <button className={s.viewPostsBtn}>View Posts</button>
            </NavLink>
          </div>
        )}
      </div>
    </NavLink>
  );
};
export default User;
