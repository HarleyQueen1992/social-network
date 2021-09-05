import React, { useState, useEffect } from "react";
import s from "./BigPictures.module.css";
import { useLocation, NavLink } from "react-router-dom";
import { getSpecifiedPost } from "../../../redux/PostsReducer/posts-selectors";
import {
  requestSpecifiedPost,
  clearSpecifiedPost,
} from "./../../../redux/PostsReducer/posts-reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import ArrowBlack from "./../../../assets/images/arrowBlack.png";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BigPictures = (props) => {
  let query = useQuery();
  let id = query.get("id");
  let postId = query.get("postId");
  let [indexImg, setIndexImg] = useState("");
  useEffect(() => {
    props.requestSpecifiedPost(postId);
  }, []);
  useEffect(() => {
    setIndexImg(
      props.specifiedPost
        ? props.specifiedPost.attachments.findIndex(
            (img) => img == "https://drive.google.com/uc?id=" + id
          )
        : ""
    );
  }, [props.specifiedPost]);
  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      props.clearSpecifiedPost();
    };
  }, []);
  return !props.specifiedPost ? (
    <div>Load</div>
  ) : indexImg || indexImg == 0 ? (
    <div className={s.bigPicturesPage}>
      {(props.specifiedPost.attachments.length > 1) & (indexImg > 0) ? (
        <NavLink
          to={
            props.specifiedPost.attachments[indexImg - 1].substring(27) +
            "&postId=" +
            props.specifiedPost.id
          }
          className={s.arrowLeftBlock}
          onClick={() => {
            setIndexImg(indexImg - 1);
          }}
        >
          <div className={s.arrowLeft}>
            <img src={ArrowBlack} alt="arrow left" />
          </div>
        </NavLink>
      ) : (
        ""
      )}
      <div className={s.topBlock}>
        <NavLink
          to={"/" + window.location.hash.substring(2).split("?")[0]}
          className={s.closeBlock}
          // onClick={() => {

          //   // props.setIsBigPictures(false);
          // }}
        >
          <div className={s.close}></div>
        </NavLink>
      </div>

      <div className={s.bigPicturesContentBlock}>
        <img
          className={s.bigPictures}
          src={"https://drive.google.com/uc?id=" + id}
          alt="post img"
        />
      </div>
      {props.specifiedPost.attachments.length > 1 &&
      indexImg < props.specifiedPost.attachments.length - 1 ? (
        <NavLink
          to={
            props.specifiedPost.attachments[indexImg + 1].substring(27) +
            "&postId=" +
            props.specifiedPost.id
          }
          className={s.arrowRightBlock}
          onClick={() => {
            setIndexImg(indexImg + 1);
          }}
        >
          <div className={s.arrowRight}>
            <img src={ArrowBlack} alt="arrow right" />
          </div>
        </NavLink>
      ) : (
        ""
      )}
      <div className={s.bottomBlock}>
        <div className={s.counter}>
          {indexImg + 1} of {props.specifiedPost.attachments.length}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
let mapStateToProps = (state) => {
  return {
    specifiedPost: getSpecifiedPost(state),
  };
};
export default compose(
  connect(mapStateToProps, {
    requestSpecifiedPost,
    clearSpecifiedPost,
  })
)(BigPictures);
