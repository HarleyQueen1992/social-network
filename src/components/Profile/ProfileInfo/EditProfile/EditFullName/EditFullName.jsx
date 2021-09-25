import React, { useState } from "react";

//? Css
import s from "./EditFullName.module.css";

const EditFullName = (props) => {
  //   let [valueFullName, setValueFullName] = useState(props.profile.fullName);
  const handleChangeFullName = (e) => {
    props.setValueFullName(e.target.value);
  };
  return (
    <div className={s.editProfileFullName}>
      {props.editFullName ? (
        <input
          className={s.editFullName}
          value={props.valueFullName}
          onChange={handleChangeFullName}
          maxLength="50"
        ></input>
      ) : (
        <span className={s.fullName}>{props.valueFullName}</span>
      )}
    </div>
  );
};
export default EditFullName;
