import React, { useState } from "react";

//? Css
import s from "./EditAboutMe.module.css";

const EditAboutMe = (props) => {
  const cancelEditAboutMe = () => {
    props.setValueAboutMe(props.profile.aboutMe);
    props.setEditAboutMe(false);
  };
  const handleChangeAboutMe = (e) => {
    props.setValueAboutMe(e.target.value);
  };

  return props.editAboutMe ? (
    <div className={s.editAboutMeBlock}>
      <textarea
        value={props.valueAboutMe}
        onChange={handleChangeAboutMe}
        className={s.aboutMeTextarea}
        maxLength="400"
      ></textarea>
      <div className={s.charactersRemaining}>
        <span>Remaining {400 - props.valueAboutMe.length} characters</span>

        <div onClick={cancelEditAboutMe} className={s.cancelAboutMeBlock}>
          {" "}
          <span className={s.cancelAboutMe}>Cancel</span>{" "}
        </div>
      </div>
    </div>
  ) : (
    <div className={s.aboutMeText}>
      {props.profile.aboutMe == "" ? (
        <span>Tell about yourself...</span>
      ) : (
        <span>{props.profile.aboutMe}</span>
      )}
    </div>
  );
};
export default EditAboutMe;
