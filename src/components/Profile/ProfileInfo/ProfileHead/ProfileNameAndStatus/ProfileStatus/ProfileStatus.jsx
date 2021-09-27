import React, { useState } from "react";

//? Css
import s from "./ProfileStatus.module.css";

const ProfileStatus = (props) => {
  let [editStatus, setEditStatus] = useState(false);
  let [valueStatus, setValueStatus] = useState(props.profile.status);

  const handleChangeStatus = (event) => {
    setValueStatus(event.target.value);
  };

  if (editStatus) {
    document.onclick = function (e) {
      if (e.target.className !== "") {
        if (
          e.target.className
            .replace(/[^a-zA-Z ]/g, " ")
            .split(/\s+|\./)
            .filter((word) => (word === "editStatus") | (word === "setStatus"))
            .length == 0
        ) {
          props.updateStatus(valueStatus);
          setEditStatus(false);
        }
      }
    };
  }

  return props.isOwner ? (
    editStatus ? (
      <input
        className={s.editStatus}
        onChange={handleChangeStatus}
        value={valueStatus}
        placeholder="Set status"
        maxLength="70"
      ></input>
    ) : props.profile.status == "" ? (
      <div
        onClick={() => {
          setEditStatus(true);
        }}
        className={s.setStatus}
      >
        Set status
      </div>
    ) : (
      <div
        onDoubleClick={() => {
          setEditStatus(true);
        }}
        className={s.profileStatus}
      >
        {valueStatus}
      </div>
    )
  ) : (
    <div className={s.profileStatus}>{props.profile.status}</div>
  );
};

export default ProfileStatus;
