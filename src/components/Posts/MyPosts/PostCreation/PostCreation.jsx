import React, { useState, useEffect } from "react";
import s from "./PostCreation.module.css";
import ProfilePhoto from "./../../../../assets/images/user.png";
import Gallery from "./../../../../assets/images/gallery.png";
import { connect } from "react-redux";
import { compose } from "redux";
import CreatePost from "./CreatePost/CreatePost";
import { getTheme } from "./../../../../redux/AppReducer/app-selectors";
import {
  addPostActionCreator,
  createPost,
} from "./../../../../redux/PostsReducer/posts-reducer";
import { getProfileInfo } from "./../../../../redux/AuthReducer/auth-selectors";

const PostCreation = (props) => {
  const [focus, setFocus] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);

  //   let newUrl = window.location.href;
  //   if (props.strUrlPrev != newUrl) {
  //     props.changeIndex(newUrl);
  //   }
  const openPopup = () => {
    document.querySelector(".react-swipeable-view-container").style.cssText =
      "transform: translate(50) !important;" + "will-change: auto !important;";
    document.querySelector("body").style.cssText = "overflow: hidden;";
    setIsCreatePost(true);
  };

  return (
    <div className={s.postCreationBlock}>
      <div className={s.anythingNewBlock}>
        <div className={s.anythingNewProfilePhotoBlock}>
          <img
            className={s.anythingNewProfilePhoto}
            src={
              props.profile.avatar == "" ? ProfilePhoto : props.profile.avatar
            }
            alt="profile photo"
          />
        </div>
        <div className={s.anythingNew} onClick={openPopup}>
          <span>What's on your mind?</span>
        </div>
      </div>
      {isCreatePost && (
        <CreatePost
          setIsCreatePost={setIsCreatePost}
          isCreatePost={isCreatePost}
          profile={props.profile}
          valueText={""}
          valueTitle={""}
          valueImages={[]}
          translate={props.translate}
          addPostActionCreator={props.addPostActionCreator}
          createPost={props.createPost}
          button={"Post"}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: getTheme(state),
    profile: getProfileInfo(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    addPostActionCreator,
    createPost,
  })
)(PostCreation);
