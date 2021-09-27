import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

//? Reducers import
import { setIsOpenFilters } from "./../../../../redux/ProfileReducer/profile-reducer";

//? Selectors import
import { getTheme } from "../../../../redux/AppReducer/app-selectors";
import { getProfileInfo } from "../../../../redux/AuthReducer/auth-selectors";
import { getPosts } from "../../../../redux/PostsReducer/posts-selectors";
import {
  getProfile,
  getSubscribers,
  getSubscriptions,
} from "../../../../redux/ProfileReducer/profile-selectors";

//? Components
import Post from "../../../Posts/MyPosts/Post/Post";
import PostCreation from "../../../Posts/MyPosts/PostCreation/PostCreation";
import BriefInformation from "./BriefInformation/BriefInformation";
import SubscriptionsBlock from "./SubscribtionsBlock/SubscriptionsBlock";
import PublicationsBlock from "./PublicationsBlock/PublicationsBlock";

//? Utils
import { Icons } from "./../../../../utils/Icons/Icons";

//? Css
import s from "./ProfileBody.module.css";

const ProfileBody = (props) => {
  let res = Icons(props.theme, props.index);

  useEffect(() => {
    window.addEventListener("resize", handleChangeInnerHeight);

    return () => {
      window.removeEventListener("resize", handleChangeInnerHeight);
    };
  }, [window.innerHeight]);

  const handleChangeInnerHeight = () => {
    if (
      window.innerHeight <
      document.getElementById("slidingBlock").clientHeight + 71 // 51px - header height
    ) {
      let height = document.getElementById("slidingBlock").clientHeight;
      document.getElementById("slidingBlock").style.cssText =
        "top:" + (window.innerHeight - height - 20) + "px;"; // 20px padding-top
    } else {
      document.getElementById("slidingBlock").style.cssText = "top: 61px;"; // 61px = 51px(header height) + 10px (padding-top)
    }
  };

  return (
    <div className={s.profileBody}>
      <div className={s.leftColumn}>
        <div className={s.slidingBlock} id="slidingBlock">
          <BriefInformation />
          <SubscriptionsBlock block="subscriptions" />
          <SubscriptionsBlock block="subscribers" />
        </div>
      </div>
      <div
        className={
          s.rightColumn + " " + (!props.isOwner && s.rightColumnNoOwner)
        }
      >
        {props.isOwner && <PostCreation translate="-100%" />}
        <PublicationsBlock
          res={res}
          setIsOpenFilters={props.setIsOpenFilters}
        />
        <div className={s.postsList}>
          {props.posts.map((post) => (
            <Post
              border={false}
              key={post.id}
              theme={props.theme}
              post={post}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  theme: getTheme(state),
  profile: getProfile(state),
  profileInfo: getProfileInfo(state),
  posts: getPosts(state),
  subscriptions: getSubscriptions(state),
  subscribers: getSubscribers(state),
});

export default compose(connect(mapStateToProps, { setIsOpenFilters }))(
  ProfileBody
);
