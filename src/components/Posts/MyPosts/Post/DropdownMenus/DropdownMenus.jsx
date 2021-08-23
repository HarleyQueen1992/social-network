import React from "react";
import s from "./DropdownMenus.module.css";
import { Icons } from "./../../../../../utils/Icons/Icons";

const DropdownMenus = (props) => {
  let res = Icons(props.theme);
  document.onmousedown = function (e) {
    if (
      e.target.className
        .replace(/[^a-zA-Z ]/g, " ")
        .split(/\s+|\./)
        .filter(
          (word) =>
            (word === "DropdownMenus") |
            (word === "morePost") |
            (word === "more")
        ).length == 0
    ) {
      props.setDropdownMenus(false);
      props.setDropdownMenusPostId(null);
    }
  };

  return (
    <div className={s.dropdownMenusBlock} id="active__dropdown">
      <div className={s.dropdownMenus}>
        <div
          className={s.menuItem}
          onClick={() => {
            props.setUpdatePost(props.post);
            props.setIsUpdatePost(true);
            document.querySelector("body").style.cssText = "overflow: hidden;";
          }}
        >
          <img className={s.itemImg} src={res["update"]} alt="update" />
          <span className={s.itemTitle}>Upadte Post</span>
        </div>
        <div
          className={s.menuItem}
          onClick={() => {
            props.deletePost(props.post.id, props.post.author.login);
          }}
        >
          <img className={s.itemImg} src={res["delete"]} alt="delete" />
          <span className={s.itemTitle}>Delete Post</span>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenus;
