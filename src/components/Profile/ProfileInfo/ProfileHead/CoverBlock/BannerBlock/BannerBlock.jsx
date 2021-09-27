import React from "react";

//? Components
import EditBannerButton from "./EditBannerButton/EditBannerButton";

//? Css
import s from "./BannerBlock.module.css";

const BannerBlock = (props) => {
  return (
    <div className={s.bannerBlock}>
      <EditBannerButton
        isOwner={props.isOwner}
        setProfileBanner={props.setProfileBanner}
        res={props.res}
      />
      <img
        className={s.banner}
        src={
          props.profile.banner == ""
            ? props.res["bannerDefault"]
            : props.profile.banner
        }
        alt="Cover"
      />
    </div>
  );
};

export default BannerBlock;
