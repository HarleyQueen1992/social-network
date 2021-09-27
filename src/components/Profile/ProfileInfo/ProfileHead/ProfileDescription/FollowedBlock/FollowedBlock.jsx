import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

//? Selectors imports
import { getTheme } from "../../../../../../redux/AppReducer/app-selectors";
import {
  getIsFollowed,
  getProfile,
} from "../../../../../../redux/ProfileReducer/profile-selectors";

//? Reducer imports
import {
  subscribe,
  unsubscribe,
} from "./../../../../../../redux/ProfileReducer/profile-reducer";

//? Css
import s from "./FollowedBlock.module.css";

const FollowedBlock = (props) => {
  return props.isFollowed ? (
    <div
      className={s.unsubscribeBlock}
      onClick={() => props.unsubscribe(props.profile.login)}
    >
      <span className={s.unsubscribe}>Unsubscribe</span>
    </div>
  ) : (
    <div
      className={s.subscribeBlock}
      onClick={() => props.subscribe(props.profile.login)}
    >
      <span className={s.subscribe}>Subscribe</span>
    </div>
  );
};
const mapStateToProps = (state) => ({
  theme: getTheme(state),
  profile: getProfile(state),
  isFollowed: getIsFollowed(state),
});

export default compose(connect(mapStateToProps, { subscribe, unsubscribe }))(
  FollowedBlock
);
