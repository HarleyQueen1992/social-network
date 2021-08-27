import React, { useState } from "react";
import s from "./BigPictures.module.css";

const BigPictures = (props) => {
  let [indexImg, setIndexImg] = useState(
    props.selectPost.attachments.findIndex((img) => img == props.imgUrl)
  );
  return indexImg || indexImg == 0 ? (
    <div className={s.bigPicturesPage}>
      {props.selectPost.attachments.length > 1 && (
        <div
          className={s.arrowLeftBlock}
          onClick={() => {
            if (indexImg > 0) {
              setIndexImg(indexImg - 1);
            }
          }}
        >
          <div className={s.arrowLeft}></div>
        </div>
      )}
      <div
        className={s.closeBlock}
        onClick={() => {
          document.querySelector("body").style.cssText = "overflow: scroll;";
          props.setIsBigPictures(false);
        }}
      >
        <div className={s.close}></div>
      </div>

      <div className={s.bigPicturesContentBlock}>
        <img
          className={s.bigPictures}
          src={props.selectPost.attachments[indexImg]}
          alt="post img"
        />
      </div>
      {props.selectPost.attachments.length > 1 && (
        <div
          className={s.arrowRightBlock}
          onClick={() => {
            if (indexImg < props.selectPost.attachments.length - 1) {
              setIndexImg(indexImg + 1);
            }
          }}
        >
          <div className={s.arrowRight}></div>
        </div>
      )}
      <div className={s.counter}>
        {indexImg + 1} of {props.selectPost.attachments.length}
      </div>
    </div>
  ) : (
    ""
  );
};

export default BigPictures;
