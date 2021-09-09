import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { updateStatus } from "./../../../../../redux/ProfileReducer/profile-reducer";
import { getTheme } from "../../../../../redux/AppReducer/app-selectors";
import { getProfile } from "../../../../../redux/ProfileReducer/profile-selectors";

// utils
import { Icons } from "./../../../../../utils/Icons/Icons";

// Css
import s from "./ProfileNameAndStatus.module.css";

const ProfileNameAndStatus = (props) => {
  let [editStatus, setEditStatus] = useState(false);
  let [valueStatus, setValueStatus] = useState(props.profile.status);

  let res = Icons(props.theme);

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
  return (
    <div className={s.profileNameAndStatus}>
      <div
        className={
          s.profileNameAndCheckMark +
          " " +
          (props.profile.isAdmin && s.profileNameAndCheckMarkIsAdmin)
        }
      >
        <span>{props.profile.fullname}</span>
        <div
          className={
            s.checkMarkBlock +
            " " +
            (props.profile.isAdmin && s.checkMarkBlockActive)
          }
        >
          <img src={res["checkMark"]} alt="checkMark" />
        </div>
      </div>

      {props.isOwner ? (
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  theme: getTheme(state),
  profile: getProfile(state),
});

export default compose(
  connect(mapStateToProps, {
    updateStatus,
  }),
  withRouter
)(ProfileNameAndStatus);
