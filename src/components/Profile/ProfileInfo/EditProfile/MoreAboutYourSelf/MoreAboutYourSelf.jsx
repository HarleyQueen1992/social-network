import React from "react";

//? Utils
import { Icons } from "../../../../../utils/Icons/Icons";

//? Css
import s from "./MoreAboutYourSelf.module.css";

const EditBirthdayAndLocation = (props) => {
  let res = Icons(props.theme);

  const handleChangeBirthday = (event) => {
    props.setValueBirthday(event.target.value);
  };

  const handleChangeLocation = (event) => {
    props.setValueLocation(event.target.value);
  };

  return (
    <div className={s.moreAboutMyself}>
      <div className={s.birthdayBlock}>
        <img className={s.birthdayImg} src={res["birthday"]} alt="birthday" />
        <span className={s.birthdayTitleAndText}>
          <div className={s.birthdayTitle}>Birthday</div>
          {props.editTellusMoreAboutYourself ? (
            <span className={s.birthdayEditBlock}>
              <input
                value={props.valueBirthday}
                onChange={handleChangeBirthday}
                className={s.editBirthday}
                type="date"
              />
            </span>
          ) : (
            <span className={s.birthday}>
              {props.profile.birthday &&
                new Date(props.profile.birthday).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                })}{" "}
            </span>
          )}
        </span>
      </div>
      <div className={s.locationBlock}>
        <img className={s.cityImg} src={res["location"]} alt="location" />
        <span className={s.locationTitleAndText}>
          <div className={s.locationTitle}>Location</div>
          {props.editTellusMoreAboutYourself ? (
            <span className={s.locationEditBlock}>
              <input
                value={props.valueLocation}
                onChange={handleChangeLocation}
                className={s.editLocation}
                type="text"
              />
            </span>
          ) : (
            <span className={s.location}>{props.profile.location}</span>
          )}
        </span>
      </div>
    </div>
  );
};
export default EditBirthdayAndLocation;
