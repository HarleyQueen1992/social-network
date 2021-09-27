import React from "react";

//? Css
import s from "./EditFullName.module.css";

const EditFullName = (props) => {
  const handleChangeFullName = (e) => {
    props.setValueFullName(e.target.value);
  };

  return props.editFullName ? (
    <input
      className={s.editFullName}
      value={props.valueFullName}
      onChange={handleChangeFullName}
      maxLength="50"
    ></input>
  ) : (
    <span className={s.fullName}>{props.valueFullName}</span>
  );
};
export default EditFullName;
