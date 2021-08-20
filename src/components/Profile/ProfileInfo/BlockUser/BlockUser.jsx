import React from "react";
import s from "./BlockUser.module.css";

const BlockUser = (props) => {
  const closePopup = () => {
    document.querySelector(".react-swipeable-view-container").style.cssText =
      "will-change: transform; !important" +
      "flex-direction: row;" +
      "transition: all 0s ease 0s;" +
      "direction: ltr;" +
      "display: flex;" +
      "transform: translate(-100%, 0px);";
    document.querySelector("body").style.cssText = "overflow: scroll;";
    props.setIsBlockUser(false);
  };
  return (
    <div className={s.popupBlockUser} onClick={closePopup}>
      <div
        className={s.popupContent}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className={s.header}>
          <spna className={s.title}>Reason for blocking</spna>
          <div className={s.popupContentHeaderOff} onClick={closePopup}></div>
        </header>
        <div className={s.popupContentField}>
          <textarea
            className={s.popupContentTextarea}
            maxLength="250"
            placeholder="Describe the reason for blocking"
          ></textarea>
        </div>
        <div className={s.submitBlock}>
          <div className={s.submit}>Block</div>
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
