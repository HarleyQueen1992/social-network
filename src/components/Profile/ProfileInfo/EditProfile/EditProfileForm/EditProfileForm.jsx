import React from "react";

//? Css
import s from "./EditProfileForm.module.css";

const EditProfileForm = (props) => {
  const onMainSelected = (e) => {
    if (e.target.files.length) {
      props.save(e.target.files[0]);
    }
  };

  return (
    <div className={s.editProfileForm}>
      <div className={s.titleBlock}>
        <div className={s.title}>{props.title}</div>
        {props.type === "file" ? (
          <div className={s.editButtonBlock}>
            <input
              onChange={onMainSelected}
              type="file"
              id={"input__file" + props.title}
            />
            <label
              className={s.editButton}
              htmlFor={"input__file" + props.title}
            >
              <span className={s.edit}>Edit</span>
            </label>
          </div>
        ) : (
          <div
            onClick={() => {
              props.setEdit(!props.edit);
              {
                props.edit && props.value2
                  ? props.save(props.value, props.value2)
                  : props.save(props.value);
              }
            }}
            className={s.editButton}
          >
            {props.edit ? (
              <span className={s.edit}>Save</span>
            ) : (
              <span className={s.edit}>Edit</span>
            )}
          </div>
        )}
      </div>
      {props.children}
    </div>
  );
};

export default EditProfileForm;
