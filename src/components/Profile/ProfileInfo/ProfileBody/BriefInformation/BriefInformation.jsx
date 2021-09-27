import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

//? Selectors imports
import { getTheme } from "../../../../../redux/AppReducer/app-selectors";
import { getProfile } from "../../../../../redux/ProfileReducer/profile-selectors";

//? Utils
import { Icons } from "./../../../../../utils/Icons/Icons";

//? Css
import s from "./BriefInformation.module.css";

const BriefInformation = (props) => {
  let res = Icons(props.theme);

  return (
    <div className={s.profileInfoBlock}>
      <div className={s.listOfInformation}>
        <div className={s.listItems}>
          <img className={s.birthdayImg} src={res["birthday"]} alt="birthday" />
          <span className={s.birthdayTitle}>
            Birthday{" "}
            <span>
              {props.profile.birthday &&
                new Date(props.profile.birthday).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                })}
            </span>
          </span>
        </div>
        <div className={s.listItems}>
          <img src={res["location"]} alt="city" />
          <span className={s.placeOfResidenceBlockTitle}>
            Location <span>{props.profile.location}</span>
          </span>
        </div>
        <div className={s.listItems}>
          <img className={s.person} src={res["aboutMe"]} alt="person" />
          <div className={s.aboutMe}>
            About me: <span>{props.profile.aboutMe}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    theme: getTheme(state),
    profile: getProfile(state),
    // profile: getProfile(state),
    // editMode: getEditMode(state),
  };
};
export default compose(connect(mapStateToProps, {}))(BriefInformation);
