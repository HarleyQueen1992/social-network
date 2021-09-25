import React from "react";

//? Utils
import { Icons } from "./../../../../../utils/Icons/Icons";

//? Css
import s from "./EditBanner.module.css";

const EditBanner = (props) => {
  let res = Icons(props.theme);
  return (
    <div className={s.bannerBlock}>
      <div className={s.banner}>
        <img
          src={
            props.profile.banner === ""
              ? res["bannerDefault"]
              : props.profile.banner
          }
          alt="profile photo"
        />
      </div>
    </div>
  );
};
export default EditBanner;
