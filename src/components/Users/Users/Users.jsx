import React, { useEffect } from "react";
import s from "./Users.module.css";
import userPhoto from "../../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import {
  getUsersSearch,
  getValue,
} from "../../../redux/SearchReducer/search-selectors";
import { connect } from "react-redux";
import { compose } from "redux";

const UsersList = (props) => {
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
    <div className={s.usersList}>
      {props.value !== "" && props.usersSearch.length === 0 ? (
        <div className={s.usersNotFoundError}>No users</div>
      ) : (
        props.users.map((u) => (
          <NavLink
            to={"/profile/" + u.id}
            className={s.usersListItem}
            key={u.id}
          >
            <div className={s.userAvatar}>
              <img
                alt="userPhoto"
                src={u.avatar != "" ? u.avatar : userPhoto}
                className={s.avatar}
              />
            </div>
            <div
              className={s.rightPart + " " + (u.status == "" ? s.noStatus : "")}
            >
              <div
                className={
                  s.name + " " + (u.status == "" ? s.nameNoStatus : "")
                }
              >
                {u.login}
              </div>
              <span
                className={
                  s.userStatus + " " + (u.status == "" ? s.statusDisable : "")
                }
              >
                {u.status}
              </span>
              <div className={s.buttonsBlock}>
                <NavLink to="#" className={s.subscribers}>
                  {u.isFollowed ? (
                    <button
                      onClick={() => {
                        props.unfollow(u.login);
                      }}
                      className={s.unsubscribeBtn}
                    >
                      Unsubscribe
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        props.follow(u.login);
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
            </div>
          </NavLink>
        ))
      )}
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    currentPageSearch: getCurrentPageSearch(state),
    pageSize: getPageSize(state),
    theme: getTheme(state),
    totalUsersCount: getTotalUsersCount(state),
    totalUsersCountSearch: getTotalUsersCountSearch(state),
    isFatching: getIsFatching(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    value: getValue(state),
    usersSearch: getUsersSearch(state),
    isFatchingSearch: getIsFatchingSearch(state),
    isReceipt: getIsReceipt(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setUsersSearch,
    toggleFollowingProgress,
    requestUsers,
    toggleIsFatching,
    setUsers,
    setValue,
    requestForUsers,
    toggleIsFatchingSearch,
    setCurrentPage,
    setCurrentPageSearch,
    clearUsers,
    clearUsersSearch,
  }),
  withAuthRedirecr
)(UsersList);
